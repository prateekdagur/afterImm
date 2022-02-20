const mongoose = require("mongoose");

//Model for address of white list one.
const whitelist1Schema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
		},

		white_list1: {
			type: String,
			required: true,
		},
		addr_status: {
			type: String,
			default: "0",
		},
	},
	{
		timestamps: true,
	},
);
//Exporting file and set collection name whitelist1.
module.exports = mongoose.model("whitelist1", whitelist1Schema);
