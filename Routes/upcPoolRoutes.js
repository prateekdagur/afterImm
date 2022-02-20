var fs = require('fs')
const aws = require("aws-sdk");
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/admin')
const router = require("express").Router();
const upcPoolCtrl = require("../Controller/upcPoolCtrl");

//get pool count
router.get("/idocount", upcPoolCtrl.idoCount);
//Route url to create ico pool.
router.post("/create_upcPool",auth, authAdmin, upcPoolCtrl.createUpcPool);
//Route url to delete ico pool.
router.delete("/delete_upcPool/:id", auth, authAdmin, upcPoolCtrl.deleteIdoPool);
//Route url to read all ico pool.
router.get("/get_upcPool", upcPoolCtrl.getUpcPool);
//get completed
router.get("/get_completedPool", upcPoolCtrl.getCompletedPool)
//Route url to read specfic ico pool by its id.
router.get("/getPool/:id", upcPoolCtrl.getPoolbyId);
//Route url to read ico pool with pagination.
router.get("/getPool_pagignation", upcPoolCtrl.getPoolByPagignation);
//Route url to update ico pool.
router.put("/update_upcPool",auth, authAdmin, upcPoolCtrl.updateUpcPool);
//Route url to search ico pool.
router.get("/search", upcPoolCtrl.poolSearch);



//Route url to upload file.

router.post("/upload",auth, authAdmin, async (req, res) => {
	try {
		var timestamp = Date.now();
		
		if (req.body.abiName == 'abi') {
			var aabi = req.files.abi;
			var aabiname = timestamp + aabi.name
			aabi.mv("./abi/" + aabiname)
		}
		
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

router.post("/uploadtobucket",auth, authAdmin, async (req, res) => {
	var id = req.body.id;

	if (req.body.abiname == "x") {
		var aabi = req.files.abi;
		var aabiname = id + aabi.name;
		aabi.mv("./abi/" + aabiname)

	}

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
