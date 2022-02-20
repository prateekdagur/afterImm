const userAllocation = require("../Model/userAllocationModel");
const upPool = require("../Model/upcPoolModel");
const lottery = require("../Model/lotteryModel");

moment = require("moment");


const allocationCtrl = {
	get_dropdown: async (req, res) => {
		try {
			const upc_Pool = await upPool.find({ pool_type: "completed" });
			res.json({
				upc_pool: upc_Pool,
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	get_upcommingpool: async (req, res) => {
		try {
			const upc_Pool = await upPool.find({ pool_type: "upcomming" });
			res.json({
				upc_pool: upc_Pool,
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	dropdown_updatecontract: async (req, res) => {
		try {
			const upc_Pool = await upPool.find({ pool_type: "featured" });
			res.json({
				upc_pool: upc_Pool,
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},


	//Function to create ico pool.
	createAllocation: async (req, res) => {
		try {
			//Here we are taking addresses from csv and storing in an arrayToInsert.
			const { data, igo_id, igo_type } = req.body;
			var list = [];
			for (i = 0; i < data.length; i++) {
				list.push({
					wallet_address: data[i][0].toLowerCase(),
					user_allocation: data[i][1],
					igo_id,
					igo_type,
				})
			}
			//Inserting csv file addresses in white list one.
			userAllocation.insertMany(list, (err, result) => {
				if (err) console.log(err);
				if (result) {
					res.status(200).json({ msg: "Allocation is created successfully!" });
				}
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to add address to lottery.
	addToLottery: async (req, res) => {
		try {
			//Here we are taking addresses from csv and storing in an arrayToInsert.
			const { wallet, id } = req.body;

			//Check for unique wallet
			const data = await lottery.findOne({ wallet: wallet, poolId: id })
			const pool = await upPool.findOne({ _id: id })
			if (data) {
				return res.json({ msg: "You are already subscribed for the lottery!" })
			}

			const lotteryInstance = new lottery({
				wallet: wallet.toLowerCase(),
				title: pool.title,
				poolId: id
			})

			await lotteryInstance.save();
			res.json({ msg: "You have successfully subscribed for the lottery!" })
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to add address to lottery.
	exportLottery: async (req, res) => {
		try {
			const id = req.params.id;
		
			const data = await lottery.find({poolId : id})
			
			res.json(data)
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},



};

module.exports = allocationCtrl;
