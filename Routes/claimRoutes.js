const router = require("express").Router();
const claim_ctrl = require("../Controller/claimCtrl");
//Route url to prepare the claim and store in database.
router.get("/getData/:address", claim_ctrl.storeClaim);
//Route url to distribute the token to respective users.
router.get("/distribute/:contract_address", claim_ctrl.sendClaimToken);
//Route url to read claim token.
router.get("/gettoken", claim_ctrl.getClaimToken);
module.exports = router;
