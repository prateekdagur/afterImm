const claimFactory = require("../Model/claimModel");
const upcModel = require("../Model/upcPoolModel");
const fetch = require("node-fetch");
const Web3 = require("web3");
const fs = require("fs");
var Tx = require("ethereumjs-tx");

const claimFactoryCtrl = {
	//Function to prepare the claim and store it in database.
	storeClaim: async (req, res) => {
		try {
			const addr = req.params.address.toLowerCase();

			const block = await claimFactory.find({ contract_address: addr }).limit(1).sort({ $natural: -1 });

			var startBlock = 0;
			if (block.length) {
				startBlock = block[0].block_number + 1;
			}
			//Fetching blockchain API to get the data.
			const blockchain_data = await fetch(
				`http://api.bscscan.com/api?module=account&action=txlist&address=${addr}&startblock=${startBlock}&endblock=latest&sort=asc&apikey=S5MX4JTHR55MSPYRN54BJYDUD3DCC1ZEHN`,

			);
			//Converting in json.
			let response_data = await blockchain_data.json();

			for (i = 0; i < response_data.result.length; i++) {
				let error = response_data.result[i].isError;
				let val = response_data.result[i].value;
				let tx_receipt_status = response_data.result[i].txreceipt_status;
				//Check to filter the data.
				if (error == 0 && tx_receipt_status == 1 && val > 0) {
					const value18 = response_data.result[i].value / 1000000000000000000;
					//Saving in database
					const newClaim = new claimFactory({
						contract_address: response_data.result[i].to,
						from_address: response_data.result[i].from,
						value: value18,
						block_number: response_data.result[i].blockNumber,
					});
					await newClaim.save();
				}
			}
			res.json({ msg: "claim is up-to-date" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to send the token to the respective user.
	sendClaimToken: async (req, res) => {
		try {
			const upcgetter = await upcModel.findOne({
				address: req.params.contract_address,
			});

			const FROM_ADDRESS = process.env.FROM_ADDRESS;
			const PRIVATE_KEY = process.env.PRIVATE_KEY;

			var type = upcgetter.network_type;
			const BSC_NET = process.env.BSC_NET;
			const ETHEREUM_NET = process.env.ETHEREUM_NET;

			if (type == "BSC") {
				type = BSC_NET;
			}
			if (type == "ETHEREUM") {
				type = ETHEREUM_NET;
			}
			//http provider for web3.
			const web3 = new Web3(new Web3.providers.HttpProvider(`${type}`));
			const token_address = upcgetter.token_address;
			const abi = upcgetter.abi_name;
			const swap_amount_value = upcgetter.swap_amount;
			//Getting smart contract ABI.
			const rawdata = fs.readFileSync(`abi/${abi}`, "utf8");

			let SeedifyFundsContractAbi = JSON.parse(rawdata);
			const claimDetail = await claimFactory.find({
				contract_address: upcgetter.address.toLowerCase(), claim_status: "0"
			});

			for (i = 0; i < claimDetail.length; i++) {
				let tokenAddress = token_address;
				let toAddress = claimDetail[i].from_address;
				let fromAddress = FROM_ADDRESS;
				let privateKey = Buffer.from(
					PRIVATE_KEY,
					"hex",
				);
				let contractABI = SeedifyFundsContractAbi;
				let contract = new web3.eth.Contract(contractABI, tokenAddress, {
					from: fromAddress,
				});

				//Here multiplying user's sent value and swap amount to get the token.
				let amount = claimDetail[i].value * swap_amount_value;
				const weiValue = web3.utils.toWei(`${amount}`, "ether");
				const count = await web3.eth.getTransactionCount(fromAddress);

				//raw transaction contains all reaquired value for transaction.
				let rawTransaction = {
					from: fromAddress,
					gasPrice: web3.utils.toHex(20 * 1e9),
					gasLimit: web3.utils.toHex(500000),
					to: tokenAddress,
					value: 0x0,
					data: contract.methods.transfer(toAddress, weiValue).encodeABI(),
					nonce: web3.utils.toHex(count),
				};
				let transaction = new Tx(rawTransaction);

				transaction.sign(privateKey);
				const trans = await web3.eth.sendSignedTransaction(
					"0x" + transaction.serialize().toString("hex"),
				);

				if (trans.status) {
					//updating the status when token has been distributed to the respective user.
					const states = await claimFactory.findOneAndUpdate(
						{ from_address: toAddress, contract_address: upcgetter.address.toLowerCase(), claim_status: "0" },
						{ claim_status: "1" },
					);
					const upcgettwo = await upcModel.findOne({
						address: req.params.contract_address,
					});
					//updating distributed token in upcModel.
					await upcModel.findOneAndUpdate({ _id: upcgettwo._id, address: upcgettwo.address }, { distribute_token: upcgettwo.distribute_token + amount })
				}
			}
			res.json({ msg: "Tokens have been sent to repective users" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	//Function to read claim token.
	getClaimToken: async (req, res) => {
		try {
			var pages = req.query.page.split("-")[0];
			const address = req.query.page.split("-")[1].toLowerCase();
			//Reading claim token.
			const token = await claimFactory.find({ contract_address: address });
			if (!token) {
				return res.status(400).json({ msg: "claim token is not found" });
			}
			page = parseInt(pages) || 1;
			const pageSize = 10;
			const skip = (page - 1) * pageSize;

			const total = token.length;
			const totalPage = Math.ceil(total / pageSize);
			const paginatedClaimToken = await claimFactory
				.find({ contract_address: address })
				.skip(skip)
				.limit(pageSize);

			res.json({
				claimToken: paginatedClaimToken,
				totalpage: totalPage,
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

module.exports = claimFactoryCtrl;
