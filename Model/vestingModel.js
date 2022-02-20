const mongoose = require("mongoose");

const vestingSchema = mongoose.Schema(
	{
		contract_addr: {
			type: String,
		},
		vetsing_date: {
			type: String,
		},
		pool_type: {
			type: String,
		},
		vesting_percentage: {
			type: String,
		},
		amount: {
			type: String,
		},
		return_of_investment: {
			type: String,
		},
		token_symbol: {
			type: String,
		},
		logo: {
			type: String,
			default : ""
		},
		title: {
			type: String,
			default : ""
		},
		phase: {
			type: String,
		},


	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("vesting", vestingSchema)