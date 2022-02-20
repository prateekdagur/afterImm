const router = require("express").Router();
const projectCtrl = require("../Controller/projectCtrl");

//Route url to create project.
router.post("/create_project", projectCtrl.createProject);
//Route url to create project.
router.get("/checkwhitelist", projectCtrl.getProjectRes);

module.exports = router;
