const completedAdminModel = require("../Model/completedPoolAdminModel");

moment = require("moment");


const completedAdminPoolCtrl = {
    //Function to create ico pool.
    createCompletedPool: async (req, res) => {
        try {
            const {
                title,
                price,
                up_pool_raise,
                phase_one_id,
                phase_two_id,
                phase_three_id,
                content,
                images,
                min_allocation,
                max_allocation,
                min_swap_level,
                up_pool_access,
                participants,
                symbol,
                token_address,
                decimal,
                total_supply,
                description,
                network_type,
                crypto_type,
                twitter_link,
                git_link,
                token_distribution_date,
                telegram_link,
                reddit_link,
                medium_link,
                browser_web_link,
                youtube,
                instagram,
                discord,
                white_paper,
                total_raised,
                allocation,
                fblink

            } = req.body;

            //Check for unique address
            const newCompletedPool = new completedAdminModel({
                title,
                price,
                up_pool_raise,
                phase_one_id,
                phase_two_id,
                phase_three_id,
                content,
                images,
                min_allocation,
                max_allocation,
                min_swap_level,
                up_pool_access,
                participants,
                token_address,
                symbol,
                decimal,
                total_supply,
                description,
                network_type,
                crypto_type,
                twitter_link,
                git_link,
                token_distribution_date,
                telegram_link,
                reddit_link,
                medium_link,
                browser_web_link,
                youtube,
                instagram,
                discord,
                white_paper,
                total_raised,
                allocation,
                fblink
            });
            //Saving ico pool in database.
            await newCompletedPool.save();
            res.json({
                id: newCompletedPool._id,
                msg: "pool is created",
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getCompletedPool: async (req, res) => {
        try {
            //pagination
            const completedAdmin_Pool = await completedAdminModel.find().sort({ createdAt: -1 });
            const totalCompleted = completedAdmin_Pool.length;
            var pageSize = parseInt(req.query.page) || 10;
            
            const totalCompletedPage = Math.ceil(totalCompleted / pageSize);
            const paginatedCompletedAdmin_pool = await completedAdminModel
                .find()
                .sort({ createdAt: -1 })
                .limit(pageSize);

            res.json({
                paginatedCompletedAdmin_pool: paginatedCompletedAdmin_pool,
                totalCompletedPage: totalCompletedPage,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getCompletedAdminPool: async (req, res) => {
		try {
			//Reading ico
			const completed = await completedAdminModel.find().sort({ createdAt: -1 });
			//pagination.
			const page = parseInt(req.query.page) || 1;
			const pageSize = 10;
			const skip = (page - 1) * pageSize;

			const totalcompleted = completed.length;
			const totalcompletedPage = Math.ceil(totalcompleted / pageSize);
			const paginatedCompleted = await completedAdminModel
				.find()
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(pageSize);

			
			res.json({
				totalcompletedPage: totalcompletedPage,
				paginatedcompleted_pool: paginatedCompleted
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
    //Function to read specific ico by its id.
    getCompletedAdminPoolbyId: async (req, res) => {
        try {
            const Completedpool = await completedAdminModel.findById({ _id: req.params.id });

            res.json({
                Completedpool: Completedpool
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //Function to update specific ico by its id.
    updatedCompletedPool: async (req, res) => {
        try {
            const completed_pool_id = req.body.id;
            //Updating values
            const updatedcompletedPool = await completedAdminModel.updateOne(
                { _id: completed_pool_id },
                {
                    title: req.body.title,
                    price: req.body.price,
                    up_pool_raise: req.body.up_pool_raise,
                    idophase: req.body.idophase,
                    content: req.body.content,
                    images: req.body.images,
                    token_address: req.body.token_address,
                    min_allocation: req.body.min_allocation,
                    max_allocation: req.body.max_allocation,
                    min_swap_level: req.body.min_swap_level,
                    up_pool_access: req.body.up_pool_access,
                    participants: req.body.participants,
                    symbol: req.body.symbol,
                    decimal: req.body.decimal,
                    total_supply: req.body.total_supply,
                    description: req.body.description,
                    network_type: req.body.network_type,
                    crypto_type: req.body.crypto_type,
                    twitter_link: req.body.twitter_link,
                    git_link: req.body.git_link,
                    token_distribution_date: req.body.token_distribution_date,
                    telegram_link: req.body.telegram_link,
                    reddit_link: req.body.reddit_link,
                    medium_link: req.body.medium_link,
                    browser_web_link: req.body.browser_web_link,
                    youtube: req.body.youtube,
                    instagram: req.body.instagram,
                    discord: req.body.discord,
                    white_paper: req.body.white_paper,
                    total_raised : req.body.total_raised,
                    allocation : req.body.allocation,
                    fblink : req.body.fblink,
                    phase_one_id : req.body.phase_one_id,
                    phase_two_id : req.body.phase_two_id,
                    phase_three_id : req.body.phase_three_id,
                },
            );
            if (updatedcompletedPool) {
                return res
                    .status(201)
                    .json({ msg: "completed pool is updated successfully!" });
            }
            res.json({
                msg: "Oops, there is some error! upc pool has not updated yet!",
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    deleteCompletedAdminPool: async (req, res) => {
        try {
            const token_id = req.params.id;
            //Deleting ico by id.
            const deleteIDO = await completedAdminModel.findOneAndRemove({ _id: token_id });
            if (deleteIDO) {
                return res.status(201).json({ msg: "IDO is deleted successfully!" });
            }
            res.json({ message: "Sorry, there is some problem, IDO is not deleted yet" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
   
};

module.exports = completedAdminPoolCtrl;
