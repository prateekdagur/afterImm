const mongoose = require("mongoose");
//Model for address of white list five.
const whitelist5Schema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
		},
		white_list5: {
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

//Exporting file and set collection name whitelist5.
module.exports = mongoose.model("whitelist5", whitelist5Schema);