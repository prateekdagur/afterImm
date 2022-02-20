const upPool = require("../Model/upcPoolModel");
const claimFactory = require("../Model/claimModel");
const whlist1 = require("../Model/whitelist1");
const whlist2 = require("../Model/whitelist2");
const whlist3 = require("../Model/whitelist3");
const csvfile = require("../Model/csvFileModel")
const userAllocation = require("../Model/userAllocationModel")
moment = require("moment");



const upcPoolCtrl = {
	//Function to create ico pool.
	createUpcPool: async (req, res) => {
		try {
			const {
				pool_type,
				start_date,
				end_date,
				title,
				Owner,
				price,
				time_duration,
				up_pool_raise,
				content,
				images,
				min_allocation,
				max_allocation,
				up_pool_access,
				participants,
				swap_amount,
				closes_in,
				min_swap_level,
				symbol,
				decimal,
				address,
				token_address,
				abi_name,
				total_supply,
				description,
				twitter_link,
				git_link,
				telegram_link,
				reddit_link,
				medium_link,
				browser_web_link,
				youtube,
				instagram,
				discord,
				white_paper,
				network_type,
				crypto_type,
				idophase,
				token_distribution_date,
				max_allocation_tierone,
				max_allocation_tiertwo,
				max_allocation_tierthree,
				max_allocation_tierfour,
				max_allocation_tierfive,
				max_allocation_tiersix,
				max_allocation_tierseven,
				max_allocation_tiereight,
				max_allocation_tiernine,
				min_allocation_tierone,
				min_allocation_tiertwo,
				min_allocation_tierthree,
				min_allocation_tierfour,
				min_allocation_tierfive,
				min_allocation_tiersix,
				min_allocation_tierseven,
				min_allocation_tiereight,
				min_allocation_tiernine,
				fblink,
				contract_type,
				distribution_type,
				blockNumber
			} = req.body;

			if (address) {
				//Check for unique address
				contract_address = await upPool.findOne({ address })
				if (contract_address) {
					return res.status(400).json({ msg: "This contract address is already exist" })
				}
			}
			if (!pool_type) {
				return res.status(400).json({ msg: "pool type is required." })
			}

			const newUpPool = new upPool({
				start_date,
				end_date,
				pool_type,
				title,
				Owner,
				price,
				time_duration,
				up_pool_raise,
				content,
				images,
				min_allocation,
				max_allocation,
				up_pool_access,
				participants,
				swap_amount,
				closes_in,
				min_swap_level,
				symbol,
				decimal,
				address,
				token_address,
				abi_name,
				total_supply,
				description,
				twitter_link,
				git_link,
				telegram_link,
				reddit_link,
				medium_link,
				browser_web_link,
				youtube,
				instagram,
				discord,
				white_paper,
				network_type,
				crypto_type,
				idophase,
				token_distribution_date,
				max_allocation_tierone,
				max_allocation_tiertwo,
				max_allocation_tierthree,
				max_allocation_tierfour,
				max_allocation_tierfive,
				max_allocation_tiersix,
				max_allocation_tierseven,
				max_allocation_tiereight,
				max_allocation_tiernine,
				min_allocation_tierone,
				min_allocation_tiertwo,
				min_allocation_tierthree,
				min_allocation_tierfour,
				min_allocation_tierfive,
				min_allocation_tiersix,
				min_allocation_tierseven,
				min_allocation_tiereight,
				min_allocation_tiernine,
				fblink,
				contract_type,
				distribution_type,
				blockNumber
			});


			newUpPool.abi_name = newUpPool._id + newUpPool.abi_name;
			//Saving ico pool in database.
			await newUpPool.save();
			res.json({
				id: newUpPool._id,
				msg: "pool is created",
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	//Function to read all ico pool with pagination.
	getUpcPool: async (req, res) => {
		try {
			//Reading ico
			const pool = await upPool.find();

			const upc_Pool = await upPool.find({ pool_type: "upcomming" }).sort({ start_date: 1 });
			const featured_Pool = await upPool.find({ pool_type: "featured" }).sort({ createdAt: -1 });
			const completed = await upPool.find({ pool_type: "completed" }).sort({ createdAt: -1 });
			const completed_Pool = await upPool.find({ pool_type: "completed" }).sort({ createdAt: -1 }).limit(10);
			//pagination.
			const page = parseInt(req.query.page) || 1;
			const pageSize = 9;
			const skip = (page - 1) * pageSize;


			const totalFeatured = featured_Pool.length;
			const totalfeaturedPage = Math.ceil(totalFeatured / pageSize);
			const paginatedFeatured_pool = await upPool
				.find({ pool_type: "featured" })
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(pageSize);

			const totalUpcomming = upc_Pool.length;
			const totalUpcommingPage = Math.ceil(totalUpcomming / pageSize);
			const paginatedUpcomming_pool = await upPool
				.find({ pool_type: "upcomming" })
				.sort({createdAt: -1})
				.skip(skip)
				.limit(pageSize);

			const totalcompleted = completed.length;
			const totalcompletedPage = Math.ceil(totalcompleted / pageSize);
			const paginatedCompleted = await upPool
				.find({ pool_type: "completed" })
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(pageSize);
			//setting UTC date.
			var date = new Date();
			date = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
				date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
			var start = upc_Pool.start_date;

			for (var i = 0; i < upc_Pool.length; i++) {
				var date = new Date();
				date = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
					date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
				var start = upc_Pool[i].start_date;

				if (date < start) {
					upc_Pool[i].time_duration = Math.floor(
						(start - date) / 1000 / (3600 * 24),
					);
				} else {
					upc_Pool[i].time_duration = -1;
				}
			}

			res.json({
				upcPool: upc_Pool,
				featured: featured_Pool,
				pool: pool,
				totalcompletedPage: totalcompletedPage,
				completed_Pool: paginatedCompleted,
				paginatedFeatured_pool: paginatedFeatured_pool,
				totalfeaturedPage: totalfeaturedPage,
				paginatedUpcomming_pool: paginatedUpcomming_pool,
				totalUpcommingPage: totalUpcommingPage,
				paginatedcompleted_pool: paginatedCompleted
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	getCompletedPool: async (req, res) => {
		try {
			//pagination.
			const pool = await upPool.find();

			const upc_Pool = await upPool.find({ pool_type: "upcomming" }).sort({ createdAt: -1 });
			const featured_Pool = await upPool.find({ pool_type: "featured" }).sort({ createdAt: -1 });


			var page = parseInt(req.query.page) || 1;
			const pageSize = 10;
			const skip = (page - 1) * pageSize;

			const totalFeatured = featured_Pool.length;
			const totalfeaturedPage = Math.ceil(totalFeatured / pageSize);
			const paginatedFeatured_pool = await upPool
				.find({ pool_type: "featured" })
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(pageSize);

			const totalUpcomming = upc_Pool.length;
			const totalUpcommingPage = Math.ceil(totalUpcomming / pageSize);
			const paginatedUpcomming_pool = await upPool
				.find({ pool_type: "upcomming" })
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(pageSize);


			page = parseInt(req.query.page) || 20;

			//completed show more
			const paginatedcompleted_pool = await upPool
				.find({ pool_type: "completed" })
				.sort({ createdAt: -1 })
				.limit(page ? page : 20);


			//setting UTC date.
			var date = new Date();
			date = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
				date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
			var start = upc_Pool.start_date;

			for (var i = 0; i < upc_Pool.length; i++) {
				var date = new Date();
				date = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
					date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
				var start = upc_Pool[i].start_date;

				if (date < start) {
					upc_Pool[i].time_duration = Math.floor(
						(start - date) / 1000 / (3600 * 24),
					);
				} else {
					upc_Pool[i].time_duration = -1;
				}
			}
			res.json({
				paginatedcompleted_pool: paginatedcompleted_pool,
				upcPool: upc_Pool,
				featured: featured_Pool,
				pool: pool,
				paginatedFeatured_pool: paginatedFeatured_pool,
				totalfeaturedPage: totalfeaturedPage,
				paginatedUpcomming_pool: paginatedUpcomming_pool,
				totalUpcommingPage: totalUpcommingPage,
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	getProfile: async (req, res) => {
		try {
			const data = req.query.page;
			const addr = data.split(',')[0].toLowerCase();

			//Reading ico


			const featured_Pool = await upPool.find({ pool_type: "featured" }).sort({ createdAt: -1 });
			const completed = await upPool.find({ pool_type: "completed" }).sort({ createdAt: -1 });

			//pagination.

			const pageSize = parseInt(data.split(',')[1]);

			const totalFeatured = featured_Pool.length;
			const totalfeaturedPage = Math.ceil(totalFeatured / pageSize);
			const paginatedFeatured_pool = await upPool
				.find({ pool_type: "featured" })
				.sort({ createdAt: -1 })
				.limit(pageSize);
			const totalcompleted = completed.length;
			const totalcompletedPage = Math.ceil(totalcompleted / pageSize);
			const paginatedCompleted = await upPool
				.find({ pool_type: "completed" })
				.sort({ createdAt: -1 })
				.limit(pageSize);

			if (addr) {
				if (paginatedCompleted.length > 0) {
					for (var i = 0; i < paginatedCompleted.length; i++) {

						const csvGetTier = await csvfile.find({ user_address: addr.toLowerCase(), ido_id: paginatedCompleted[i]._id })

						const allocation = await userAllocation.aggregate([
							{ $match: { wallet_address: addr.toLowerCase() } },
							{
								$group: {
									_id: { igo_id: "$igo_id" },
									total: {
										$sum: "$user_allocation"
									}

								}
							}
						])

						if (csvGetTier[0]) {
							paginatedCompleted[i].tier = csvGetTier[0].tier

						}
						if (allocation) {
							for (let i = 0; i < allocation.length; i++) {
								if (JSON.stringify(allocation[i]._id.igo_id) === JSON.stringify(paginatedCompleted[i]._id)) {
									paginatedCompleted[i].alloca_tion = allocation[i].total
								}
							}

						}

					}
				}
			}

			res.json({
				totalcompletedPage: totalcompletedPage,
				paginatedFeatured_pool: paginatedFeatured_pool,
				totalfeaturedPage: totalfeaturedPage,
				paginatedcompleted_pool: paginatedCompleted
			});

		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	//Function to read specific ico by its id.
	getPoolbyId: async (req, res) => {
		try {
			const pool = await upPool.findById({ _id: req.params.id });
			var date = new Date();
			date = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
				date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

			var start = pool.start_date;
			var end = pool.end_date;
			var time_duration_sec = (start - date) / 1000

			if (date < start) {
				var time_duration_days = Math.floor(
					time_duration_sec / (3600 * 24),
				);
				time_duration_sec -= time_duration_days * 86400;
				var time_duration_hours = Math.floor(time_duration_sec / 3600) % 24;
				time_duration_sec -= time_duration_hours * 3600;

				var time_duration_minutes = Math.floor(time_duration_sec / 60) % 60;
				time_duration_sec -= time_duration_minutes * 60;

				var seconds = Math.floor(time_duration_sec % 60);
				if (date > end) {
					pool.time_duration = -1;
				} else {
					pool.time_duration = `${time_duration_days}:${time_duration_hours}:${time_duration_minutes}:${seconds}`
				}
			} else {
				pool.time_duration = -1;
			}
			if (end >= date) {
				var closes_in_sec = (end - date) / 1000;

				if (date >= start) {
					var closes_in_days = Math.floor(
						closes_in_sec / (3600 * 24),
					);
					closes_in_sec -= closes_in_days * 86400;
					var closes_in_hours = Math.floor(closes_in_sec / 3600) % 24;
					closes_in_sec -= closes_in_hours * 3600;

					var closes_in_minutes = Math.floor(closes_in_sec / 60) % 60;
					closes_in_sec -= closes_in_minutes * 60;

					var closes_seconds = Math.floor(closes_in_sec % 60);
					pool.closes_in = `${closes_in_days}:${closes_in_hours}:${closes_in_minutes}:${closes_seconds}`
				}
			} else {
				pool.closes_in = -1;
			}
			res.json(pool);
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to read ico pool with pagination.
	getPoolByPagignation: async function (req, res) {
		try {
			const per_page_item = parseInt(req.query.per_page) || 12;
			const page_no = req.query.page_no ? parseInt(req.query.page_no) : 1;
			//Counting documents.
			const count_items = await upPool.countDocuments({
				pool_type: "upcomming",
			});
			const total_pages = Math.ceil(count_items / per_page_item);
			pagination = {
				limit: per_page_item,
				skip: per_page_item * (page_no - 1),
			};
			const upc_Pool = await upPool
				.find({ pool_type: "upcomming" })
				.limit(pagination.limit)
				.skip(pagination.skip);

			if (upc_Pool.length == 0) {
				return res.json({ msg: "there is no data" });
			}
			var date = new Date();
			date = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
				date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
			var start = upc_Pool.start_date;
			var end = upc_Pool.end_date;
			upc_Pool.time_duration = Math.floor(
				(start - date) / 1000 / (3600 * 24),
			);
			upc_Pool.closes_in = Math.floor(
				(end - date) / 1000 / (3600 * 24),
			);

			res.json({
				current_page: page_no,
				upcPool: upc_Pool,
				total_pages: total_pages,
			});
		} catch (e) {
			return res.status(500).send(e.message);
		}
	},

	//Function to update specific ico by its id.
	updateUpcPool: async (req, res) => {
		try {
			const Upc_pool_id = req.body.id;
			
			//Updating values
			const updatedUpcPool = await upPool.updateOne(
				{ _id: Upc_pool_id },
				{
					distribution_type: req.body.distribution_type,
					contract_type: req.body.contract_type,
					network_type: req.body.network_type,
					idophase: req.body.idophase,
					pool_type: req.body.pool_type,
					start_date: req.body.start_date,
					end_date: req.body.end_date,
					title: req.body.title,
					Owner: req.body.Owner,
					time_duration: req.body.time_duration,
					up_pool_raise: req.body.up_pool_raise,
					content: req.body.content,
					images: req.body.images,
					price: req.body.price,
					min_allocation: req.body.min_allocation,
					max_allocation: req.body.max_allocation,
					up_pool_access: req.body.up_pool_access,
					participants: req.body.participants,
					swap_amount: req.body.swap_amount,
					closes_in: req.body.closes_in,
					min_swap_level: req.body.min_swap_level,
					symbol: req.body.symbol,
					decimal: req.body.decimal,
					address: req.body.address,
					token_address: req.body.token_address,
					abi_name: req.body.abi_name,
					total_supply: req.body.total_supply,
					description: req.body.description,
					twitter_link: req.body.twitter_link,
					git_link: req.body.git_link,
					telegram_link: req.body.telegram_link,
					reddit_link: req.body.reddit_link,
					medium_link: req.body.medium_link,
					browser_web_link: req.body.browser_web_link,
					youtube: req.body.youtube,
					instagram: req.body.instagram,
					discord: req.body.discord,
					white_paper: req.body.white_paper,
					crypto_type: req.body.crypto_type,
					token_distribution_date: req.body.token_distribution_date,
					max_allocation_tierone: req.body.max_allocation_tierone,
					max_allocation_tiertwo: req.body.max_allocation_tiertwo,
					max_allocation_tierthree: req.body.max_allocation_tierthree,
					max_allocation_tierfour: req.body.max_allocation_tierfour,
					max_allocation_tierfive: req.body.max_allocation_tierfive,
					max_allocation_tiersix: req.body.max_allocation_tiersix,
					max_allocation_tierseven: req.body.max_allocation_tierseven,
					max_allocation_tiereight: req.body.max_allocation_tiereight,
					max_allocation_tiernine: req.body.max_allocation_tiernine,
					min_allocation_tierone: req.body.min_allocation_tierone,
					min_allocation_tiertwo: req.body.min_allocation_tiertwo,
					min_allocation_tierthree: req.body.min_allocation_tierthree,
					min_allocation_tierfour: req.body.min_allocation_tierfour,
					min_allocation_tierfive: req.body.min_allocation_tierfive,
					min_allocation_tiersix: req.body.min_allocation_tiersix,
					min_allocation_tierseven: req.body.min_allocation_tierseven,
					min_allocation_tiereight: req.body.min_allocation_tiereight,
					min_allocation_tiernine: req.body.min_allocation_tiernine,
					fblink: req.body.fblink,
					blockNumber : req.body.blockNumber
				},
			);
			if (updatedUpcPool) {
				return res
					.status(201)
					.json({ msg: "Upc pool is updated successfully!" });
			}
			res.json({
				msg: "Oops, there is some error! upc pool has not updated yet!",
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to search ico pool.
	poolSearch: async (req, res) => {
		try {
			var x = req.query.title.split("?")[0];
			const pool = await upPool
				.find({ title: { $regex: new RegExp("^" + x, "i") } })
				.limit(10);

			res.json({ pool });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	deleteIdoPool: async (req, res) => {
		try {
			const token_id = req.params.id;
			const IDO_Pool = await upPool.find({ _id: token_id });
			const IdoAddress = IDO_Pool[0].address.toLowerCase()
			//Deleting ico by id.
			const deleteIDO = await upPool.findOneAndRemove({ _id: token_id });
			if (deleteIDO) {
				//deleting all other data which is relevent to IDO
				const delete_claim = await claimFactory.deleteMany({ contract_address: IdoAddress });
				const delete_white_list_one = await whlist1.deleteMany({ id: token_id });
				const delete_white_list_two = await whlist2.deleteMany({ id: token_id });
				const delete_white_list_three = await whlist3.deleteMany({ id: token_id });
				return res.status(201).json({ msg: "IDO is deleted successfully!" });
			}
			res.json({ message: "Sorry, there is some problem, IDO is not deleted yet" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	idoCount: async (req, res) => {
		try {
			const count = await upPool.countDocuments();
			res.status(200).json({ "count": count });
		} catch (err) {
			return res.status(500).json(count);
		}
	}
};

module.exports = upcPoolCtrl;
