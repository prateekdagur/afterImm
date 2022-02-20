const router = require("express").Router();
const csvfile_ctrl = require("../Controller/csvfileCtrl");
//Route url to store addresses of csv in database according to tiers.
router.get("/csv_file/:id/:tier", csvfile_ctrl.csv_upload);
//Route url to get addresses according to tiers.
router.get("/csv_get/:data", csvfile_ctrl.csv_tier_get);
module.exports = router;