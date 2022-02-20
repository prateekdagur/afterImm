const router = require("express").Router();
const allocation_Ctrl = require("../Controller/userAllocationCtrl");
//Route url to generate csv file of addresses and download in browser.
router.get("/get_dropdown", allocation_Ctrl.get_dropdown);
router.get("/get_upcomming", allocation_Ctrl.get_upcommingpool);
router.post("/allocation", allocation_Ctrl.createAllocation);
router.get("/dropdowncontract", allocation_Ctrl.dropdown_updatecontract);
router.post("/lottery", allocation_Ctrl.addToLottery);
router.get("/epxportlottery/:id", allocation_Ctrl.exportLottery);




module.exports = router;

