const whlist1 = require("../Model/whitelist1");
const whlist2 = require("../Model/whitelist2");
const whlist3 = require("../Model/whitelist3");
const whlist4 = require("../Model/whitelist4");
const whlist5 = require("../Model/whitelist5");
const whlist6 = require("../Model/whitelist6");
const whlist7 = require("../Model/whitelist7");
const whlist8 = require("../Model/whitelist8");
const whlist9 = require("../Model/whitelist9");
const upcModel = require("../Model/upcPoolModel");
const csvFileModel = require("../Model/csvFileModel");

const Web3 = require("web3");
const SeedifyFundsContractAbi = require("../BlockchainContractAbi/contract_abi.js");
//http provider for web3.
const web3 = new Web3(
	new Web3.providers.HttpProvider(
		"https://bsc-dataseed.binance.org/",
		//"https://data-seed-prebsc-1-s1.binance.org:8545/"
	),
);
//address of token sender
const FROM_ADDRESS = process.env.FROM_ADDRESS;
//private key of token sender
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const fetchBlockchainWhitelistCtrl = {
	//Function to upload the address of white list one on blockchain.
	addWhitelist1: async (req, res) => {
		try {
			console.log('jjjjjjjjjjjjjjjjjjjjjj')
          	pool_id = req.params.id;
			const contract_address = await upcModel.findOne({
				_id: pool_id,
			});
			//Getting contract address of the pool.
			const contractAddr = contract_address.address.toUpperCase();
			const SimpleContract = new web3.eth.Contract(
				SeedifyFundsContractAbi,
				contractAddr,
			);
			const addresses = await whlist1.find({
				addr_status: "0",
				id: req.params.id,
			});

			if (addresses.length === 0) {
				return res.status(400).json({
					msg: "No address is remaining to be uploaded on blockchain",
				});
			}

			for (var i = 0; i < addresses.length; i++) {
				//Checking whether the address is on blockchain or not. 
				const already_on_blockchain = await SimpleContract.methods
					.getWhitelistOne(addresses[i].white_list1)
					.call();

				if (already_on_blockchain) {
					//Updating status of the address which are already on blockchain.
					const states = await whlist1.findOneAndUpdate(
						{ white_list1: addresses[i].white_list1, id: req.params.id },
						{ addr_status: "1" },
					);

				}

				//Giving address parameter in smart contract function.
				const result = await SimpleContract.methods.addWhitelistOne(
					addresses[i].white_list1,
				);
				//encoding address in ABI
				const encodedResult = result.encodeABI();
				const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
				//Signing transaction to upload address on blockchain.
				const signedTx = await web3.eth.accounts.signTransaction(
					{
						nonce: accountNonce,
						data: encodedResult,
						from: FROM_ADDRESS,
						gasPrice: 13000000000,
						gas: 5000000,
						to: contractAddr,
					},
					PRIVATE_KEY,
					false,
				);
				//sending signed transaction.
				const transaction = await web3.eth.sendSignedTransaction(
					signedTx.rawTransaction,
				);
				if (transaction.status) {
					//Updating status of the address which has been uploaded on blockchain successfully.
					const states = await whlist1.findOneAndUpdate(
						{ white_list1: addresses[i].white_list1, id: req.params.id },
						{ addr_status: "1" },
					);
					const upload_in_csv = new csvFileModel({ user_address: addresses[i].white_list1, tier: 1, ido_id: pool_id })
					await upload_in_csv.save();
				}
			}
			
			res.json({ msg: "addresses are uploaded on blockchain successfully!" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to upload the address of white list two on blockchain.
	addWhitelist2: async (req, res) => {
		try {
			pool_id = req.params.id;
			const contract_address = await upcModel.findOne({
				_id: pool_id,
			});
			//Getting contract address of the pool.
			const contractAddr = contract_address.address.toUpperCase();
			const SimpleContract = new web3.eth.Contract(
				SeedifyFundsContractAbi,
				contractAddr,
			);
			const addresses = await whlist2.find({
				addr_status: "0",
				id: req.params.id,
			});
			if (!addresses.length) {
				return res.status(200).json({
					msg: "No address is remaining to be uploaded on blockchain",
				});
			}

			for (i = 0; i < addresses.length; i++) {
				//Checking whether the address is on blockchain or not. 
				const already_on_blockchain = await SimpleContract.methods
					.getWhitelistTwo(addresses[i].white_list2)
					.call();

				if (already_on_blockchain) {
					//Updating status of the address which are already on blockchain.
					const states = await whlist2.findOneAndUpdate(
						{ white_list2: addresses[i].white_list2, id: req.params.id },
						{ addr_status: "1" },
					);
				}
				//Giving address parameter in smart contract function.
				const result = await SimpleContract.methods.addWhitelistTwo(
					addresses[i].white_list2,
				);
				//encoding address in ABI
				const encodedResult = result.encodeABI();

				const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
				//Signing transaction to upload address on blockchain.
				const signedTx = await web3.eth.accounts.signTransaction(
					{
						nonce: accountNonce,
						data: encodedResult,
						from: FROM_ADDRESS,
						gasPrice: 13000000000,
						gas: 5000000,
						to: contractAddr,
					},
					PRIVATE_KEY,
					false,
				);
				//sending signed transaction.
				const transaction = await web3.eth.sendSignedTransaction(
					signedTx.rawTransaction,
				);
				if (transaction.status) {
					//Updating status of the address which has been uploaded on blockchain successfully.
					const states = await whlist2.findOneAndUpdate(
						{ white_list2: addresses[i].white_list2, id: req.params.id },
						{ addr_status: "1" },
					);
					const upload_in_csv = new csvFileModel({ user_address: addresses[i].white_list2, tier: 2, ido_id: pool_id })
					await upload_in_csv.save();
				}
			}
			res.json({ msg: "addresses are uploaded on blockchan successfully!" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to upload the address of white list three on blockchain.
	addWhitelist3: async (req, res) => {
		try {
			pool_id = req.params.id;
			const contract_address = await upcModel.findOne({
				_id: pool_id,
			});
			//Getting contract address of the pool.
			const contractAddr = contract_address.address.toUpperCase();
			const SimpleContract = new web3.eth.Contract(
				SeedifyFundsContractAbi,
				contractAddr,
			);
			const addresses = await whlist3.find({
				addr_status: "0",
				id: req.params.id,
			});

			if (!addresses.length) {
				return res.status(200).json({
					msg: "No address is remaining to be uploaded on blockchain",
				});
			}

			for (i = 0; i < addresses.length; i++) {
				//Checking whether the address is on blockchain or not. 
				const already_on_blockchain = await SimpleContract.methods
					.getWhitelistThree(addresses[i].white_list3)
					.call();

				if (already_on_blockchain) {
					//Updating status of the address which are already on blockchain.
					const states = await whlist3.findOneAndUpdate(
						{ white_list3: addresses[i].white_list3, id: req.params.id },
						{ addr_status: "1" },
					);
				}

				//Giving address parameter in smart contract function.
				const result = await SimpleContract.methods.addWhitelistThree(
					addresses[i].white_list3,
				);

				//encoding address in ABI
				const encodedResult = result.encodeABI();

				const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
				//Signing transaction to upload address on blockchain.
				const signedTx = await web3.eth.accounts.signTransaction(
					{
						nonce: accountNonce,
						data: encodedResult,
						from: FROM_ADDRESS,
						gasPrice: 13000000000,
						gas: 5000000,
						to: contractAddr,
					},
					PRIVATE_KEY,
					false,
				);
				//sending signed transaction.
				const transaction = await web3.eth.sendSignedTransaction(
					signedTx.rawTransaction,
				);
				if (transaction.status) {
					//Updating status of the address which has been uploaded on blockchain successfully.
					const states = await whlist3.findOneAndUpdate(
						{ white_list3: addresses[i].white_list3, id: req.params.id },
						{ addr_status: "1" },
					);
					const upload_in_csv = new csvFileModel({ user_address: addresses[i].white_list3, tier: 3, ido_id: pool_id })
					await upload_in_csv.save();
				}
			}
			res.json({ msg: "addresses are uploaded on blockchan successfully!" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to upload the address of white list Four on blockchain.
	addWhitelist4: async (req, res) => {
		try {
			pool_id = req.params.id;
			const contract_address = await upcModel.findOne({
				_id: pool_id,
			});

			//Getting contract address of the pool.
			const contractAddr = contract_address.address.toUpperCase();
			const SimpleContract = new web3.eth.Contract(
				SeedifyFundsContractAbi,
				contractAddr,
			);
			const addresses = await whlist4.find({
				addr_status: "0",
				id: req.params.id,
			});


			if (!addresses.length) {
				return res.status(200).json({
					msg: "No address is remaining to be uploaded on blockchain",
				});
			}

			for (i = 0; i < addresses.length; i++) {
				//Checking whether the address is on blockchain or not. 
				const already_on_blockchain = await SimpleContract.methods
					.getWhitelistFour(addresses[i].white_list4)
					.call();
				if (already_on_blockchain) {
					//Updating status of the address which are already on blockchain.
					const states = await whlist4.findOneAndUpdate(
						{ white_list4: addresses[i].white_list4, id: req.params.id },
						{ addr_status: "1" },
					);
				}

				//Giving address parameter in smart contract function.
				const result = await SimpleContract.methods.addWhitelistFour(
					addresses[i].white_list4,
				);

				//encoding address in ABI
				const encodedResult = result.encodeABI();

				const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
				//Signing transaction to upload address on blockchain.
				const signedTx = await web3.eth.accounts.signTransaction(
					{
						nonce: accountNonce,
						data: encodedResult,
						from: FROM_ADDRESS,
						gasPrice: 13000000000,
						gas: 5000000,
						to: contractAddr,
					},
					PRIVATE_KEY,
					false,
				);
				//sending signed transaction.
				const transaction = await web3.eth.sendSignedTransaction(
					signedTx.rawTransaction,
				);
				if (transaction.status) {
					//Updating status of the address which has been uploaded on blockchain successfully.
					const states = await whlist4.findOneAndUpdate(
						{ white_list4: addresses[i].white_list4, id: req.params.id },
						{ addr_status: "1" },
					);
					const upload_in_csv = new csvFileModel({ user_address: addresses[i].white_list4, tier: 4, ido_id: pool_id })
					await upload_in_csv.save();
				}
			}
			res.json({ msg: "addresses are uploaded on blockchan successfully!" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to upload the address of white list Five on blockchain.
	addWhitelist5: async (req, res) => {
		try {
			pool_id = req.params.id;
			const contract_address = await upcModel.findOne({
				_id: pool_id,
			});
			//Getting contract address of the pool.
			const contractAddr = contract_address.address.toUpperCase();
			const SimpleContract = new web3.eth.Contract(
				SeedifyFundsContractAbi,
				contractAddr,
			);
			const addresses = await whlist5.find({
				addr_status: "0",
				id: req.params.id,
			});

			if (!addresses.length) {
				return res.status(200).json({
					msg: "No address is remaining to be uploaded on blockchain",
				});
			}

			for (i = 0; i < addresses.length; i++) {
				//Checking whether the address is on blockchain or not. 
				const already_on_blockchain = await SimpleContract.methods
					.getWhitelistFive(addresses[i].white_list5)
					.call();

				if (already_on_blockchain) {
					//Updating status of the address which are already on blockchain.
					const states = await whlist5.findOneAndUpdate(
						{ white_list5: addresses[i].white_list5, id: req.params.id },
						{ addr_status: "1" },
					);
				}

				//Giving address parameter in smart contract function.
				const result = await SimpleContract.methods.addWhitelistFive(
					addresses[i].white_list5,
				);

				//encoding address in ABI
				const encodedResult = result.encodeABI();

				const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
				//Signing transaction to upload address on blockchain.
				const signedTx = await web3.eth.accounts.signTransaction(
					{
						nonce: accountNonce,
						data: encodedResult,
						from: FROM_ADDRESS,
						gasPrice: 13000000000,
						gas: 5000000,
						to: contractAddr,
					},
					PRIVATE_KEY,
					false,
				);
				//sending signed transaction.
				const transaction = await web3.eth.sendSignedTransaction(
					signedTx.rawTransaction,
				);
				if (transaction.status) {
					//Updating status of the address which has been uploaded on blockchain successfully.
					const states = await whlist5.findOneAndUpdate(
						{ white_list5: addresses[i].white_list5, id: req.params.id },
						{ addr_status: "1" },
					);
					const upload_in_csv = new csvFileModel({ user_address: addresses[i].white_list5, tier: 5, ido_id: pool_id })
					await upload_in_csv.save();
				}
			}
			res.json({ msg: "addresses are uploaded on blockchan successfully!" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to upload the address of white list six on blockchain.
	addWhitelist6: async (req, res) => {
		try {
			pool_id = req.params.id;
			const contract_address = await upcModel.findOne({
				_id: pool_id,
			});
			//Getting contract address of the pool.
			const contractAddr = contract_address.address.toUpperCase();
			const SimpleContract = new web3.eth.Contract(
				SeedifyFundsContractAbi,
				contractAddr,
			);
			const addresses = await whlist6.find({
				addr_status: "0",
				id: req.params.id,
			});

			if (!addresses.length) {
				return res.status(200).json({
					msg: "No address is remaining to be uploaded on blockchain",
				});
			}

			for (i = 0; i < addresses.length; i++) {
				//Checking whether the address is on blockchain or not. 
				const already_on_blockchain = await SimpleContract.methods
					.getWhitelistSix(addresses[i].white_list6)
					.call();

				if (already_on_blockchain) {
					//Updating status of the address which are already on blockchain.
					const states = await whlist6.findOneAndUpdate(
						{ white_list6: addresses[i].white_list6, id: req.params.id },
						{ addr_status: "1" },
					);
				}

				//Giving address parameter in smart contract function.
				const result = await SimpleContract.methods.addWhitelistSix(
					addresses[i].white_list6,
				);

				//encoding address in ABI
				const encodedResult = result.encodeABI();

				const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
				//Signing transaction to upload address on blockchain.
				const signedTx = await web3.eth.accounts.signTransaction(
					{
						nonce: accountNonce,
						data: encodedResult,
						from: FROM_ADDRESS,
						gasPrice: 13000000000,
						gas: 5000000,
						to: contractAddr,
					},
					PRIVATE_KEY,
					false,
				);
				//sending signed transaction.
				const transaction = await web3.eth.sendSignedTransaction(
					signedTx.rawTransaction,
				);
				if (transaction.status) {
					//Updating status of the address which has been uploaded on blockchain successfully.
					const states = await whlist6.findOneAndUpdate(
						{ white_list6: addresses[i].white_list6, id: req.params.id },
						{ addr_status: "1" },
					);
					const upload_in_csv = new csvFileModel({ user_address: addresses[i].white_list6, tier: 6, ido_id: pool_id })
					await upload_in_csv.save();
				}
			}
			res.json({ msg: "addresses are uploaded on blockchan successfully!" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to upload the address of white list six on blockchain.
	addWhitelist7: async (req, res) => {
		try {
			pool_id = req.params.id;
			const contract_address = await upcModel.findOne({
				_id: pool_id,
			});
			//Getting contract address of the pool.
			const contractAddr = contract_address.address.toUpperCase();
			const SimpleContract = new web3.eth.Contract(
				SeedifyFundsContractAbi,
				contractAddr,
			);
			const addresses = await whlist7.find({
				addr_status: "0",
				id: req.params.id,
			});

			if (!addresses.length) {
				return res.status(200).json({
					msg: "No address is remaining to be uploaded on blockchain",
				});
			}

			for (i = 0; i < addresses.length; i++) {
				//Checking whether the address is on blockchain or not. 
				const already_on_blockchain = await SimpleContract.methods
					.getWhitelistSeven(addresses[i].white_list7)
					.call();

				if (already_on_blockchain) {
					//Updating status of the address which are already on blockchain.
					const states = await whlist7.findOneAndUpdate(
						{ white_list7: addresses[i].white_list7, id: req.params.id },
						{ addr_status: "1" },
					);
				}

				//Giving address parameter in smart contract function.
				const result = await SimpleContract.methods.addWhitelistSeven(
					addresses[i].white_list7,
				);

				//encoding address in ABI
				const encodedResult = result.encodeABI();

				const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
				//Signing transaction to upload address on blockchain.
				const signedTx = await web3.eth.accounts.signTransaction(
					{
						nonce: accountNonce,
						data: encodedResult,
						from: FROM_ADDRESS,
						gasPrice: 13000000000,
						gas: 5000000,
						to: contractAddr,
					},
					PRIVATE_KEY,
					false,
				);
				//sending signed transaction.
				const transaction = await web3.eth.sendSignedTransaction(
					signedTx.rawTransaction,
				);
				if (transaction.status) {
					//Updating status of the address which has been uploaded on blockchain successfully.
					const states = await whlist7.findOneAndUpdate(
						{ white_list7: addresses[i].white_list7, id: req.params.id },
						{ addr_status: "1" },
					);
					const upload_in_csv = new csvFileModel({ user_address: addresses[i].white_list7, tier: 7, ido_id: pool_id })
					await upload_in_csv.save();
				}
			}
			res.json({ msg: "addresses are uploaded on blockchan successfully!" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to upload the address of white list six on blockchain.
	addWhitelist8: async (req, res) => {
		try {
			pool_id = req.params.id;
			const contract_address = await upcModel.findOne({
				_id: pool_id,
			});
			//Getting contract address of the pool.
			const contractAddr = contract_address.address.toUpperCase();
			const SimpleContract = new web3.eth.Contract(
				SeedifyFundsContractAbi,
				contractAddr,
			);
			const addresses = await whlist8.find({
				addr_status: "0",
				id: req.params.id,
			});

			if (!addresses.length) {
				return res.status(200).json({
					msg: "No address is remaining to be uploaded on blockchain",
				});
			}

			for (i = 0; i < addresses.length; i++) {
				//Checking whether the address is on blockchain or not. 
				const already_on_blockchain = await SimpleContract.methods
					.getWhitelistEight(addresses[i].white_list8)
					.call();

				if (already_on_blockchain) {
					//Updating status of the address which are already on blockchain.
					const states = await whlist8.findOneAndUpdate(
						{ white_list8: addresses[i].white_list8, id: req.params.id },
						{ addr_status: "1" },
					);
				}

				//Giving address parameter in smart contract function.
				const result = await SimpleContract.methods.addWhitelistEight(
					addresses[i].white_list8,
				);

				//encoding address in ABI
				const encodedResult = result.encodeABI();

				const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
				//Signing transaction to upload address on blockchain.
				const signedTx = await web3.eth.accounts.signTransaction(
					{
						nonce: accountNonce,
						data: encodedResult,
						from: FROM_ADDRESS,
						gasPrice: 13000000000,
						gas: 5000000,
						to: contractAddr,
					},
					PRIVATE_KEY,
					false,
				);
				//sending signed transaction.
				const transaction = await web3.eth.sendSignedTransaction(
					signedTx.rawTransaction,
				);
				if (transaction.status) {
					//Updating status of the address which has been uploaded on blockchain successfully.
					const states = await whlist8.findOneAndUpdate(
						{ white_list8: addresses[i].white_list8, id: req.params.id },
						{ addr_status: "1" },
					);
					const upload_in_csv = new csvFileModel({ user_address: addresses[i].white_list8, tier: 8, ido_id: pool_id })
					await upload_in_csv.save();
				}
			}
			res.json({ msg: "addresses are uploaded on blockchan successfully!" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to upload the address of white list six on blockchain.
	addWhitelist9: async (req, res) => {
		try {
			pool_id = req.params.id;
			const contract_address = await upcModel.findOne({
				_id: pool_id,
			});
			//Getting contract address of the pool.
			const contractAddr = contract_address.address.toUpperCase();
			const SimpleContract = new web3.eth.Contract(
				SeedifyFundsContractAbi,
				contractAddr,
			);
			const addresses = await whlist9.find({
				addr_status: "0",
				id: req.params.id,
			});

			if (!addresses.length) {
				return res.status(200).json({
					msg: "No address is remaining to be uploaded on blockchain",
				});
			}

			for (i = 0; i < addresses.length; i++) {
				//Checking whether the address is on blockchain or not. 
				const already_on_blockchain = await SimpleContract.methods
					.getWhitelistNine(addresses[i].white_list9)
					.call();

				if (already_on_blockchain) {
					//Updating status of the address which are already on blockchain.
					const states = await whlist9.findOneAndUpdate(
						{ white_list9: addresses[i].white_list9, id: req.params.id },
						{ addr_status: "1" },
					);
				}

				//Giving address parameter in smart contract function.
				const result = await SimpleContract.methods.addWhitelistNine(
					addresses[i].white_list9,
				);

				//encoding address in ABI
				const encodedResult = result.encodeABI();

				const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
				//Signing transaction to upload address on blockchain.
				const signedTx = await web3.eth.accounts.signTransaction(
					{
						nonce: accountNonce,
						data: encodedResult,
						from: FROM_ADDRESS,
						gasPrice: 13000000000,
						gas: 5000000,
						to: contractAddr,
					},
					PRIVATE_KEY,
					false,
				);
				//sending signed transaction.
				const transaction = await web3.eth.sendSignedTransaction(
					signedTx.rawTransaction,
				);
				if (transaction.status) {
					//Updating status of the address which has been uploaded on blockchain successfully.
					const states = await whlist9.findOneAndUpdate(
						{ white_list9: addresses[i].white_list9, id: req.params.id },
						{ addr_status: "1" },
					);
					const upload_in_csv = new csvFileModel({ user_address: addresses[i].white_list9, tier: 9, ido_id: pool_id })
					await upload_in_csv.save();

				}
			}
			res.json({ msg: "addresses are uploaded on blockchan successfully!" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

};

module.exports = fetchBlockchainWhitelistCtrl;

