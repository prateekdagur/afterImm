const auth = require('../middleware/auth')
const authAdmin = require('../middleware/admin')
const router = require("express").Router();
const deploy1 = require("../Controller/deploy");
//Route url to deploy contract.
router.post("/deploy",auth, authAdmin, deploy1.deploy);



module.exports = router;
