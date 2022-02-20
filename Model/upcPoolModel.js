
const mongoose = require("mongoose");

//Model for creating ico.
const upcPoolSchema = mongoose.Schema(
	{
		pool_type: {
			type: String,
			trim: true,
			required: true,
		},
		distribution_type : {
			type: String,
		},
		contract_type: {
			type: String,
		},
		idophase: {
			type: String,
		},
		network_type: {
			type: String,
			trim: true,
		},
		title: {
			type: String,
			trim: true,
			required: true,
		},
		Owner: {
			type: String,
			trim: true,
		},
		time_duration: {
			type: Number,
		},
		price: {
			type: Number,
		},
		up_pool_raise: {
			type: Number,
			trim: true,
		},
		content: {
			type: String,
			trim : true,
		},
		images: {
			type: Object,
		},

		min_allocation: {
			type: String,
		},
		max_allocation: {
			type: String,
		},
		max_allocation_tierone: {
			type: Number,
		},
		max_allocation_tiertwo: {
			type: Number,
		},
		max_allocation_tierthree: {
			type: Number,
		},
		max_allocation_tierfour: {
			type: Number,
		},
		max_allocation_tierfive: {
			type: Number,
		},
		max_allocation_tiersix: {
			type: Number,
		},
		max_allocation_tierseven: {
			type: Number,
		},
		max_allocation_tiereight: {
			type: Number,
		},
		max_allocation_tiernine: {
			type: Number,
		},
		min_allocation_tierone: {
			type: Number,
		},
		min_allocation_tiertwo: {
			type: Number,
		},
		min_allocation_tierthree: {
			type: Number,
		},
		min_allocation_tierfour: {
			type: Number,
		},
		min_allocation_tierfive: {
			type: Number,
		},
		min_allocation_tiersix: {
			type: Number,
		},
		min_allocation_tierseven: {
			type: Number,
		},
		min_allocation_tiereight: {
			type: Number,
		},
		min_allocation_tiernine: {
			type: Number,
		},
		token_address: {
			type: String,
		},
		abi_name: {
			type: String,
		},
		up_pool_access: {
			type: String,
		},
		white_paper: {
			type: String,
		},
		twitter_link: {
			type: String,
		},
		git_link: {
			type: String,
		},
		telegram_link: {
			type: String,
		},
		reddit_link: {
			type: String,
		},
		medium_link: {
			type: String,
		},
		youtube: {
			type: String,
		},
		instagram: {
			type: String,
		},
		discord: {
			type: String,
		},
		browser_web_link: {
			type: String,
		},
		fblink : {
			type : String,
		},
		participants: { type: Number },
		swap_amount: { type: Number },
		closes_in: { type: String, trim: true, default: "Ended" },
		min_swap_level: { type: String },

		symbol: { type: String, required: false },
		decimal: { type: Number},
		address: { type: String, unique : true },
		total_supply: { type: Number },

		description: { type: String, trim : true },
		
		start_date: {
			type: String,
		},
		end_date: {
			type: String,
		},
		distribute_token : {
			type : Number,
			default: 0
		},
		token_distribution_date : {
			type : String,
		},
		crypto_type: {
			type: String
		},
		alloca_tion : {
			type: Number,
		},
		tier : {
			type: String,
		},
		blockNumber: {
			type: Number,
		},
		
		
	},
	{
		timestamps: true,
	},
);

//Exporting file and set collection name upPool.
module.exports = mongoose.model("upcPool", upcPoolSchema);
