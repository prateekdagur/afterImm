const auth = require('../middleware/auth')
const authAdmin = require('../middleware/admin')
const router = require("express").Router();
const whitelistCtrl = require("../Controller/whitelistCtrl");

//Route url to create whitelist one.
router.post("/createwhitelist1", auth, authAdmin, whitelistCtrl.createWhitelist1);
//Route url to create whitelist two.
router.post("/createwhitelist2", auth, authAdmin, whitelistCtrl.createWhitelist2);
//Route url to create whitelist three.
router.post("/createwhitelist3", auth, authAdmin, whitelistCtrl.createWhitelist3);
//Route url to create whitelist four.
router.post("/createwhitelist4", auth, authAdmin, whitelistCtrl.createWhitelist4);
//Route url to create whitelist five.
router.post("/createwhitelist5", auth, authAdmin, whitelistCtrl.createWhitelist5);
//Route url to create whitelist six.
router.post("/createwhitelist6", auth, authAdmin, whitelistCtrl.createWhitelist6);
//Route url to create whitelist seven.
router.post("/createwhitelist7", auth, authAdmin, whitelistCtrl.createWhitelist7);
//Route url to create whitelist eight.
router.post("/createwhitelist8", auth, authAdmin, whitelistCtrl.createWhitelist8);
//Route url to create whitelist nine.
router.post("/createwhitelist9", auth, authAdmin, whitelistCtrl.createWhitelist9);

//Route url to read whitelist one.
router.get("/getwhitelistone/:param", whitelistCtrl.getwhitelistonebyId);
//Route url to read whitelist two.
router.get("/getwhitelisttwo/:param", whitelistCtrl.getwhitelisttwobyId);
//Route url to read whitelist three.
router.get("/getwhitelistthree/:param", whitelistCtrl.getwhitelistthreebyId);
//Route url to read whitelist four.
router.get("/getwhitelistfour/:param", whitelistCtrl.getwhitelistfourbyId);
//Route url to read whitelist five.
router.get("/getwhitelistfive/:param", whitelistCtrl.getwhitelistfivebyId);
//Route url to read whitelist six.
router.get("/getwhitelistsix/:param", whitelistCtrl.getwhitelistsixbyId);
//Route url to read whitelist seven.
router.get("/getwhitelistseven/:param", whitelistCtrl.getwhitelistsevenbyId);
//Route url to read whitelist eight.
router.get("/getwhitelisteight/:param", whitelistCtrl.getwhitelisteightbyId);
//Route url to read whitelist nine.
router.get("/getwhitelistnine/:param", whitelistCtrl.getwhitelistninebyId);


//Route url to add csv in white list one.
router.get("/addcsvtowhitelistone/:id", whitelistCtrl.addcsvinwhitelistone)
//Route url to add csv in white list two.
router.get("/addcsvtowhitelisttwo/:id", whitelistCtrl.addcsvinwhitelisttwo)
//Route url to add csv in white list three.
router.get("/addcsvtowhitelistthree/:id", whitelistCtrl.addcsvinwhitelistthree)
//Route url to add csv in white list four.
router.get("/addcsvtowhitelistfour/:id", whitelistCtrl.addcsvinwhitelistfour)
//Route url to add csv in white list five.
router.get("/addcsvtowhitelistfive/:id", whitelistCtrl.addcsvinwhitelistfive)
//Route url to add csv in white list six.
router.get("/addcsvtowhitelistsix/:id", whitelistCtrl.addcsvinwhitelistsix)
//Route url to add csv in white list seven.
router.get("/addcsvtowhitelistseven/:id", whitelistCtrl.addcsvinwhitelistseven)
//Route url to add csv in white list eight.
router.get("/addcsvtowhitelisteight/:id", whitelistCtrl.addcsvinwhitelisteight)
//Route url to add csv in white list nine.
router.get("/addcsvtowhitelistnine/:id", whitelistCtrl.addcsvinwhitelistnine)

//add csv data in whitelist from admin side
//Route url to add csv in white list one.
router.post("/addcsvfiletowhitelistone", auth, authAdmin, whitelistCtrl.addcsvfileinwhitelistone)
//Route url to add csv in white list two.
router.post("/addcsvfiletowhitelisttwo", auth, authAdmin, whitelistCtrl.addcsvfileinwhitelisttwo)
//Route url to add csv in white list three.
router.post("/addcsvfiletowhitelistthree", auth, authAdmin, whitelistCtrl.addcsvfileinwhitelistthree)
//Route url to add csv in white list four.
router.post("/addcsvfiletowhitelistfour", auth, authAdmin, whitelistCtrl.addcsvfileinwhitelistfour)
//Route url to add csv in white list five.
router.post("/addcsvfiletowhitelistfive", auth, authAdmin, whitelistCtrl.addcsvfileinwhitelistfive)
//Route url to add csv in white list six.
router.post("/addcsvfiletowhitelistsix", auth, authAdmin, whitelistCtrl.addcsvfileinwhitelistsix)
//Route url to add csv in white list seven.
router.post("/addcsvfiletowhitelistseven", auth, authAdmin, whitelistCtrl.addcsvfileinwhitelistseven)
//Route url to add csv in white list eight.
router.post("/addcsvfiletowhitelisteight", auth, authAdmin, whitelistCtrl.addcsvfileinwhitelisteight)
//Route url to add csv in white list nine.
router.post("/addcsvfiletowhitelistnine", auth, authAdmin, whitelistCtrl.addcsvfileinwhitelistnine)

router.delete("/deletewhitelistone/:id", auth, authAdmin, whitelistCtrl.deletewhitelistone);
router.delete("/deletewhitelisttwo/:id", auth, authAdmin, whitelistCtrl.deletewhitelisttwo);
router.delete("/deletewhitelistthree/:id", auth, authAdmin, auth, authAdmin, whitelistCtrl.deletewhitelistthree);
router.delete("/deletewhitelistfour/:id", auth, authAdmin, whitelistCtrl.deletewhitelistfour);
router.delete("/deletewhitelistfive/:id", auth, authAdmin,whitelistCtrl.deletewhitelistfive);
router.delete("/deletewhitelistsix/:id", auth, authAdmin, whitelistCtrl.deletewhitelistsix);
router.delete("/deletewhitelistseven/:id", auth, authAdmin, auth, authAdmin, whitelistCtrl.deletewhitelistseven);
router.delete("/deletewhitelisteight/:id", auth, authAdmin, whitelistCtrl.deletewhitelisteight);
router.delete("/deletewhitelistnine/:id", auth, authAdmin, whitelistCtrl.deletewhitelistnine);


router.get("/insert_csv1", whitelistCtrl.insertCsv1);
router.get("/insert_csv2", whitelistCtrl.insertCsv2);
router.get("/insert_csv3", whitelistCtrl.insertCsv3);
router.get("/insert_csv4", whitelistCtrl.insertCsv4);
router.get("/insert_csv5", whitelistCtrl.insertCsv5);
router.get("/insert_csv6", whitelistCtrl.insertCsv6);
router.get("/insert_csv7", whitelistCtrl.insertCsv7);
router.get("/insert_csv8", whitelistCtrl.insertCsv8);
router.get("/insert_csv9", whitelistCtrl.insertCsv9);


//export file
module.exports = router;
