const mongoose = require("mongoose");
//Model for address of white list seven.
const whitelist7Schema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
		},
		white_list7: {
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

//Exporting file and set collection name whitelist7.
module.exports = mongoose.model("whitelist7", whitelist7Schema);