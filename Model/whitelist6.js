const mongoose = require("mongoose");
//Model for address of white list six.
const whitelist6Schema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
		},
		white_list6: {
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

//Exporting file and set collection name whitelist6.
module.exports = mongoose.model("whitelist6", whitelist6Schema);