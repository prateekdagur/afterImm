const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const Cryptr = require('cryptr')
const cryptr = new Cryptr('mySecretKey')

const userController = {
	//Function to register the user.
	register: async (req, res) => {
		try {
		    const { name, email, password } = req.body;
			const user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ msg: "this user is already exists." });
			}
			if (req.body.password.length < 6) {
				return res
					.status(400)
					.json({ msg: "password is less than 6 character" });
			}
			//Saving user.
			const newUser = new User({
				name,
				email,
				password
			
			});
			await newUser.save();
			//Creating access token.
			const accesstoken = createAccessToken({ id: newUser._id });
			//creating refresh token.
			const refreshtoken = createRefreshToken({ id: newUser._id });

			res.cookie("refreshtoken", refreshtoken, {
				httpOnly: true,
				path: "/api/refresh_token",
				maxAge: 7 * 24 * 60 * 60 * 1000,
				secure : true,
				Domain : ".seedify.fund"
			});

			res.json({
				msg: "Register Success",
				accesstoken,
				role: user.role,
				user: {
					...newUser._doc,
					password: " ",
				},
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	//Function to login user.
	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			// const encryptedPassword = cryptr.encrypt(password)
			//  console.log(encryptedPassword, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
            
			//Finding user's email.
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ msg: "user is not exist" });
			}

			const decryptedString = cryptr.decrypt(user.password);

			if (decryptedString != password) {
				return res.status(400).json({ msg: "Incorrect password" });
			}
			//Creating access token.
			const accesstoken = createAccessToken({ id: user._id });
			//creating refresh token.
			const refreshtoken = createRefreshToken({ id: user._id });

			res.cookie("refreshtoken", refreshtoken, {
				httpOnly: true,
				path: "/api/refresh_token",
				maxAge: 7 * 24 * 60 * 60 * 1000,
				secure : true,
				Domain : ".seedify.fund"
			});

			res.json({
				msg: "Login Success",
				accesstoken,
				role: user.role,
				user: {
					...user._doc,
					password: " ",
				},
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to logout user.
	logout: async (req, res) => {
		try {
			res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
			return res.json({ msg: "logged out" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	//Function to check the refresh token.
	refreshToken: (req, res) => {
		try {
			const rf_token = req.cookies.refreshtoken;
		
			if (!rf_token) {
				return res.status(400).json({ msg: "please login first" });
			}
			//Verifying jwt token 
			jwt.verify(
				rf_token,
				process.env.REFRESH_TOKEN_SECRET,
				async (err, result) => {
					if (err) {
						return res.status(400).json({ msg: "please login first" });
					}
					if (!result) {
						return res.status(400).json({ msg: "user does not exist" });
					}
					const user = await User.findById(result.id);
					const access_token = createAccessToken({ id: user.id });
					res.json({
						access_token,
						role: user.role,
						user: {
							...user._doc,
							password: " ",
						},
					});
				},
			);
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	//Function to get the user
	getUser: async (req, res) => {
		try {
			const user = await User.findById(req.user.id);
			if (!user) {
				return res.status(400).json({ msg: "user does not exist" });
			}
			res.json(user);
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

//Function to to create access token.
const createAccessToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

//Function to to create refresh token.
const createRefreshToken = (user) => {
	return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userController;
