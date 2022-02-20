const router = require("express").Router();
const csv_ctrl = require("../Controller/csvCtrl");
//Route url to generate csv file of addresses and download in browser.
router.get("/generate_csv/:contract_address", csv_ctrl.distributionCsv);
module.exports = router;
