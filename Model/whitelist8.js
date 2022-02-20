const mongoose = require("mongoose");
//Model for address of white list eight.
const whitelist8Schema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
		},
		white_list8: {
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

//Exporting file and set collection name whitelist8.
module.exports = mongoose.model("whitelist8", whitelist8Schema);