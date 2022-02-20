const claimFactory = require("../Model/claimModel");
const upcModel = require("../Model/upcPoolModel");
var fileSystem = require("fs");
var fastcsv = require("fast-csv");
const claimFactoryCtrl = {
    //Function to create csv file and download it.
    distributionCsv: async (req, res) => {
        try {
            //For specific contract address.
            const upcgetter = await upcModel.findOne({
                address: req.params.contract_address,
            });
            //swap amount
            const swap_amount_value = upcgetter.swap_amount;

            //Grouping distributed token for same addresses.
            const token_sum = await claimFactory.aggregate([
                { $match: { contract_address: upcgetter.address.toLowerCase(), claim_status: 0 } },
                {
                    $group: {
                        _id: { from_address: "$from_address", contract_address: upcgetter.address, status: "0" },
                        total: {
                            $sum: "$value"
                        }

                    }
                }
            ])
            var data = [];
            if (token_sum.length > 0) {
                for (i = 0; i < token_sum.length; i++) {
                    let contractAddress = token_sum[i]._id.contract_address
                    let user_Address = token_sum[i]._id.from_address
                    let invested_value = token_sum[i].total
                    let Distributed_tokens_value = token_sum[i].total * swap_amount_value;
                    let status = token_sum[i]._id.status
                    var x = { "Contract Address": contractAddress, "User Address": user_Address, "Invested Value in BNB": invested_value, "Allocation tokens value": Distributed_tokens_value, "Status": status }
                    data.push(x)
                }
            }
            var ws = fileSystem.createWriteStream(`./frontend/build/exportcsv/${upcgetter.title}-allocation.csv`);
            fastcsv
                .write(data, { headers: true })
                .on("finish", function () {
                })
                .pipe(ws);
            res.status(500).json('csv-download');
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}
module.exports = claimFactoryCtrl;