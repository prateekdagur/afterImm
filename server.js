require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
//const fs = require("fs");
const fileUpload = require("express-fileupload");

//test
//App config
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(fileUpload());
app.use(
	cors({
		origin: ["https://launchpad.seedify.fund/", "http://localhost:3000/"],
	}),
);

app.use(
	"./frontend/build/exportcsv/",
	express.static(__dirname + "./frontend/build/exportcsv/"),
);
app.use("./temp/", express.static(__dirname + "./temp/"));

//routes
app.use("/api", require("./Routes/upcPoolRoutes"));
app.use("/api", require("./Routes/userRoutes"));
app.use("/api", require("./Routes/projectRoutes"));
app.use("/api", require("./Routes/icoPoolRoutes"));
app.use("/api", require("./Routes/deployIcoPoolRoutes"));
app.use("/api", require("./Routes/whitelistRoutes"));
app.use("/api", require("./Routes/blockchain_nodeRoutes"));
app.use("/api", require("./Routes/claimRoutes"));
app.use("/api", require("./Routes/csvRoutes"));
app.use("/api", require("./Routes/csvfileRoutes"));
app.use("/api", require("./Routes/completedAdminRoutes"));
app.use("/api", require("./Routes/userAllocationRoutes"));
app.use("/api", require("./Routes/upload_block_bulkRoutes"));
app.use("/api", require("./Routes/deploRoutes"));
app.use("/api", require("./Routes/eventRoutes"));

mongoose.connect(
	process.env.CONNECTION_URL,
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	},
	(err) => {
		if (err) throw err;
		console.log("connected to mongodb");
	},
);
//listener
if (process.env.NODE_ENV === "production") {
	app.use(express.static("frontend/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
	});
}

//listener
const port = process.env.PORT;
app.listen(port, () => {
	console.log(`listening port localhost : ${port}`);
});
