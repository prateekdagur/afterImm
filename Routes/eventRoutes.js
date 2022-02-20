const auth = require('../middleware/auth')
const authAdmin = require('../middleware/admin')
const router = require("express").Router();
const fetchContractEvents = require("../Controller/events");
//Route url to to fetch contract events.
router.get("/eventFetch/:address", fetchContractEvents.nodeEvent);
router.get("/get_profile", fetchContractEvents.getProfile)
router.post("/createVestings", auth, authAdmin, fetchContractEvents.createVesting)
router.post("/addprofilecsv", auth, authAdmin, fetchContractEvents.addProfilecsv)
module.exports = router;
