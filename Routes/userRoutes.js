const router = require("express").Router();
const userController = require("../Controller/userController");

//Route url to register user.
router.post("/register", userController.register);
//Route url to login user.
router.post("/login", userController.login);
//Route url to logout user.
router.post("/logout", userController.logout);
//Route url to refresh the token.
router.post("/refresh_token", userController.refreshToken);
//Route url to get user.
router.get("/infor", userController.getUser);

module.exports = router;
