import GlobalTypes from "./GlobalTypes";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {CHAIN_ID} from "../../utils/config"


toast.configure();
export const METAMASK_TYPES = {
	LOADING: "LOADING",
	CONNECT: "CONNECT",
};

let web3 = new Web3(
	new Web3.providers.HttpProvider(
		'https://bsc-dataseed.binance.org/'
		
	)
);

const providerOptions = {
	walletconnect: {
		package: WalletConnectProvider,
		options: {
			rpc: {
				 56: 'https://bsc-dataseed.binance.org/'
			},
			chainId: 56,
			network: "binance"
		},
	},
};


export const connectWallet = () => async (dispatch) => {
	try {
		const web3Modal = new Web3Modal({
			cacheProvider: true,
			providerOptions,
		});
		//connect
		const provider = await web3Modal.connect();
		window.provider = provider;
		web3 = new Web3(provider);
		localStorage.setItem("modalProvider", 1);
		//get address
		const accounts = await web3.eth.getAccounts();
		const address = accounts[0];
		window.addressselected = accounts[0];
		window.checkconnect = address;
		// //get network id

		const chainid = await web3.eth.net.getId();
		

		if (chainid !== CHAIN_ID) {
			localStorage.removeItem("modalProvider");
			localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
			localStorage.removeItem("address");
			return toast.info("Connect your wallet to Binance Smart Chain!", {
				position: toast.POSITION.TOP_CENTER,
			});
		}

		if (chainid === CHAIN_ID) {
			localStorage.setItem("address", address);
			provider.on("disconnect", () => {
				localStorage.removeItem("modalProvider");
				localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
				localStorage.removeItem("address");
				dispatch({
					type: METAMASK_TYPES.CONNECT,
					payload: {
						provider: false,
						active: true,
						design: false,
					},
				});
			});
			provider.on("accountsChanged", (accounts) => {
				const address = accounts[0];
				if (accounts.length > 0) {
					dispatch({
						type: METAMASK_TYPES.CONNECT,
						payload: {
							address: address,
							provider: provider,
							active: false,
							design: true,
							showAddress: address.slice(0, 4) + "..." + address.slice(38, 42),
						},
					});

					localStorage.setItem("address", address);
				} else {
					dispatch({
						type: METAMASK_TYPES.CONNECT,
						payload: {
							address: "",
							active: true,
							design: false,
							showAddress: "",
						},
					});
					localStorage.removeItem("modalProvider");
					localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
					localStorage.removeItem("address");
				}
			});

			provider.on("chainChanged", (chainId) => {
				if (chainid !== CHAIN_ID) {
					web3Modal.clearCachedProvider();
					dispatch({
						type: METAMASK_TYPES.CONNECT,
						payload: {
							address: "",
							active: true,
							design: false,
							showAddress: "",
						},
					});
					localStorage.removeItem("modalProvider");
					localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
					localStorage.removeItem("address");
					toast.info("Please switch to Binance Smart Chain", {
						position: toast.POSITION.TOP_CENTER,
					});
				}
				if (chainid === CHAIN_ID) {
					dispatch({
						type: METAMASK_TYPES.CONNECT,
						payload: {
							address: address,
							provider: provider,
							active: false,
							design: true,
							showAddress: address.slice(0, 4) + "..." + address.slice(38, 42),
						},
					});
				}
			});
			if (chainid === CHAIN_ID) {
				dispatch({
					type: METAMASK_TYPES.CONNECT,
					payload: {
						address: address,
						provider: provider,
						active: false,
						design: true,
						showAddress: address.slice(0, 4) + "..." + address.slice(38, 42),
					},
				});
			} else {
				localStorage.removeItem("modalProvider");
				localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
				localStorage.removeItem("address");
				toast.info("Please switch to Binance Smart Chain", {
					position: toast.POSITION.TOP_CENTER,
				});
			}
		}
	} catch (err) {
		if (err && err.response && err.response.data) {
			dispatch({
				type: GlobalTypes.NOTIFY,
				payload: {
					error: err.response.data.msg,
				},
			});
		}
	}
};

