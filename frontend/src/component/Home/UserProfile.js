import React, { useState, useEffect, memo } from "react";
import "./UserProfile.css"
import Header from "./Header"
import "./Home.css";
import verify from "../../images/union.svg"
import slna_ads from "../../images/pop-img.png"
// import ava_ads from "../../images/pop-img2.png"
// import eld_ads from "../../images/pop-img3.png"
// import crd_ads from "../../images/pop-img4.png"
import { toast } from "react-toastify";
import Modal from "@material-ui/core/Modal";
import axios from "axios"

import Footer from "./footer";
// import { ethers } from "ethers";
import { useSelector, useDispatch } from "react-redux";
import info from "../../images/info.png";
import { getprofile } from "../../redux/actions/icoAction";
// import CompletedProfile from "./CompletedProfile"
// import FeaturedProfile from "./FeaturedProfile"

// import link_icon from "../../images/icons8-link-48.png"
import stakingABI from "../stakingABI.json";
import { web3 } from "../../redux/actions/metamaskAction";
import liquidityABI from "../liquidity.json";
import { postDataAPI, getDataAPI } from "../../utils/API";



const UserProfile = () => {

	const [profile, setProfile] = useState('')
	const [checkSolana, setCheckSolana] = useState(true)

	const [cardanoId, setCardanoId] = useState('')
	const [avalancheId, setAvalancheId] = useState('')
	const [elrondId, setElrondId] = useState('')
	// const [sfund, setSfund] = useState('')
	// const [liquidity, setLiquidity] = useState('')
	const [page, setPage] = useState(2);
	const [walletAddressSolana, setWalletAddressSolana] = useState("");
	const [walletAddressCardano, setWalletAddressCardano] = useState("");
	const [walletAddressElrond, setWalletAddressElrond] = useState("");
	const [walletAddressAvalanche, setWalletAddressAvalanche] = useState("");
	// const [users, setUsers] = useState("");
	const [token, setToken] = useState("");
	const [checkUpdateSolana, setCheckUpdateSolana] = useState(false);
	const [error_wallet, setError_wallet] = useState(false);
	const [stakingBalance, setStakingBalance] = useState('')
	const [liquidityBalance, setliquidityBalance] = useState("");
	const [totalbalance, setTotalBalance] = useState("");
	const [igo_vesting, setIgo_vesting] = useState(true);
	const [lotteryOpen, setLotteryOpen] = useState(false);

	const { metamask, ico } = useSelector((state) => state);
	const dispatch = useDispatch();

	if (metamask.address) {
		var wallet = metamask.address;
	}
	useEffect(() => {
		if (metamask.address) {
			dispatch(getprofile([metamask.address, page]))
		}
	}, [dispatch, metamask.address, page])

	const getProfilePool = () => {
		var x = page + 2
		dispatch(getprofile([metamask.address, x]))
		setPage(x)
	}

	const StakingContract_7days = new web3.eth.Contract(
		stakingABI,
		'0xb667c499b88AC66899E54e27Ad830d423d9Fba69',
	);
	const StakingContract_14days = new web3.eth.Contract(
		stakingABI,
		'0x027fC3A49383D0E7Bd6b81ef6C7512aFD7d22a9e',
	);
	const StakingContract_30days = new web3.eth.Contract(
		stakingABI,
		'0x8900475BF7ed42eFcAcf9AE8CfC24Aa96098f776',
	);
	const StakingContract_60days = new web3.eth.Contract(
		stakingABI,
		'0x66b8c1f8DE0574e68366E8c4e47d0C8883A6Ad0b',
	);

	const StakingContract_90days = new web3.eth.Contract(
		stakingABI,
		'0x5745b7E077a76bE7Ba37208ff71d843347441576',
	);


	useEffect(() => {
		if (wallet) {
			async function editSolana() {
				const netWork = await axios.get(
					`https://snapshotapi.seedify.fund/api/v1/block/check/${wallet}`,
				);
				setProfile(netWork.data.data)
				// setSfund(netWork.data.data.data.snapshot)
				// setLiquidity(netWork.data.data.data.snapshot)				
				if (netWork.data.data.data.networks) {
					netWork.data.data.data.networks.forEach((m) => {
						if (m.networkId.networkName === "solana") {
							setWalletAddressSolana(m.walletAddress)
							setCheckSolana(false)
						}

					}
					)
				}

			}

			editSolana()
		}

	}, [wallet])



	useEffect(() => {

		if (wallet) {
			async function userBalance() {
				//stake Balance
				const stackedBalance7 = await StakingContract_7days.methods.userDeposits(wallet).call()
				const stackedBalance14 = await StakingContract_14days.methods.userDeposits(wallet).call()
				const stackedBalance30 = await StakingContract_30days.methods.userDeposits(wallet).call()
				const stackedBalance60 = await StakingContract_60days.methods.userDeposits(wallet).call()
				const stackedBalance90 = await StakingContract_90days.methods.userDeposits(wallet).call()
				var stackedBalance = (parseFloat(stackedBalance7[0]) + parseFloat(stackedBalance14[0]) + parseFloat(stackedBalance30[0]) + parseFloat(stackedBalance60[0]) + parseFloat(stackedBalance90[0])) / 10 ** 18;
				setStakingBalance(parseFloat(stackedBalance.toFixed(2)))
			
				//liquidity Balance
				const totalSupply_pancake = await axios.get(
					"https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=0x74fa517715c4ec65ef01d55ad5335f90dce7cc87&apikey=S5MX4JTHR55MSPYRN54BJYDUD3DCC1ZEHN",
				);

				const totalSupply_bakery = await axios.get(
					"https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=0x782f3f0d2b321D5aB7F15cd1665B95EC479Dcfa5&apikey=S5MX4JTHR55MSPYRN54BJYDUD3DCC1ZEHN",
				);
				const totalSupply_wei_pancake = parseFloat(
					totalSupply_pancake.data.result
				) / 10 ** 18;;
				const totalSupply_wei_bakery = parseFloat(
					totalSupply_bakery.data.result
				) / 10 ** 18;
				const PanCakeLpToken = new web3.eth.Contract(
					liquidityABI,
					"0x7439bCF0B97ecd7f3A11c35Cc2304F01Eaf04fC0",
				);
				const PanCakeLpToken_second = new web3.eth.Contract(
					liquidityABI,
					"0x1F10564BAD9367CfF4247A138eBbA9a9aaeb789E",
				);

				const BakeryLpToken = new web3.eth.Contract(
					liquidityABI,
					"0x1272B728B8964e75786c0f1772033719C0Fa5eAc",
				);
				const BakeryLpToken_second = new web3.eth.Contract(
					liquidityABI,
					"0x1544be2dC66eaE3E91d983c6D27c9CB1CDe74AcF",
				);

				const panCakeLpToken = await PanCakeLpToken.methods
					.userDeposits(wallet)
					.call();
				const panCakeLpToken_Second = await PanCakeLpToken_second.methods
					.userDeposits(wallet)
					.call();
				const panCakeSupply =
					parseFloat(web3.utils.fromWei(panCakeLpToken[0] + panCakeLpToken_Second[0], "ether")) / totalSupply_wei_pancake;
				const bakeryLpToken = await BakeryLpToken.methods
					.userDeposits(wallet)
					.call();
				const bakeryLpToken_Second = await BakeryLpToken_second.methods
					.userDeposits(wallet)
					.call();
				const bakerySupply =
					parseFloat(web3.utils.fromWei(bakeryLpToken[0] + bakeryLpToken_Second[0], "ether")) / totalSupply_wei_bakery;
				const tokenBalancePancakeswap = await axios.get(
					"https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x477bc8d23c634c154061869478bce96be6045d12&address=0x74fa517715c4ec65ef01d55ad5335f90dce7cc87&tag=latest&apikey=S5MX4JTHR55MSPYRN54BJYDUD3DCC1ZEHN",
				);
				const tokenBalanceBakery = await axios.get(
					"https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x477bc8d23c634c154061869478bce96be6045d12&address=0x782f3f0d2b321d5ab7f15cd1665b95ec479dcfa5&tag=latest&apikey=S5MX4JTHR55MSPYRN54BJYDUD3DCC1ZEHN",
				);

				var panCake_SFUND_balance = 0;
				if (tokenBalancePancakeswap.data.staus === "1") {
					panCake_SFUND_balance = panCakeSupply *
						parseFloat(
							tokenBalancePancakeswap.data.result
						) / 10 ** 18;
				}

				var bakery_SFUND_balance = 0;

				if (tokenBalanceBakery.data.staus === "1") {
					bakery_SFUND_balance = bakerySupply *
						parseFloat(
							tokenBalanceBakery.data.result
						) / 10 ** 18;
				}

				var liquidityBalance = panCake_SFUND_balance + bakery_SFUND_balance;

				setliquidityBalance(liquidityBalance.toFixed(3));


				//  total Balance
				const looseBalance = await axios.get(
					`https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x477bc8d23c634c154061869478bce96be6045d12&address=${wallet}&tag=latest&apikey=S5MX4JTHR55MSPYRN54BJYDUD3DCC1ZEHN`,
				);

				var loosebalance = 0;

				if (looseBalance.data.staus === "1") {
					loosebalance = parseFloat(
						web3.utils.fromWei(looseBalance.data.result, "ether"),
					);
				}

				var totalbalance = stackedBalance + liquidityBalance + loosebalance;
				setTotalBalance(totalbalance.toFixed(3))

			}
			userBalance();
		}
	}, [wallet, StakingContract_7days.methods, StakingContract_14days.methods, StakingContract_30days.methods, StakingContract_60days.methods]);


	const solanaEnable = () => {
		if (!checkSolana) {
			document.getElementById("copysolana").disabled = false;
			setCheckUpdateSolana(true)
		}

	}




	// var completed = 0;
	// if (ico.compleated_profile_pool && ico.compleated_profile_pool.length) {
	// 	completed = 1;
	// }

	// var featured = 0;
	// if (ico.featured_profile_pool && ico.featured_profile_pool.length) {
	// 	featured = 1;
	// }
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const cancelAddressSolana = () => {
		document.getElementById("copysolana").disabled = true;
		setCheckUpdateSolana(false)
	}
	const cancelAddressCardano = () => {
		setWalletAddressCardano("")
	}
	const cancelAddressAvalanche = () => {
		setWalletAddressAvalanche("")
	}
	const cancelAddressElrond = () => {
		setWalletAddressElrond("")
	}

	const addSolanaWallet = async () => {

		if (walletAddressSolana.length > 44 || walletAddressSolana.length < 32) {
			return toast.info("Your address is not valid", { position: toast.POSITION.TOP_CENTER });
		}
		if (walletAddressSolana === walletAddressSolana.toLocaleLowerCase()) {
			return toast.info("Your address is not valid", { position: toast.POSITION.TOP_CENTER });
		}
		if (!isNaN(walletAddressSolana)) {
			return toast.info("Your address is not valid", { position: toast.POSITION.TOP_CENTER });
		}
		if (walletAddressSolana) {
			const nonce = await axios.get(
				`https://snapshotapi.seedify.fund/api/v1/user/genrateNonce/${wallet}`,
			);
			// let connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
			// let slot = await connection.getAccountInfo(wallet);
			// console.log(slot, "sssssssssssssssssssssssss");
			// const web3 = new ethers.providers.Web3Provider(window.ethereum);
			// const signer = web3.getSigner();
			// const signature = await signer.signMessage(nonce.data.data.nonce);
			const signature = await web3.eth.personal.sign(nonce.data.data.nonce, wallet)
			const loginUser = await axios.post(
				`https://snapshotapi.seedify.fund/api/v1/user/login`,
				{ nonce: nonce.data.data.nonce, signature: signature },
			);
			setToken(loginUser.data.data.token);
			const netWork = await axios.get(
				`https://snapshotapi.seedify.fund/api/v1/network/list`,
				{
					headers: {
						Authorization: loginUser.data.data.token,
					},
				},
			);
			var solana_id = ""
			if (netWork) {
				netWork.data.data.forEach((m) => {
					if (walletAddressSolana) {
						if (m.networkName === "solana") {
							// setSolanaId(m.id)
							solana_id = m.id;
						}
					}
					if (walletAddressCardano) {
						if (m.networkName === "cardano") {
							setCardanoId(m.id)

						}
					}
					if (walletAddressElrond) {
						if (m.networkName === "elrond") {
							setElrondId(m.id)

						}
					}
					if (walletAddressAvalanche) {
						if (m.networkName === "avalanche") {
							setAvalancheId(m.id)
						}
					}

				}
				)
			}


			if (solana_id) {

				const res = await axios.post(
					`https://snapshotapi.seedify.fund/api/v1/user/addWallet`,
					{
						networkId: solana_id,
						walletAddress: walletAddressSolana,
					},
					{
						headers: {
							"x-auth-token": loginUser.data.data.token,
						},
					},
				);

				if (res) {
					setCheckSolana(false)
					return toast.info("Your Solana Address added successfully!", { position: toast.POSITION.TOP_CENTER });
				} else {
					return toast.info("Address is not added, There is some problem!", { position: toast.POSITION.TOP_CENTER });
				}
			}

			if (cardanoId) {
				const res = await axios.post(
					`https://snapshotapi.seedify.fund/api/v1/user/addWallet`,
					{
						networkId: cardanoId,
						walletAddress: walletAddressCardano,
					},
					{
						headers: {
							"x-auth-token": token,
						},
					},
				);
				if (res) {
					cancelAddressCardano()
					return toast.info("Your Cardano Address added successfully!", { position: toast.POSITION.TOP_CENTER });
				} else {
					return toast.info("Address is not added, There is some problem!", { position: toast.POSITION.TOP_CENTER });
				}
			}
			if (avalancheId) {
				const res = await axios.post(
					`https://snapshotapi.seedify.fund/api/v1/user/addWallet`,
					{
						networkId: avalancheId,
						walletAddress: walletAddressAvalanche,
					},
					{
						headers: {
							"x-auth-token": token,
						},
					},
				);
				if (res) {
					cancelAddressAvalanche()
					return toast.info("Your Avalanche Address added successfully!", { position: toast.POSITION.TOP_CENTER });
				} else {
					return toast.info("Address is not added, There is some problem!", { position: toast.POSITION.TOP_CENTER });
				}
			}

			if (elrondId) {
				const res = await axios.post(
					`https://snapshotapi.seedify.fund/api/v1/user/addWallet`,
					{
						networkId: elrondId,
						walletAddress: walletAddressElrond,
					},
					{
						headers: {
							"x-auth-token": token,
						},
					},
				);
				if (res) {
					cancelAddressElrond()
					return toast.info("Your Elrond Address added successfully!", { position: toast.POSITION.TOP_CENTER });
				} else {
					return toast.info("Address is not added, There is some problem!", { position: toast.POSITION.TOP_CENTER });
				}
			}
		} else {
			setError_wallet(true)
		}

	};

	const showIntegrateButton = async () => {
		if (!wallet) {
			return toast.info("Your wallet is not connected!", { position: toast.POSITION.TOP_CENTER });
		}
		const reskyc = await axios.get(
			`https://snapshotapi.seedify.fund/api/v1/block/check/${wallet}`,
		);

		if (reskyc.data.data.kycStatus) {
			handleOpen()
		} else {
			return toast.info("Your Address is not KYC verified!", { position: toast.POSITION.TOP_CENTER });
		}
	}
	const updateWallet = async () => {
		if (walletAddressSolana.length > 44 || walletAddressSolana.length < 32) {
			return toast.info("Your address is not valid", { position: toast.POSITION.TOP_CENTER });
		}
		if (walletAddressSolana === walletAddressSolana.toLocaleLowerCase()) {
			return toast.info("Your address is not valid", { position: toast.POSITION.TOP_CENTER });
		}
		if (!isNaN(walletAddressSolana)) {
			return toast.info("Your address is not valid", { position: toast.POSITION.TOP_CENTER });
		}

		const nonce = await axios.get(
			`https://snapshotapi.seedify.fund/api/v1/user/genrateNonce/${wallet}`,
		);
		// const web3 = new ethers.providers.Web3Provider(window.ethereum);
		// const signer = await web3.getSigner();
		// const signature = await signer.signMessage(nonce.data.data.nonce);
		// console.log(signature, "ssssssssssssssssssss")
		const signature = await web3.eth.personal.sign(nonce.data.data.nonce, wallet)
		const loginUser = await axios.post(
			`https://snapshotapi.seedify.fund/api/v1/user/login`,
			{ nonce: nonce.data.data.nonce, signature: signature },
		);
		setToken(loginUser.data.data.token);
		const netWork = await axios.get(
			`https://snapshotapi.seedify.fund/api/v1/block/check/${wallet}`,
		);
		var cardano_id = ""
		var solana_id = ""
		var avalanche_id = ""
		var elrond_id = ""

		if (netWork) {
			netWork.data.data.data.networks.forEach((m) => {
				if (m.networkId.networkName === "solana") {
					solana_id = m.id

				}
				if (m.networkId.networkName === "cardano") {
					cardano_id = m.id

				}
				if (m.networkId.networkName === "elrond") {
					elrond_id = m.id

				}
				if (m.networkId.networkName === "avalanche") {
					avalanche_id = m.id

				}

			}
			)
		}
		const nonceNew = await axios.get(
			`https://snapshotapi.seedify.fund/api/v1/user/genrateNonce/${wallet}`,
		);
		// const web3New = new ethers.providers.Web3Provider(window.ethereum);
		// const signerNew = web3New.getSigner();
		// const signatureNew = await signerNew.signMessage(nonceNew.data.data.nonce);
		const signatureNew = await web3.eth.personal.sign(nonceNew.data.data.nonce, wallet)
		if (walletAddressSolana) {
			const isResponse = await axios.put(
				`https://snapshotapi.seedify.fund/api/v1/user/updateWallet`,
				{
					walletAddress: walletAddressSolana,
					walletId: solana_id,
					nonce: nonceNew.data.data.nonce,
					signature: signatureNew,
				},
				{
					headers: {
						"x-auth-token": loginUser.data.data.token,
					},
				},
			)
			if (isResponse.data.message) {
				setCheckUpdateSolana(false)
				return toast.info("Your Solana Address is updated successfully!", { position: toast.POSITION.TOP_CENTER });
			} else {
				return toast.info("Address is not updated, There is some problem!", { position: toast.POSITION.TOP_CENTER });

			}
		}


		if (walletAddressCardano) {
			const isResponse = await axios.put(
				`https://snapshotapi.seedify.fund/api/v1/user/updateWallet`,
				{
					walletAddress: walletAddressCardano,
					walletId: cardano_id,
					nonce: nonceNew.data.data.nonce,
					signature: signatureNew,
				},
				{
					headers: {
						"x-auth-token": loginUser.data.data.token,
					},
				},
			)
			if (isResponse.data.message) {
				cancelAddressCardano()
				return toast.info("Your Cardano Address is updated successfully!", { position: toast.POSITION.TOP_CENTER });
			} else {
				return toast.info("Address is not updated, There is some problem!", { position: toast.POSITION.TOP_CENTER });

			}
		}
		if (walletAddressAvalanche) {
			const isResponse = await axios.put(
				`https://snapshotapi.seedify.fund/api/v1/user/updateWallet`,
				{
					walletAddress: walletAddressAvalanche,
					walletId: avalanche_id,
					nonce: nonceNew.data.data.nonce,
					signature: signatureNew,
				},
				{
					headers: {
						"x-auth-token": loginUser.data.data.token,
					},
				},
			)
			if (isResponse.data.message) {
				cancelAddressAvalanche()
				return toast.info("Your Avalanche Address is updated successfully!", { position: toast.POSITION.TOP_CENTER });
			} else {
				return toast.info("Address is not updated, There is some problem!", { position: toast.POSITION.TOP_CENTER });

			}
		}
		if (walletAddressElrond) {
			const isResponse = await axios.put(
				`https://snapshotapi.seedify.fund/api/v1/user/updateWallet`,
				{
					walletAddress: walletAddressElrond,
					walletId: elrond_id,
					nonce: nonceNew.data.data.nonce,
					signature: signatureNew,
				},
				{
					headers: {
						"x-auth-token": loginUser.data.data.token,
					},
				},
			)
			if (isResponse.data.message) {
				cancelAddressElrond()
				return toast.info("Your Elrond Address is updated successfully!", { position: toast.POSITION.TOP_CENTER });
			} else {
				return toast.info("Address is not updated, There is some problem!", { position: toast.POSITION.TOP_CENTER });

			}
		}

	};



	const copyAddressSolana = () => {
		var copysolana = document.getElementById("copysolana")
		copysolana.select()
		navigator.clipboard.writeText(copysolana.value);
	};

	const joinLottery = async () => {
		if (!wallet) {
			return toast.info("Your wallet is not connected!", { position: toast.POSITION.TOP_CENTER });
		}
		const reskyc = await axios.get(
			`https://snapshotapi.seedify.fund/api/v1/block/check/${wallet}`,
		);
		
		if (reskyc.data.data.kycStatus) {
			if (stakingBalance >= 250 & stakingBalance < 1000) {
				setLotteryOpen(true)
			} else {
				return toast.info("You are not eligible for Tier-1 lottery.", { position: toast.POSITION.TOP_CENTER });
			}
		} else {
			return toast.info("Your Address is not KYC verified!", { position: toast.POSITION.TOP_CENTER });
		}
	}


	const [pool, setPool] = useState('')
	const [lotteryId, setLotteryId] = useState('')


	useEffect(() => {
		// Getting res from backend api and setting to the setPool .
		getDataAPI("get_upcomming").then((res) => setPool(res.data.upc_pool));
	}, []);

	const join = async () => {
		setLotteryOpen(false)
		await postDataAPI('lottery', { wallet: wallet.toLocaleLowerCase(), id: lotteryId }).then((res) => toast.info(res.data.msg, { position: toast.POSITION.TOP_CENTER }))
	}

	const lotteryModal = () => {

		return (
			<div className="paper">
				<div className="paper-inner">
					<div className="paper-head">
						<h2 className="paper_h2" id="simple-modal-title">
							Join Lottery
						</h2>
						<span onClick={() => setLotteryOpen(false)}>
							<i class="fa fa-times" aria-hidden="true"></i>
						</span>
					</div>

					<div className="form-group">
						<label>IGO</label>
						<select
							className="input-select"
							name="igo_id"
							onChange={(e) => setLotteryId(e.target.value)}
						>
							<option
								className="ico___dropdown"
								value=""
								required>
								Select Igo
							</option>
							{pool ? pool.map((p) => (
								<option className="ico___dropdown" key={p._id} value={p._id}>{p.title} {p.idophase} ({p.up_pool_access})</option>
							))
								: ""}

						</select>
					</div>{" "}
					<button
						className="paper_button"
						onClick={join}
					>
						JOIN
					</button>
				</div>
			</div>
			//<br />
		);
	}

	const body = () => {

		return (
			<div className="paper wallet-pop">
				<div className="paper-inner">
					<div className="paper-head">
						<h2 className="paper_h2" id="simple-modal-title">
							Integrate Other Layers 1 Wallets With Your Account
						</h2>
						<span onClick={handleClose}>
							<i class="fa fa-times" aria-hidden="true"></i>
						</span>
					</div>
					<div className="maindiv-pop mt-4">
						<div className="pop-imgd">
							<img src={slna_ads} alt="solana" />
						</div>
						<div className="outr-amt">
							<div className="label-div">
								<p className="amtlft too_l">
									Solana Address
									<span className="i_con"><span className=""><img src={info} alt="hower notice" /></span><span className="tool">Solana wallet address is case sensitive.</span></span>
								</p>


							</div>
							<div className="inpt-out">
								{
									checkSolana ?
										<input
											id="copysolana"
											className={`paper_input ${error_wallet ? (walletAddressSolana ? "" : "errorborder") : ""}`}
											type="string"
											min="0"
											name="walletAddressSolana"
											value={walletAddressSolana}

											onChange={(e) => { setWalletAddressSolana(e.target.value) }}
										/> : ""
								}

								{
									checkSolana ? "" :
										<input
											id="copysolana"
											className="paper_input"
											type="string"
											min="0"
											name="walletAddressSolana"
											value={walletAddressSolana}
											disabled
											onChange={(e) => { setWalletAddressSolana(e.target.value) }}
										/>

								}



								{
									checkSolana ? "" :
										<div className="icon-dv">
											{walletAddressSolana ? <a href={`https://solscan.io/account/${walletAddressSolana}`} target="_blank" rel="noopener noreferrer"><span><i class="fa fa-link" aria-hidden="true"></i></span></a> : ""}
											{checkUpdateSolana ? <span><button>
												<i class="fa fa-clone" aria-hidden="true" onClick={copyAddressSolana}></i></button></span> : ""}
											{checkUpdateSolana ? "" : <span><button><i class="fa fa-pencil-square-o" aria-hidden="true" onClick={solanaEnable}></i></button></span>}
										</div>
								}
								{error_wallet ? <div className="error-text">{walletAddressSolana ? "" : "Enter the Address"}</div> : ""}

								{checkSolana ? (

									<div className="inpt-btn mt-3">
										<div className="view-detail"><button class="border-btn" onClick={() => cancelAddressSolana()} >Cancel</button></div>
										<div class="view-detail"><button class="btnn_white border-btn" onClick={() => addSolanaWallet()}>Save</button></div>
									</div>) : ("")}

								{checkUpdateSolana ? (
									<div className="inpt-btn mt-3">
										<div className="view-detail"><button class="border-btn" onClick={() => cancelAddressSolana()} >Cancel</button></div>
										<div class="view-detail"><button class="btnn_white border-btn" onClick={() => updateWallet()}>Update</button></div>
									</div>) : ("")}

								{/* <div className="inpt-btn">
										<div className="whitepaper-btn"><button class="border-btn" onClick={() => cancelAddressSolana()} >Cancel</button></div>
										<div class="view-detail"><button class="btnn_white" onClick={() => handleSubmitSolana()}>Submit</button></div>
									</div> */}

							</div>

						</div>
					</div>

					{/* <div className="maindiv-pop">
						<div className="pop-imgd">
							<img src={ava_ads} />
						</div>
						<div className="outr-amt">
							<div className="label-div">
								<p className="amtlft">
									Avalanche Address
								</p>
								<span className="amtrgt">verified Account</span>
							</div>
							<div className="inpt-out">
								<input
									className="paper_input"
									type="string"
									min="0"
									name="walletAddressAvalanche"
									value={walletAddressAvalanche}
									onChange={(e) => setWalletAddressAvalanche(e.target.value)}
								/>
								<div className="icon-dv">
									<span><button> <i class="fa fa-clone" aria-hidden="true" onClick={() => copyAddressAvalanche()}></i></button></span>
									<span><button><i class="fa fa-pencil-square-o" aria-hidden="true" onClick={() => updateWallet()}></i></button></span>
								</div>
								{walletAddressAvalanche && checkAvalanche  ? (
									<div className="inpt-btn mt-3">
										<div className="view-detail"><button class="border-btn" onClick={() => cancelAddressAvalanche()} >Cancel</button></div>
										<div class="view-detail"><button class="btnn_white border-btn" onClick={() => addSolanaWallet()}>Submit</button></div>
									</div>) : ("")} */}

					{/* <div className="inpt-btn">
										<div className="whitepaper-btn"><button class="border-btn" onClick={() => cancelAddressAvalanche()} >Cancel</button></div>
										<div class="view-detail"><button class="btnn_white" onClick={() => handleSubmitAvalanche()}>Submit</button></div>
									</div> */}
					{/* </div>
						</div>
					</div>  */}
					{/* <div className="maindiv-pop">
						<div className="pop-imgd">
							<img src={crd_ads} />
						</div>
						<div className="outr-amt">
							<div className="label-div">
								<p className="amtlft">
									Cardano Address
								</p>
								<span className="amtrgt">verified Account</span>
							</div>
							<div className="inpt-out">
								<input
									id="copycardano"
									className="paper_input"
									type="string"
									min="0"
									name="walletAddressCardano"
									value={walletAddressCardano}
									onChange={(e) => setWalletAddressCardano(e.target.value)}
								/>
								<div className="icon-dv">
									<span><button> <i class="fa fa-clone" aria-hidden="true" onClick={() => copyAddressCardano()}></i></button></span>
									<span><button><i class="fa fa-pencil-square-o" aria-hidden="true" onClick={() => updateWallet()}></i></button></span>
								</div>
								{walletAddressCardano && checkCardano ? (
									<div className="inpt-btn mt-3">
										<div className="view-detail"><button class="border-btn" onClick={() => cancelAddressCardano()} >Cancel</button></div>
										<div class="view-detail"><button class="btnn_white border-btn" onClick={() => addSolanaWallet()}>Submit</button></div>
									</div>) : ("")}

								<div className="inpt-btn">
										<div className="whitepaper-btn"><button class="border-btn" onClick={() => cancelAddressCardano()} >Cancel</button></div>
										<div class="view-detail"><button class="btnn_white" onClick={() => handleSubmitCardano()}>Submit</button></div>
									</div>
							</div>

						</div>
					</div> */}
					{/* <div className="maindiv-pop">
						<div className="pop-imgd">
							<img src={eld_ads} />
						</div>
						<div className="outr-amt">
							<div className="label-div">
								<p className="amtlft">
									Elrond Address
								</p>
								<span className="amtrgt">verified Account</span>
							</div>
							<div className="inpt-out">
								<input
									id="copyelrond"
									className="paper_input"
									type="string"
									min="0"
									name="walletAddressElrond"
									value={walletAddressElrond}
									onChange={(e) => setWalletAddressElrond(e.target.value)}
								/>
								<div className="icon-dv">
									<span><button> <i class="fa fa-clone" aria-hidden="true" onClick={() => copyAddressElrond()}></i></button></span>
									<span><button><i class="fa fa-pencil-square-o" aria-hidden="true" onClick={editSolana}></i></button></span>
								</div>
								{walletAddressElrond && checkElrond ? (
									<div className="inpt-btn mt-3">
										<div className="view-detail"><button class="border-btn" onClick={() => cancelAddressElrond()} >Cancel</button></div>
										<div class="view-detail"><button class="btnn_white border-btn" onClick={() => addSolanaWallet()}>Submit</button></div>
									</div>) : ("")}

								<div className="inpt-btn">
										<div className="whitepaper-btn"><button class="border-btn" onClick={() => cancelAddressElrond()} >Cancel</button></div>
										<div class="view-detail"><button class="btnn_white" onClick={() => handleSubmitElrond()}>Submit</button></div>
									</div>
							</div>
						</div>

					</div> */}
				</div>

			</div>

			//  <br />
		);
	}
	return (
		<div>

			<Header />
			<div className="banner profile-banner">
				<div className="container_cust">

					<div className="inner_banner pro_file">
						<h1>
							My Profile
						</h1>
						<div className="form-group">
							<button className="crt-ico" style={{ marginRight: 10 }} onClick={joinLottery}>
								Join Lottery
							</button>
							<button className="crt-ico"  onClick={showIntegrateButton}>
								Add Wallets
							</button>
						</div>
						{/* <p> Get the blockchain gaming tokens you love, through holding SFUND
						</p> */}
					</div>
				</div>

				<div className="nd_banner myprofile">
					<div className="container_cust">
						<div className="speedi_grd">
							<div className="speedi_inner_grd">
								<div className="inner_sp_grd">
									<h2>User Details</h2>
									<span>Wallet Address</span>
									<p>{metamask.showAddress}</p>
									{/* <span>KYC Status</span>*/}
									<p className="kyc">{profile.kycStatus ? <img src={verify} alt="kyc verification logo" /> : ""} {profile.kycStatus ? "Verified Account" : profile.status} </p>
								</div>
							</div>
							<div className="speedi_inner_grd">
								<div className="inner_sp_grd">
									<h2>Staking Balance</h2>
									<h1>{stakingBalance > 0 ? stakingBalance : "0"}</h1>

								</div>
							</div>
							<div className="speedi_inner_grd">
								<div className="inner_sp_grd">
									<h2>Liquidity Balance</h2>
									<h1>{liquidityBalance ? liquidityBalance : "0"}</h1>

								</div>
							</div>
							<div className="speedi_inner_grd">
								<div className="inner_sp_grd">
									<h2>Total Balance</h2>
									<h1>{totalbalance ? totalbalance : "0"}</h1>

								</div>
							</div>


						</div>
					</div>
				</div>
			</div>

			<br />
			<br />
			<br />
			<br />
			<br />

			{/* <div className="container_cust">
				<div className="igos-vesting">
					<h2 className={igo_vesting ? "active" : ""} onClick={() => setIgo_vesting(true)}>
						IGOS
					</h2>
					<h2 className={igo_vesting ? "" : "active"} onClick={() => setIgo_vesting(false)}>
						Vesting
					</h2>
				</div>
				<div className="right-panel-main wishlist-data">
					<div>

						{
							igo_vesting ?
								<div className="bannerpro-btm" style={{ marginTop: 0 }}>
									<div>
										{ico.compleated_profile_pool
											? ico.compleated_profile_pool.map((pool) => (
												<CompletedProfile key={pool._id} pool={pool} />
											))
											: ""}
									</div>
								</div> : ""
						}

						{
							igo_vesting ? ""
								:
								<div className="bannerpro-btm" style={{ marginTop: 0 }}>
									<div>
										{ico.vesting
											? ico.vesting.map((pool) => (
												<FeaturedProfile key={pool._id} pool={pool} />
											))
											: ""}
									</div>
								</div>
						}


						<div className="shw-more">
							<button type="button" className="btn " onClick={() => getProfilePool()}>Show More</button>
						</div>



					</div>
				</div>
			</div> */}

			<br />
			<br />
			<div>
				<Modal
					open={lotteryOpen}
					onClose={handleClose}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description">
					{lotteryModal()}
				</Modal>
			</div>
			<div>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description">
					{body()}
				</Modal>
			</div>
			<Footer />
		</div>
	);
};

export default memo(UserProfile);