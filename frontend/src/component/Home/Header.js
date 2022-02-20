import React, { useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Header.css";
import logo from "../../images/Logo1.svg";
import Modal from "@material-ui/core/Modal";
import Web3 from "web3";
import 'react-toastify/dist/ReactToastify.css'
import { disconnectWallet, connectWallet, checkWalletConnection } from "../../redux/actions/metamaskAction";
import TelegramIcon from '@material-ui/icons/Telegram';
import pf_img from "../../images/pf_img.png";


const Header = () => {
	const { auth, metamask } = useSelector((state) => state);

	const dispatch = useDispatch()
	const provider = Web3.givenProvider;

	//check connection
	useEffect(() => {
		dispatch(checkWalletConnection())
	}, [dispatch, provider])

	//connect wallet
	const connectMetamask = async () => {
		dispatch(connectWallet())

	};
	//disconnect wallet
	const disconnectwallet = () => {
		dispatch(disconnectWallet());
		handleClose();
	};
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	//   console.log("metamask",metamask)
	const body = (
		<div className="paper">
			<div className="paper-inner">
				<div className="paper-head">
					<h2 className="paper_h2" id="simple-modal-title">
						Your wallet
					</h2>
					<span onClick={handleClose}><i class="fa fa-times" aria-hidden="true"></i></span>
				</div>
				<input
					className="paper_input"
					type="text"
					name="amount"
					value={metamask.address}
					readOnly
				/>{" "}
				<button className="paper_button" onClick={() => disconnectwallet()}>
					Disconnect
				</button>
			</div>
		</div>
	);
	return (
		<div>
			<header className="hea_der">
				<div className="container_cust">
					<div className="inner_header">
						<div className="logo">
							<Link to="/">
								<img src={logo} alt="" />
							</Link>
						</div>

						<div className="navi_gation">
							<Link
								className="gen_btn btn_white"
								to={
									auth.token && auth.role
										? "/admin/upcommingpool"
										: "/admin/login"
								}>
								dashboard
							</Link>

							<nav className="navbar navbar-expand-lg navbar-light bg-light">
								<button
									className="navbar-toggler"
									type="button"
									data-toggle="collapse"
									data-target="#navbarSupportedContent"
									aria-controls="navbarSupportedContent"
									aria-expanded="false"
									aria-label="Toggle navigation">
									<span className="navbar-toggler-icon"></span>
								</button>

								<div className="collapse navbar-collapse"
									id="navbarSupportedContent">
									<ul className="navbar-nav white-ul">
										{/* <li className="nav-item">
											<a className="nav-link" href="#">Projects</a>
										</li> */}
										<li className="nav-item">
											<a className="nav-link" href="https://staking.seedify.fund/" target="_blank" rel="noopener noreferrer">Staking/Farming</a>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="https://claim.seedify.fund/" target="_blank" rel="noopener noreferrer">Claims</a>
										</li>
										{/* <li className="nav-item">
											<a className="nav-link" href="#">Whitelist</a>
										</li> */}
										{/* <li className="nav-item">
											<a className="nav-link" href="#">Whitepaper</a>
										</li> */}
										{/* <li className="nav-item ">
											<a className="nav-link" href="https://p50z1ifoy8t.typeform.com/to/iSzThzNs" target="_blank" rel="noopener noreferrer">Apply as a Project</a>
										</li> */}
									</ul>
									<div className="right-tophead">
										<ul className="navbar-nav icon-nav">
											<li className="nav-item ">
												<a className="nav-link" href="https://twitter.com/SeedifyFund"
													target="_blank" rel="noopener noreferrer"><span><i className="fa fa-twitter" aria-hidden="true"></i></span> </a>
											</li>
											<li className="nav-item">
												<a className="nav-link" href="https://medium.com/seedify/what-is-seedify-e4e99a7a255a"
													target="_blank" rel="noopener noreferrer"><span className="medium-icon"></span></a>
											</li>
											<li className="nav-item">
												<a className="nav-link" href="https://t.me/seedifyfund " target="_blank" rel="noopener noreferrer"> <TelegramIcon /></a>
											</li>
										</ul>

										<div className="nav-item d-mobile" >
											{metamask.active ? (
												<button
													className="gen_bttn btn_white connect_btn yellow_btn"
													onClick={() => connectMetamask()}>
													connect wallet
												</button>
											) : (
												""
											)}

											<div style={{ display: "flex" }}>
												{metamask.design ? (
													<div>
														<button
															className="addressh yellow_btn"
															onClick={() => handleOpen()}>
															{metamask.showAddress}
														</button>

													</div>
												) : null}

												<div>
													<a style={{ marginLeft: 20 }} href="/user-profile">
														<img src={pf_img} alt="user profile icon" />
													</a>
												</div>
											</div>


										</div>
									</div>
								</div>
							</nav>
							<div className="nav-item d-tab">
								<ul className="navbar-nav icon-nav">

									<li className="nav-item ">
										<a className="nav-link" href="https://twitter.com/SeedifyFund"
											target="_blank" rel="noopener noreferrer"><span><i className="fa fa-twitter" aria-hidden="true"></i></span> </a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="https://medium.com/seedify/what-is-seedify-e4e99a7a255a"
											target="_blank" rel="noopener noreferrer"><span className="medium-icon"></span></a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="https://t.me/seedifyfund " target="_blank" rel="noopener noreferrer"> <TelegramIcon /></a>
									</li>
								</ul>
								{metamask.active ? (
									<button
										className="gen_bttn btn_white connect_btn yellow_btn"
										onClick={() => connectMetamask()}>
										connect wallet
									</button>
								) : (
									""
								)}

								<div>
									{metamask.design ? (
										<div>
											<button
												className="addressh yellow_btn"
												onClick={() => handleOpen()}>
												{metamask.showAddress}
											</button>
										</div>
									) : null}
								</div>
								<div style={{ width: 80 }}>
									<a style={{ marginLeft: 20 }} href="/user-profile">
										<img src={pf_img} alt="user profile icon" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
			<div>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description">
					{body}
				</Modal>
			</div>
		</div>
	);
};

export default memo(Header);
