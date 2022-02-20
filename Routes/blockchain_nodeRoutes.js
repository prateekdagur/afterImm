const auth = require('../middleware/auth')
const authAdmin = require('../middleware/admin')
const router = require("express").Router();
const fetchBlockchain = require("../Controller/blockchain_node_connection");
//Route url to upload address white list one on blockchain.
router.get("/addwhitelistone/:id", auth, authAdmin, fetchBlockchain.addWhitelist1);
//Route url to upload address white list three on blockchain.
router.get("/addwhitelisttwo/:id", auth, authAdmin, fetchBlockchain.addWhitelist2);
//Route url to upload address white list three on blockchain.
router.get("/addwhitelistthree/:id", auth, authAdmin, fetchBlockchain.addWhitelist3);
//Route url to upload address white list four on blockchain.
router.get("/addwhitelistfour/:id", auth, authAdmin, fetchBlockchain.addWhitelist4);
//Route url to upload address white list five on blockchain.
router.get("/addwhitelistfive/:id", auth, authAdmin, fetchBlockchain.addWhitelist5);
//Route url to upload address white list six on blockchain.
router.get("/addwhitelistsix/:id", auth, authAdmin, fetchBlockchain.addWhitelist6);
//Route url to upload address white list seven on blockchain.
router.get("/addwhitelistseven/:id", auth, authAdmin, fetchBlockchain.addWhitelist7);
//Route url to upload address white list eight on blockchain.
router.get("/addwhitelisteight/:id", auth, authAdmin, fetchBlockchain.addWhitelist8);
//Route url to upload address white list nine on blockchain.
router.get("/addwhitelistnine/:id", auth, authAdmin, fetchBlockchain.addWhitelist9);

module.exports = router;