export const checkWalletConnection = () => async (dispatch) => {
	try {
		var prevAddress = localStorage.getItem("address");

		if (prevAddress && prevAddress !== "undefined") {
			const web3Modal = new Web3Modal({
				cacheProvider: true,
				providerOptions,
			});

			const provider = await web3Modal.connect();
			window.provider = provider;
			web3 = new Web3(provider);
			const accounts = await web3.eth.getAccounts();
			var address = accounts[0];
			window.addressselected = accounts[0];
			window.checkconnect = address;
			// const provider = Web3.givenProvider;
			const chainid = await web3.eth.net.getId();
			if (chainid === CHAIN_ID) {
				dispatch({
					type: METAMASK_TYPES.CONNECT,
					payload: {
						address: address,
						active: false,
						design: true,
						showAddress: address.slice(0, 4) + "..." + address.slice(38, 42),
					},
				});
			}
			if (address !== "") {
				localStorage.setItem("modalProvider", 1);
				//address = (provider.chainId === "0x38") ? provider.selectedAddress : (provider?.accounts[0]);

				localStorage.setItem("address", address);

				provider.on("connect", (chainid) => {
					console.log("connected", address);
					if (chainid !== CHAIN_ID) {
						localStorage.removeItem("modalProvider");
						localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
						localStorage.removeItem("address");
						dispatch({
							type: METAMASK_TYPES.CONNECT,
							payload: {
								active: true,
								design: false,
								showAddress: "",
							},
						});
					} else dispatch({
						type: METAMASK_TYPES.CONNECT,
						payload: {
							address: address,
							active: false,
							design: true,
							showAddress: address.slice(0, 4) + "..." + address.slice(38, 42),
						},
					});
				});
				provider.on("disconnect", () => {
					dispatch({
						type: METAMASK_TYPES.CONNECT,
						payload: {
							active: true,
							design: false,
							showAddress: "",
						},
					});
				});
				provider.on("accountsChanged", (accounts) => {
					if (chainid !== CHAIN_ID) {
						localStorage.removeItem("modalProvider");
						localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
						localStorage.removeItem("address");
						dispatch({
							type: METAMASK_TYPES.CONNECT,
							payload: {
								active: true,
								design: false,
								showAddress: "",
							},
						});
					} else {
						address = accounts[0];
						if (accounts.length > 0) {
							dispatch({
								type: METAMASK_TYPES.CONNECT,
								payload: {
									address: address,
									active: false,
									design: true,
									showAddress:
										address.slice(0, 4) + "..." + address.slice(38, 42),
								},
							});
							localStorage.setItem("address", address);
						} else {
							localStorage.removeItem("modalProvider");
							localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
							localStorage.removeItem("address");
							dispatch({
								type: METAMASK_TYPES.CONNECT,
								payload: {
									address: "",
									active: true,
									design: false,
									showAddress: "",
								},
							});
						}
					}
				});

				provider.on("chainChanged", (chainId) => {
					if (chainId !== CHAIN_ID) {
						localStorage.removeItem("modalProvider");
						localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
						localStorage.removeItem("address");
						dispatch({
							type: METAMASK_TYPES.CONNECT,
							payload: {
								active: true,
								design: false,
								showAddress: "",
							},
						});
						toast.info("Please switch to Binance Smart Chain!", {
							position: toast.POSITION.TOP_CENTER,
						});
					}
					if (chainId === CHAIN_ID) {
						dispatch({
							type: METAMASK_TYPES.CONNECT,
							payload: {
								address: address,
								active: false,
								design: true,
								showAddress:
									address.slice(0, 4) + "..." + address.slice(38, 42),
							},
						});
					}
				});
			}
		} else {
			dispatch({
				type: METAMASK_TYPES.CONNECT,
				payload: {
					active: true,
					design: false,
					showAddress: "",
				},
			});
		}
	} catch (err) {
		if (err && err.response && err.response.data) {
			dispatch({
				type: GlobalTypes.NOTIFY,
				payload: {
					error: err.response.data.msg,
				},
			});
		}
	}
};

export const disconnectWallet = () => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		localStorage.removeItem("modalProvider");
		localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
		localStorage.removeItem("address");
		dispatch({
			type: METAMASK_TYPES.CONNECT,
			payload: {
				active: true,
				design: false,
			},
		});
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
	} catch (err) {
		if (err && err.response && err.response.data) {
			dispatch({
				type: GlobalTypes.NOTIFY,
				payload: {
					error: err.response.data.msg,
				},
			});
		}
	}
};
// // if (!web3) {
// 	if (Number(localStorage.getItem("modalProvider"))) {
// 		checkWalletConnection();
// 	// } else metamaskConnectInit();
// }

export { web3 };