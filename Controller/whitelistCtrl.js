const whlist1 = require("../Model/whitelist1");
const whlist2 = require("../Model/whitelist2");
const whlist3 = require("../Model/whitelist3");
const whlist4 = require("../Model/whitelist4");
const whlist5 = require("../Model/whitelist5");
const whlist6 = require("../Model/whitelist6");
const whlist7 = require("../Model/whitelist7");
const whlist8 = require("../Model/whitelist8");
const whlist9 = require("../Model/whitelist9");
const csvFileModel = require("../Model/csvFileModel");

const Web3 = require("web3");

const csvtojson = require('csvtojson');
const rpcUrl = process.env.BSC_NET;
//http provider for web3.
const web3 = new Web3(
	new Web3.providers.HttpProvider(
		rpcUrl
	)
);
const whitelistCtrl = {
	//Function to add address in white list one.
	createWhitelist1: async (req, res) => {
		try {
			var { white_list1, id } = req.body;
			if (!white_list1) {
				return res.status(400).json({
					msg: "please enter a contract address",
				});
			}
			//Check to get valid address.
			const validAddress = web3.utils.isAddress(white_list1);
			if (!validAddress) {
				return res.status(400).json({
					msg: "Invalid Address",
				});
			}
			const addr = await whlist1.findOne({ white_list1, id });
			if (addr) {
				return res.status(400).json({
					msg: "This address is already exist",
				});
			}
			var white_list1 = white_list1.toLowerCase()
			//Saving address in white list one.
			const whitelist1 = new whlist1({
				white_list1,
				id,
			});

			await whitelist1.save();

			res.status(200).json({ msg: "Address is added in tier-1." });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	//Function to add address in white list two.
	createWhitelist2: async (req, res) => {
		try {
			var { white_list2, id } = req.body;
			if (!white_list2) {
				return res.status(400).json({
					msg: "please enter a contract address",
				});
			}
			//Check to get valid address.
			const validAddress = web3.utils.isAddress(white_list2);
			if (!validAddress) {
				return res.status(400).json({
					msg: "Invalid Address",
				});
			}

			const addr = await whlist2.findOne({ white_list2, id });
			if (addr) {
				return res.status(400).json({
					msg: "This address is already exist",
				});
			}
			var white_list2 = white_list2.toLowerCase()
			//Saving address in white list two.
			const whitelist2 = new whlist2({
				white_list2,
				id,
			});

			await whitelist2.save();
			res.status(200).json({ msg: "Address is added in tier-2." });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	//Function to add address in white list three.
	createWhitelist3: async (req, res) => {
		try {
			var { white_list3, id } = req.body;
			if (!white_list3) {
				return res.status(400).json({
					msg: "please enter a contract address",
				});
			}
			//Check to get valid address.
			const validAddress = web3.utils.isAddress(white_list3);
			if (!validAddress) {
				return res.status(400).json({
					msg: "Invalid Address",
				});
			}
			const addr = await whlist3.findOne({ white_list3, id });
			if (addr) {
				return res.status(400).json({
					msg: "This address is already exist",
				});
			}

			var white_list3 = white_list3.toLowerCase()
			//Saving address in white list three.
			const whitelist3 = new whlist3({
				white_list3,
				id,
			});

			await whitelist3.save();
			res.status(200).json({ msg: "Address is added in tier-3." });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},


	//Function to add address in white list four.
	createWhitelist4: async (req, res) => {
		try {
			var { white_list4, id } = req.body;
			if (!white_list4) {
				return res.status(400).json({
					msg: "please enter a contract address",
				});
			}
			//Check to get valid address.
			const validAddress = web3.utils.isAddress(white_list4);
			if (!validAddress) {
				return res.status(400).json({
					msg: "Invalid Address",
				});
			}
			const addr = await whlist4.findOne({ white_list4, id });
			if (addr) {
				return res.status(400).json({
					msg: "This address is already exist",
				});
			}

			var white_list4 = white_list4.toLowerCase()
			//Saving address in white list three.
			const whitelist4 = new whlist4({
				white_list4,
				id,
			});

			await whitelist4.save();
			res.status(200).json({ msg: "Address is added in tier-4." });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to add address in white list five.
	createWhitelist5: async (req, res) => {
		try {
			var { white_list5, id } = req.body;
			if (!white_list5) {
				return res.status(400).json({
					msg: "please enter a contract address",
				});
			}
			//Check to get valid address.
			const validAddress = web3.utils.isAddress(white_list5);
			if (!validAddress) {
				return res.status(400).json({
					msg: "Invalid Address",
				});
			}
			const addr = await whlist5.findOne({ white_list5, id });
			if (addr) {
				return res.status(400).json({
					msg: "This address is already exist",
				});
			}
			var white_list5 = white_list5.toLowerCase()
			//Saving address in white list three.
			const whitelist5 = new whlist5({
				white_list5,
				id,
			});

			await whitelist5.save();
			res.status(200).json({ msg: "Address is added in tier-5." });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to add address in white list six.
	createWhitelist6: async (req, res) => {
		try {
			var { white_list6, id } = req.body;
			if (!white_list6) {
				return res.status(400).json({
					msg: "please enter a contract address",
				});
			}
			//Check to get valid address.
			const validAddress = web3.utils.isAddress(white_list6);
			if (!validAddress) {
				return res.status(400).json({
					msg: "Invalid Address",
				});
			}
			const addr = await whlist6.findOne({ white_list6, id });
			if (addr) {
				return res.status(400).json({
					msg: "This address is already exist",
				});
			}

			var white_list6 = white_list6.toLowerCase()
			//Saving address in white list three.
			const whitelist6 = new whlist6({
				white_list6,
				id,
			});

			await whitelist6.save();
			res.status(200).json({ msg: "Address is added in tier-6." });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to add address in white list seven.
	createWhitelist7: async (req, res) => {
		try {
			var { white_list7, id } = req.body;
			if (!white_list7) {
				return res.status(400).json({
					msg: "please enter a contract address",
				});
			}
			//Check to get valid address.
			const validAddress = web3.utils.isAddress(white_list7);
			if (!validAddress) {
				return res.status(400).json({
					msg: "Invalid Address",
				});
			}
			const addr = await whlist7.findOne({ white_list7, id });
			if (addr) {
				return res.status(400).json({
					msg: "This address is already exist",
				});
			}
			var white_list7 = white_list7.toLowerCase()
			//Saving address in white list three.
			const whitelist7 = new whlist7({
				white_list7,
				id,
			});

			await whitelist7.save();
			res.status(200).json({ msg: "Address is added in tier-7." });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},


	//Function to add address in white list eight.
	createWhitelist8: async (req, res) => {
		try {
			var { white_list8, id } = req.body;
			if (!white_list8) {
				return res.status(400).json({
					msg: "please enter a contract address",
				});
			}
			//Check to get valid address.
			const validAddress = web3.utils.isAddress(white_list8);
			if (!validAddress) {
				return res.status(400).json({
					msg: "Invalid Address",
				});
			}
			const addr = await whlist8.findOne({ white_list8, id });
			if (addr) {
				return res.status(400).json({
					msg: "This address is already exist",
				});
			}
			var white_list8 = white_list8.toLowerCase()
			//Saving address in white list three.
			const whitelist8 = new whlist8({
				white_list8,
				id,
			});

			await whitelist8.save();
			res.status(200).json({ msg: "Address is added in tier-8." });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to add address in white list nine.
	createWhitelist9: async (req, res) => {
		try {
			var { white_list9, id } = req.body;
			if (!white_list9) {
				return res.status(400).json({
					msg: "please enter a contract address",
				});
			}
			//Check to get valid address.
			const validAddress = web3.utils.isAddress(white_list9);
			if (!validAddress) {
				return res.status(400).json({
					msg: "Invalid Address",
				});
			}
			const addr = await whlist9.findOne({ white_list9, id });
			if (addr) {
				return res.status(400).json({
					msg: "This address is already exist",
				});
			}
			var white_list9 = white_list9.toLowerCase()
			//Saving address in white list three.
			const whitelist9 = new whlist9({
				white_list9,
				id,
			});

			await whitelist9.save();
			res.status(200).json({ msg: "Address is added in tier-9." });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},


	//Function to get all addresses of white list one for that specific id.
	getwhitelistonebyId: async (req, res) => {
		try {
			var pages = req.params.param.split(',')[1]
			var id = req.params.param.split(',')[0]
			//Finding address in white list one by id.
			const whitelistone = await whlist1.find({ id: id });
			page = parseInt(pages) || 1;
			const pageSize = 10;
			const skip = (page - 1) * pageSize;
			const total = whitelistone.length;
			const totalPage = Math.ceil(total / pageSize);
			const paginatedlistone = await whlist1.find({ id: id }).skip(skip).limit(pageSize);

			res.json({ paginatedlistone: paginatedlistone, totalPage: totalPage });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	//Function to get all addresses of white list two for that specific id. 
	getwhitelisttwobyId: async (req, res) => {
		try {
			var pages = req.params.param.split(',')[1]
			var id = req.params.param.split(',')[0]

			//Finding address in white list two by id.
			const whitelisttwo = await whlist2.find({ id: id });
			page = parseInt(pages) || 1;
			const pageSize = 10;
			const skip = (page - 1) * pageSize;
			const total = whitelisttwo.length;
			const totalPage = Math.ceil(total / pageSize);
			const paginatedlisttwo = await whlist2.find({ id: id }).skip(skip).limit(pageSize);
			res.json({ paginatedlisttwo: paginatedlisttwo, totalPage: totalPage });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	//Function to get all addresses of white list three for that specific id.
	getwhitelistthreebyId: async (req, res) => {
		try {
			var pages = req.params.param.split(',')[1]
			var id = req.params.param.split(',')[0]

			//Finding address in white list three by id.
			const whitelistthree = await whlist3.find({ id: id });
			page = parseInt(pages) || 1;
			const pageSize = 10;
			const skip = (page - 1) * pageSize;
			const total = whitelistthree.length;
			const totalPage = Math.ceil(total / pageSize);
			const paginatedlistthree = await whlist3.find({ id: id }).skip(skip).limit(pageSize);
			res.json({ paginatedlistthree: paginatedlistthree, totalPage: totalPage });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to get all addresses of white list four for that specific id.
	getwhitelistfourbyId: async (req, res) => {
		try {
			var pages = req.params.param.split(',')[1]
			var id = req.params.param.split(',')[0]

			//Finding address in white list four by id.
			const whitelistfour = await whlist4.find({ id: id });
			page = parseInt(pages) || 1;
			const pageSize = 10;
			const skip = (page - 1) * pageSize;
			const total = whitelistfour.length;
			const totalPage = Math.ceil(total / pageSize);
			const paginatedlistfour = await whlist4.find({ id: id }).skip(skip).limit(pageSize);
			res.json({ paginatedlistfour: paginatedlistfour, totalPage: totalPage });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to get all addresses of white list five for that specific id.
	getwhitelistfivebyId: async (req, res) => {
		try {
			var pages = req.params.param.split(',')[1]
			var id = req.params.param.split(',')[0]

			//Finding address in white list five by id.
			const whitelistfive = await whlist5.find({ id: id });
			page = parseInt(pages) || 1;
			const pageSize = 10;
			const skip = (page - 1) * pageSize;
			const total = whitelistfive.length;
			const totalPage = Math.ceil(total / pageSize);
			const paginatedlistfive = await whlist5.find({ id: id }).skip(skip).limit(pageSize);
			res.json({ paginatedlistfive: paginatedlistfive, totalPage: totalPage });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to get all addresses of white list six for that specific id.
	getwhitelistsixbyId: async (req, res) => {
		try {
			var pages = req.params.param.split(',')[1]
			var id = req.params.param.split(',')[0]

			//Finding address in white list six by id.
			const whitelistsix = await whlist6.find({ id: id });
			page = parseInt(pages) || 1;
			const pageSize = 10;
			const skip = (page - 1) * pageSize;
			const total = whitelistsix.length;
			const totalPage = Math.ceil(total / pageSize);
			const paginatedlistsix = await whlist6.find({ id: id }).skip(skip).limit(pageSize);
			res.json({ paginatedlistsix: paginatedlistsix, totalPage: totalPage });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},


	//Function to get all addresses of white list seven for that specific id.
	getwhitelistsevenbyId: async (req, res) => {
		try {
			var pages = req.params.param.split(',')[1]
			var id = req.params.param.split(',')[0]

			//Finding address in white list seven by id.
			const whitelistseven = await whlist7.find({ id: id });
			page = parseInt(pages) || 1;
			const pageSize = 10;
			const skip = (page - 1) * pageSize;
			const total = whitelistseven.length;
			const totalPage = Math.ceil(total / pageSize);
			const paginatedlistseven = await whlist7.find({ id: id }).skip(skip).limit(pageSize);
			res.json({ paginatedlistseven: paginatedlistseven, totalPage: totalPage });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to get all addresses of white list eight for that specific id.
	getwhitelisteightbyId: async (req, res) => {
		try {
			var pages = req.params.param.split(',')[1]
			var id = req.params.param.split(',')[0]

			//Finding address in white list eight by id.
			const whitelisteight = await whlist8.find({ id: id });
			page = parseInt(pages) || 1;
			const pageSize = 10;
			const skip = (page - 1) * pageSize;
			const total = whitelisteight.length;
			const totalPage = Math.ceil(total / pageSize);
			const paginatedlisteight = await whlist8.find({ id: id }).skip(skip).limit(pageSize);
			res.json({ paginatedlisteight: paginatedlisteight, totalPage: totalPage });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to get all addresses of white list nine for that specific id.
	getwhitelistninebyId: async (req, res) => {
		try {
			var pages = req.params.param.split(',')[1]
			var id = req.params.param.split(',')[0]

			//Finding address in white list nine by id.
			const whitelistnine = await whlist9.find({ id: id });
			page = parseInt(pages) || 1;
			const pageSize = 10;
			const skip = (page - 1) * pageSize;
			const total = whitelistnine.length;
			const totalPage = Math.ceil(total / pageSize);
			const paginatedlistnine = await whlist9.find({ id: id }).skip(skip).limit(pageSize);
			res.json({ paginatedlistnine: paginatedlistnine, totalPage: totalPage });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},


	//Function to add csv file of addresses in white list one in database.
	addcsvinwhitelistone: async (req, res) => {
		try {
			const fileName = `${__dirname}/../csv/data1.csv`;
			var arrayToInsert = [];
			//Here we are taking addresses from csv and storing in an arrayToInsert.
			csvtojson().fromFile(fileName).then((source) => {
				for (var i = 0; i < source.length; i++) {

					var oneRow = {
						id: req.params.id,
						white_list1: source[i]['userAddress']
					};
					arrayToInsert.push(oneRow);
				}
				//Inserting csv file addresses in white list one.
				whlist1.insertMany(arrayToInsert, (err, result) => {
					if (err) console.log(err);
					if (result) {
						res.status(200).json({ msg: "Import CSV into whitelistone successfully" });
					}
				});
			});


		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	//Function to add csv file of addresses in white list two in database.
	addcsvinwhitelisttwo: async (req, res) => {
		try {
			const fileName = `${__dirname}/../csv/data2.csv`;
			var arrayToInsert = [];
			//Here we are taking addresses from csv and storing in an arrayToInsert.
			csvtojson().fromFile(fileName).then((source) => {

				for (var i = 0; i < source.length; i++) {
					var oneRow = {
						id: req.params.id,
						white_list2: source[i]['userAddress']
					};
					arrayToInsert.push(oneRow);
				}
				//Inserting csv file addresses in white list two.
				whlist2.insertMany(arrayToInsert, (err, result) => {
					if (err) console.log(err);
					if (result) {
						res.status(200).json({ msg: "Import CSV into whitelisttwo successfully" });
					}
				});
			});

		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	//Function to add csv file of addresses in white list three in database.
	addcsvinwhitelistthree: async (req, res) => {
		try {
			const fileName = `${__dirname}/../csv/data3.csv`;
			var arrayToInsert = [];

			//Here we are taking addresses from csv and storing in an arrayToInsert.
			csvtojson().fromFile(fileName).then((source) => {
				for (var i = 0; i < source.length; i++) {
					var oneRow = {
						id: req.params.id,
						white_list3: source[i]['userAddress']
					};
					arrayToInsert.push(oneRow);
				}

				//Inserting csv file addresses in white list three.
				whlist3.insertMany(arrayToInsert, (err, result) => {
					if (err) console.log(err);
					if (result) {
						res.status(200).json({ msg: "Import CSV into whitelistthree successfully" });
					}
				});
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to add csv file of addresses in white list four in database.
	addcsvinwhitelistfour: async (req, res) => {
		try {
			const fileName = `${__dirname}/../csv/data4.csv`;
			var arrayToInsert = [];

			//Here we are taking addresses from csv and storing in an arrayToInsert.
			csvtojson().fromFile(fileName).then((source) => {
				for (var i = 0; i < source.length; i++) {
					var oneRow = {
						id: req.params.id,
						white_list4: source[i]['userAddress']
					};
					arrayToInsert.push(oneRow);
				}

				//Inserting csv file addresses in white list four.
				whlist4.insertMany(arrayToInsert, (err, result) => {
					if (err) console.log(err);
					if (result) {
						res.status(200).json({ msg: "Import CSV into whitelistfour successfully" });
					}
				});
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to add csv file of addresses in white list five in database.
	addcsvinwhitelistfive: async (req, res) => {
		try {
			const fileName = `${__dirname}/../csv/data5.csv`;
			var arrayToInsert = [];

			//Here we are taking addresses from csv and storing in an arrayToInsert.
			csvtojson().fromFile(fileName).then((source) => {
				for (var i = 0; i < source.length; i++) {
					var oneRow = {
						id: req.params.id,
						white_list5: source[i]['userAddress']
					};
					arrayToInsert.push(oneRow);
				}

				//Inserting csv file addresses in white list five.
				whlist5.insertMany(arrayToInsert, (err, result) => {
					if (err) console.log(err);
					if (result) {
						res.status(200).json({ msg: "Import CSV into whitelistfive successfully" });
					}
				});
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to add csv file of addresses in white list six in database.
	addcsvinwhitelistsix: async (req, res) => {
		try {
			const fileName = `${__dirname}/../csv/data6.csv`;
			var arrayToInsert = [];

			//Here we are taking addresses from csv and storing in an arrayToInsert.
			csvtojson().fromFile(fileName).then((source) => {
				for (var i = 0; i < source.length; i++) {
					var oneRow = {
						id: req.params.id,
						white_list6: source[i]['userAddress']
					};
					arrayToInsert.push(oneRow);
				}

				//Inserting csv file addresses in white list six.
				whlist6.insertMany(arrayToInsert, (err, result) => {
					if (err) console.log(err);
					if (result) {
						res.status(200).json({ msg: "Import CSV into whitelistsix successfully" });
					}
				});
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to add csv file of addresses in white list seven in database.
	addcsvinwhitelistseven: async (req, res) => {
		try {
			const fileName = `${__dirname}/../csv/data7.csv`;
			var arrayToInsert = [];

			//Here we are taking addresses from csv and storing in an arrayToInsert.
			csvtojson().fromFile(fileName).then((source) => {
				for (var i = 0; i < source.length; i++) {
					var oneRow = {
						id: req.params.id,
						white_list7: source[i]['userAddress']
					};
					arrayToInsert.push(oneRow);
				}

				//Inserting csv file addresses in white list seven.
				whlist7.insertMany(arrayToInsert, (err, result) => {
					if (err) console.log(err);
					if (result) {
						res.status(200).json({ msg: "Import CSV into whitelistseven successfully" });
					}
				});
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to add csv file of addresses in white list eight in database.
	addcsvinwhitelisteight: async (req, res) => {
		try {
			const fileName = `${__dirname}/../csv/data8.csv`;
			var arrayToInsert = [];

			//Here we are taking addresses from csv and storing in an arrayToInsert.
			csvtojson().fromFile(fileName).then((source) => {
				for (var i = 0; i < source.length; i++) {
					var oneRow = {
						id: req.params.id,
						white_list8: source[i]['userAddress']
					};
					arrayToInsert.push(oneRow);
				}

				//Inserting csv file addresses in white list eight.
				whlist8.insertMany(arrayToInsert, (err, result) => {
					if (err) console.log(err);
					if (result) {
						res.status(200).json({ msg: "Import CSV into whitelisteight successfully" });
					}
				});
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to add csv file of addresses in white list nine in database.
	addcsvinwhitelistnine: async (req, res) => {
		try {
			const fileName = `${__dirname}/../csv/data9.csv`;
			var arrayToInsert = [];

			//Here we are taking addresses from csv and storing in an arrayToInsert.
			csvtojson().fromFile(fileName).then((source) => {
				for (var i = 0; i < source.length; i++) {
					var oneRow = {
						id: req.params.id,
						white_list9: source[i]['userAddress']
					};
					arrayToInsert.push(oneRow);
				}

				//Inserting csv file addresses in white list nine.
				whlist9.insertMany(arrayToInsert, (err, result) => {
					if (err) console.log(err);
					if (result) {
						res.status(200).json({ msg: "Import CSV into whitelistnine successfully" });
					}
				});
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},




	//ADDIGNG CSV IN WHITELIST FROM ADMIN SIDE
	addcsvfileinwhitelistone: async (req, res) => {
		try {
			const { data, id } = req.body;
			var list = [];
			for (i = 0; i < data.length; i++) {
				list.push({
					id: id,
					white_list1: data[i][0]
				})
			}

			//Inserting csv file addresses in white list one.
			whlist1.insertMany(list, (err, result) => {
				if (err) console.log(err);
				if (result) {
					res.status(200).json({ msg: "The CSV file has been imported successfully in tier-1" });
				}
			});

		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	//Function to add csv file of addresses in white list two in database.
	addcsvfileinwhitelisttwo: async (req, res) => {
		try {
			const { data, id } = req.body;
			var list = [];
			for (i = 0; i < data.length; i++) {
				list.push({
					id: id,
					white_list2: data[i][0]
				})
			}
			//Inserting csv file addresses in white list two.
			whlist2.insertMany(list, (err, result) => {
				if (err) console.log(err);
				if (result) {
					res.status(200).json({ msg: "The CSV file has been imported successfully in tier-2" });
				}
			});


		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	//Function to add csv file of addresses in white list three in database.
	addcsvfileinwhitelistthree: async (req, res) => {
		try {
			const { data, id } = req.body;
			var list = [];
			for (i = 0; i < data.length; i++) {
				list.push({
					id: id,
					white_list3: data[i][0]
				})
			}
			//Inserting csv file addresses in white list three.
			whlist3.insertMany(list, (err, result) => {
				if (err) console.log(err);
				if (result) {
					res.status(200).json({ msg: "The CSV file has been imported successfully in tier-3" });
				}
			});

		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to add csv file of addresses in white list four in database.
	addcsvfileinwhitelistfour: async (req, res) => {
		try {
			const { data, id } = req.body;
			var list = [];
			for (i = 0; i < data.length; i++) {
				list.push({
					id: id,
					white_list4: data[i][0]
				})
			}
			//Inserting csv file addresses in white list four.
			whlist4.insertMany(list, (err, result) => {
				if (err) console.log(err);
				if (result) {
					res.status(200).json({ msg: "The CSV file has been imported successfully in tier-4" });
				}
			});

		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to add csv file of addresses in white list five in database.
	addcsvfileinwhitelistfive: async (req, res) => {
		try {
			const { data, id } = req.body;
			var list = [];
			for (i = 0; i < data.length; i++) {
				list.push({
					id: id,
					white_list5: data[i][0]
				})
			}
			//Inserting csv file addresses in white list five.
			whlist5.insertMany(list, (err, result) => {
				if (err) console.log(err);
				if (result) {
					res.status(200).json({ msg: "The CSV file has been imported successfully in tier-5" });
				}
			});

		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to add csv file of addresses in white list six in database.
	addcsvfileinwhitelistsix: async (req, res) => {
		try {
			const { data, id } = req.body;
			var list = [];
			for (i = 0; i < data.length; i++) {
				list.push({
					id: id,
					white_list6: data[i][0]
				})
			}
			//Inserting csv file addresses in white list six.
			whlist6.insertMany(list, (err, result) => {
				if (err) console.log(err);
				if (result) {
					res.status(200).json({ msg: "The CSV file has been imported successfully in tier-6" });
				}
			});

		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to add csv file of addresses in white list seven in database.
	addcsvfileinwhitelistseven: async (req, res) => {
		try {
			const { data, id } = req.body;
			var list = [];
			for (i = 0; i < data.length; i++) {
				list.push({
					id: id,
					white_list7: data[i][0]
				})
			}
			//Inserting csv file addresses in white list seven.
			whlist7.insertMany(list, (err, result) => {
				if (err) console.log(err);
				if (result) {
					res.status(200).json({ msg: "The CSV file has been imported successfully in tier-7" });
				}
			});

		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to add csv file of addresses in white list eight in database.
	addcsvfileinwhitelisteight: async (req, res) => {
		try {
			const { data, id } = req.body;
			var list = [];
			for (i = 0; i < data.length; i++) {
				list.push({
					id: id,
					white_list8: data[i][0]
				})
			}
			//Inserting csv file addresses in white list eight.
			whlist8.insertMany(list, (err, result) => {
				if (err) console.log(err);
				if (result) {
					res.status(200).json({ msg: "The CSV file has been imported successfully in tier-8" });
				}
			});

		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to add csv file of addresses in white list nine in database.
	addcsvfileinwhitelistnine: async (req, res) => {
		try {
			const { data, id } = req.body;
			var list = [];
			for (i = 0; i < data.length; i++) {
				list.push({
					id: id,
					white_list9: data[i][0]
				})
			}
			//Inserting csv file addresses in white list nine.
			whlist9.insertMany(list, (err, result) => {
				if (err) console.log(err);
				if (result) {
					res.status(200).json({ msg: "The CSV file has been imported successfully in tier-9" });
				}
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	deletewhitelistone: async (req, res) => {
		try {
			const id = req.params.id;
			//Deleting ico by id.
			await whlist1.deleteMany({ id: id });
			await csvFileModel.deleteMany({ido_id : id, tier : 1})

			res.json({ msg: "whitelistone is deleted" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	deletewhitelisttwo: async (req, res) => {
		try {
			const id = req.params.id;
			//Deleting ico by id.
			await whlist2.deleteMany({ id: id });
			await csvFileModel.deleteMany({ido_id : id, tier : 2})
			res.json({ msg: "whitelisttwo is deleted" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	deletewhitelistthree: async (req, res) => {
		try {
			const id = req.params.id;
			//Deleting ico by id.
			await whlist3.deleteMany({ id: id });
			await csvFileModel.deleteMany({ido_id : id, tier : 3})
			res.json({ msg: "whitelistthree is deleted" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	deletewhitelistfour: async (req, res) => {
		try {
			const id = req.params.id;
			//Deleting ico by id.
			await whlist4.deleteMany({ id: id });
			await csvFileModel.deleteMany({ido_id : id, tier : 4})
			res.json({ msg: "whitelistfour is deleted" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	deletewhitelistfive: async (req, res) => {
		try {
			const id = req.params.id;
			//Deleting ico by id.
			await whlist5.deleteMany({ id: id });
			await csvFileModel.deleteMany({ido_id : id, tier : 5})
			res.json({ msg: "whitelistdfive is deleted" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	deletewhitelistsix: async (req, res) => {
		try {
			const id = req.params.id;
			//Deleting ico by id.
			await whlist6.deleteMany({ id: id });
			await csvFileModel.deleteMany({ido_id : id, tier : 6})
			res.json({ msg: "whitelistsix is deleted" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	deletewhitelistseven: async (req, res) => {
		try {
			const id = req.params.id;
			//Deleting ico by id.
			await whlist7.deleteMany({ id: id });
			await csvFileModel.deleteMany({ido_id : id, tier : 7})
			res.json({ msg: "whitelistseven is deleted" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	deletewhitelisteight: async (req, res) => {
		try {
			const id = req.params.id;
			//Deleting ico by id.
			await whlist8.deleteMany({ id: id });
			await csvFileModel.deleteMany({ido_id : id, tier : 8})
			res.json({ msg: "whitelisteight is deleted" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	deletewhitelistnine: async (req, res) => {
		try {
			const id = req.params.id;
			//Deleting ico by id.
			await whlist9.deleteMany({ id: id });
			await csvFileModel.deleteMany({ido_id : id, tier : 9})
			res.json({ msg: "whitelistnine is deleted" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	insertCsv1: async (req, res) => {
		try {
			const whitelistone = await whlist1.find();
			for (i = 0; i < whitelistone.length; i++) {
                const upload_in_csv = new csvFileModel({user_address: whitelistone[i].white_list1, tier: 1, ido_id: whitelistone[i].id });
				await upload_in_csv.save();
			}
			res.json({msg: "The CSV file has been imported successfully in tier-1"})
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	 },
	 insertCsv2: async (req, res) => {
		try {
			const whitelisttwo = await whlist2.find();
		    for (i = 0; i < whitelisttwo.length; i++) {
			upload_in_csv = new csvFileModel({ user_address: whitelisttwo[i].white_list2, tier: 2, ido_id: whitelisttwo[i].id })
			await upload_in_csv.save();
			}
		    res.json({msg: "The CSV file has been imported successfully in tier-2"})
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	insertCsv3: async (req, res) => {
		try {
			const whitelistthree = await whlist3.find();
			for (i = 0; i < whitelistthree.length; i++) {
			upload_in_csv = new csvFileModel({ user_address: whitelistthree[i].white_list3, tier: 3, ido_id: whitelistthree[i].id })
			await upload_in_csv.save();
			}
			res.json({msg: "The CSV file has been imported successfully in tier-3"})
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	insertCsv4: async (req, res) => {
		try {
			const whitelistfour = await whlist4.find();
		    for (i = 0; i < whitelistfour.length; i++) {
			upload_in_csv = new csvFileModel({ user_address: whitelistfour[i].white_list4, tier: 4, ido_id: whitelistfour[i].id })
		    await upload_in_csv.save();
			}
			res.json({msg: "The CSV file has been imported successfully in tier-4"})
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	insertCsv5: async (req, res) => {
		try {
			const whitelistfive = await whlist5.find();
			for (i = 0; i < whitelistfive.length; i++) {
			upload_in_csv = new csvFileModel({ user_address: whitelistfive[i].white_list5, tier: 5, ido_id: whitelistfive[i].id })
			await upload_in_csv.save();
			}
			res.json({msg: "The CSV file has been imported successfully in tier-5"})
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	insertCsv6: async (req, res) => {
		try {
		    const whitelistsix = await whlist6.find();
			for (i = 0; i < whitelistsix.length; i++) {
			upload_in_csv = new csvFileModel({ user_address: whitelistsix[i].white_list6, tier: 6, ido_id: whitelistsix[i].id })
			
			await upload_in_csv.save();
			}
			res.json({msg: "The CSV file has been imported successfully in tier-6"})
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	insertCsv7: async (req, res) => {
		try {
			const whitelistseven = await whlist7.find();
		    for (i = 0; i < whitelistseven.length; i++) {
			upload_in_csv = new csvFileModel({ user_address: whitelistseven[i].white_list7, tier: 7, ido_id: whitelistseven[i].id })
			await upload_in_csv.save();
			}
			res.json({msg: "The CSV file has been imported successfully in tier-7"})
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	insertCsv8: async (req, res) => {
		try {
			const whitelisteight = await whlist8.find();
	        for (i = 0; i < whitelisteight.length; i++) {
			upload_in_csv = new csvFileModel({ user_address: whitelisteight[i].white_list8, tier: 8, ido_id: whitelisteight[i].id })
		    await upload_in_csv.save();
			}
			res.json({msg: "The CSV file has been imported successfully in tier-8"})
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	insertCsv9: async (req, res) => {
		try {
			const whitelistnine = await whlist9.find();
			for (i = 0; i < whitelistnine.length; i++) {
			upload_in_csv = new csvFileModel({ user_address: whitelistnine[i].white_list9, tier: 9, ido_id: whitelistnine[i].id })
			await upload_in_csv.save();
			}
			res.json({msg: "The CSV file has been imported successfully in tier-9"})
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

};

module.exports = whitelistCtrl;
