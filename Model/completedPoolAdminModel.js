const mongoose = require("mongoose");

//Model for creating ico.
const completedAdminSchema = mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true,
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
			trim: true,
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
		total_raised : {
			type : Number
		},
		allocation : {
			type : Number
		},
		token_address: {
			type: String
		},
		phase_one_id: {
			type: String,
		},
		phase_two_id: {
			type: String,
		},
		phase_three_id: {
			type: String
		},
		fblink : {
			type : String,
		},
		participants: { type: Number },
		min_swap_level: { type: String },
		symbol: { type: String, required: false },
		decimal: { type: Number },
		total_supply: { type: Number },
		description: { type: String, trim: true },
		token_distribution_date : {
			type : String,
		},
		crypto_type: {
			type: String
		}
	},
	{
		timestamps: true,
	},
);

//Exporting file and set collection name upPool.
module.exports = mongoose.model("CompletedAdmin", completedAdminSchema);
