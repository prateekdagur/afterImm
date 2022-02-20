var fs = require('fs')
const aws = require("aws-sdk");
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/admin')
const router = require("express").Router();
const completedAdminPoolCtrl = require("../Controller/completedAdminCtrl");



//Route url to create ico pool.
router.post("/create_completed_Pool",  auth, authAdmin, completedAdminPoolCtrl.createCompletedPool);
//Route url to delete ico pool.
router.delete("/delete_completed_Pool/:id",  auth, authAdmin, completedAdminPoolCtrl.deleteCompletedAdminPool);
//get completed
router.get("/get_completedAdminPool", completedAdminPoolCtrl.getCompletedPool)
//Route url to read specfic ico pool by its id.
router.get("/getCompletedAdmin/:id", completedAdminPoolCtrl.getCompletedAdminPoolbyId);
//Route url to update ico pool.
router.put("/update_completed_admin_pool", auth, authAdmin, completedAdminPoolCtrl.updatedCompletedPool);
router.get("/get_completedAdminPoolPagination", completedAdminPoolCtrl.getCompletedAdminPool)



router.post("/uploadlogocompletedpool",  auth, authAdmin, async (req, res) => {
	try {
		var timestamp = Date.now();
		var imgname = timestamp + req.files.file.name;
		req.files.file.name = imgname;
		const file = req.files.file
		file.mv("./temp/" + imgname)

		const fileName = `./temp/${imgname}`;
		aws.config.setPromisesDependency();
		aws.config.update({
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			Region: 'ap-southeast-1',
		});

		const removeTmp = (path) => {
			fs.unlink(path, err=> {
				if(err) throw err
			})
		}

		var s3 = new aws.S3();

		const readStream = fs.createReadStream(fileName)
		var params = {
			Bucket: 'idologo',
			Key: imgname,
			Body: readStream,
			ACL: 'public-read'
		};
		s3.upload(params, function (s3Err, data) {
			if (s3Err) throw s3Err
			removeTmp(`./temp/${imgname}`)
			res.json({ url: `${data.Location}` })
		});

	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
});

router.post("/updatelogocompletedpool",  auth, authAdmin, async (req, res) => {
	var id = req.body.id;

	if (req.body.imgname == "x") {
		var timestamp = Date.now();
		var imgname = timestamp + req.files.file.name;
		req.files.file.name = imgname;
		const file = req.files.file
		file.mv("./temp/" + imgname)

		const fileName = `./temp/${imgname}`;
		aws.config.setPromisesDependency();
		aws.config.update({
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			Region: 'ap-southeast-1',
		});

		const removeTmp = (path) => {
			fs.unlink(path, err=> {
				if(err) throw err
			})
		}
		var s3 = new aws.S3();

		const readStream = fs.createReadStream(fileName)
		var params = {
			Bucket: 'idologo',
			Key: imgname,
			Body: readStream,
			ACL: 'public-read'
		};
		
		s3.upload(params, function (s3Err, data) {
			if (s3Err) throw s3Err
			removeTmp(`./temp/${imgname}`)
			res.json({ url: `${data.Location}` })
		});
	}
	

});
module.exports = router;
