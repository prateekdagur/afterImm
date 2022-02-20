const mongoose = require("mongoose");
//Model for address of white list four.
const whitelist4Schema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
		},
		white_list4: {
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

//Exporting file and set collection name whitelist4.
module.exports = mongoose.model("whitelist4", whitelist4Schema);