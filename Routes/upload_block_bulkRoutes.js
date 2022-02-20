const auth = require('../middleware/auth')
const authAdmin = require('../middleware/admin')
const router = require("express").Router();
const fetchBlockchain = require("../Controller/upload_block_bulk");
//Route url to upload address white list one on blockchain.
router.get("/addwhitelistonebulk/:id", auth, authAdmin, fetchBlockchain.addWhitelist1);
//Route url to upload address white list three on blockchain.
router.get("/addwhitelisttwobulk/:id", auth, authAdmin, fetchBlockchain.addWhitelist2);
//Route url to upload address white list three on blockchain.
router.get("/addwhitelistthreebulk/:id", auth, authAdmin, fetchBlockchain.addWhitelist3);
//Route url to upload address white list four on blockchain.
router.get("/addwhitelistfourbulk/:id", auth, authAdmin, fetchBlockchain.addWhitelist4);
//Route url to upload address white list five on blockchain.
router.get("/addwhitelistfivebulk/:id", auth, authAdmin, fetchBlockchain.addWhitelist5);
//Route url to upload address white list six on blockchain.
router.get("/addwhitelistsixbulk/:id", auth, authAdmin, fetchBlockchain.addWhitelist6);
//Route url to upload address white list seven on blockchain.
router.get("/addwhitelistsevenbulk/:id", auth, authAdmin, fetchBlockchain.addWhitelist7);
//Route url to upload address white list eight on blockchain.
router.get("/addwhitelisteightbulk/:id", auth, authAdmin, fetchBlockchain.addWhitelist8);
//Route url to upload address white list nine on blockchain.
router.get("/addwhitelistninebulk/:id", auth, authAdmin, fetchBlockchain.addWhitelist9);
router.get("/downloadAllocation/:id",auth, authAdmin, fetchBlockchain.downloadAllocation);
router.post("/updatetiers",auth, authAdmin, fetchBlockchain.updateTiers);
router.get("/contract_detail/:id",auth, authAdmin, fetchBlockchain.contractDetails);
router.post("/updatesaletime",auth, authAdmin, fetchBlockchain.updateSaleStart);
router.post("/updatesaleendtime",auth, authAdmin, fetchBlockchain.updateSaleEnd);
router.post("/updatesalepaused",auth, authAdmin, fetchBlockchain.updateSalePaused);
router.post("/updatesaleunpaused",auth, authAdmin, fetchBlockchain.updateSaleUnPaused)
router.post("/updatemaxcap",auth, authAdmin, fetchBlockchain.update_MaxCap)

router.get("/getconfig", fetchBlockchain.getConfig);
router.post("/updateconfig",auth, authAdmin, fetchBlockchain.updateConfig);
module.exports = router;
