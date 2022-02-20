const mongoose = require("mongoose");

//Model for claim Details.
const claimSchema = mongoose.Schema(
	{
		contract_address: {
			type: String,
			required: true,
		},
		from_address: {
			type: String,
			required: true,
		},
		value: {
			type: Number,
			required: true,
		},
		claim_status: {
			type: Number,
			default: "0",
		},
		block_number: {
			type : Number,
			required : true
		}
	},
	{
		timestamps: true,
	},
);
//Exporting file and set co llection name claim.
module.exports = mongoose.model("claim", claimSchema);
