const mongoose = require("mongoose");

//Model for address of white list two.
const whitelist2Schema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
		},
		white_list2: {
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

//Exporting file and set collection name whitelist2.
module.exports = mongoose.model("whitelist2", whitelist2Schema);
