const mongoose = require("mongoose");

const userAllocationSchema = new mongoose.Schema(
	{
		wallet_address: {
			type: String,
		},
		igo_id: {
			type: String,
        },
        user_allocation: {
            type: Number,
        },
		igo_type: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("user_allocation", userAllocationSchema);
