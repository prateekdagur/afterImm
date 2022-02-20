const mongoose = require("mongoose");

const configSchema = new mongoose.Schema(
	{
		gas : {
			type: Number,
		},
		gasPrice: {
			type: Number,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("config", configSchema);
