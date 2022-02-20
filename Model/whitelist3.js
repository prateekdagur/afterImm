const mongoose = require("mongoose");
//Model for address of white list three.
const whitelist3Schema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
		},
		white_list3: {
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

//Exporting file and set collection name whitelist3.
module.exports = mongoose.model("whitelist3", whitelist3Schema);
