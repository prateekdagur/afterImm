const mongoose = require("mongoose");
//Model for address of white list nine.
const whitelist9Schema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
		},
		white_list9: {
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

//Exporting file and set collection name whitelist9.
module.exports = mongoose.model("whitelist9", whitelist9Schema);