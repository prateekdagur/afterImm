import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { deleteico } from "../../redux/actions/icoAction";
//import { getstoreClaim, getsendClaimToken } from "../../redux/actions/claimTokenAction";
import Modal from "@material-ui/core/Modal";
// import { makeStyles } from "@material-ui/core/styles";
import BusdIDOabi from "../busdIDO.json";
import { SeedifyFundsContractAbi } from "../abis";
import { getDataAPI } from "../../utils/API";
import { useParams, NavLink, Link } from "react-router-dom";
// import { getstoreClaim, getsendClaimToken } from "../../redux/actions/claimTokenAction";
import Web3 from "web3";

//web3 provider.
const web3 = new Web3(
	new Web3.providers.HttpProvider(
		"https://bsc-dataseed.binance.org/",
	),
);


//for searching pool.
const SearchPool = () => {
	const [pool, setPool] = useState("");
	const [open, setOpen] = useState(false);
	const [Id, setId] = useState('')
	const dispatch = useDispatch();
	var id = useParams().id;
	useEffect(() => {
		getDataAPI(`getPool/${id}`).then((res) => setPool(res.data));
	}, [id]);
	// const clickClaimStore = (addr) => {

	// 	dispatch(getstoreClaim(addr))
	// }
	// const clickSendToken = (addr) => {

	// 	dispatch(getsendClaimToken(addr))
	// }
	// const downloadcsv = async (addr) => {
	// 	await getDataAPI(`generate_csv/${addr}`)
	// 	document.getElementById('download-link').click();
	// }

	//const [number2, setNumber2] = useState();
	const [number1, setNumber1] = useState();

	var contractAddr = '';
	if (pool.address) {
		contractAddr = pool.address.toUpperCase();
	}

	useEffect(() => {
		//Consuming smart contract ABI and contract address.
		async function simpleContract() {
		  try {
			if (contractAddr) {
			  const SimpleContract = new web3.eth.Contract(
				pool.crypto_type === "BUSD"
				  ? BusdIDOabi
				  : SeedifyFundsContractAbi,
				contractAddr
			  );
			  //Getting total bnb from blockchain
			  const result = await SimpleContract.methods.totalBUSDReceivedInAllTier().call();
			  
			  //Getting max cap from blockchain
			  const total = await SimpleContract.methods.maxCap().call();
			 // setNumber2(result / 10 ** 18);
			  setNumber1((result / 10 ** 18 / (total / 10 ** 18)) * 100);
			}
		  } catch (err) {
			console.log(err);
		  }
		}
		simpleContract();
	  }, [contractAddr, pool.crypto_type]);

	var num = Math.ceil(number1 / 2)
	var full = "";
	if (num === 50) {
		full = 'fullupload'
	}

	const handleOpen = (id) => {
		setId(id)
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const deletePool = () => {
		dispatch(deleteico(Id))
		setOpen(false)
		window.location.reload()
	}
	const body = (
		<div className="paper">
			<div className="paper-inner">
				<div className="upload-cancel paper-btns">
					<a className=" paper_button" href="#cancel" onClick={() => handleClose()} >
						Cancel
					</a>
					<a className="coming-soon paper_button" href="#confirm" onClick={deletePool}>
						Confirm
					</a>
				</div>
			</div>
		</div>
	);


	// const useStyles = makeStyles(() => ({
	// 	ul: {
	// 		"& .MuiPaginationItem-root": {
	// 			color: "#fff",
	// 		},
	// 	},
	// }));
	// const classes = useStyles();
	var allocation = number1 * pool.up_pool_raise;

	return (
		<div className="container_cust">
			<div className="admin" id="tabs">
				<div className="ico-main">
					<div className="admin-title">
						<h2>
							{pool.pool_type} pool0
						</h2>
					</div>
				</div>
				<div className="upcoming-list serch-pool">
					{pool ? (
						<div className="inner-box">
							<div className="boxinner-main">
								<div className="list-boxes">
									<div className="media">
										<div className="client-name">
											<div className="client-img">
												<img
													src={pool.images}
													alt=""
												/>
											</div>
											<div className="client-info">
												<h5>{pool.title}</h5>
												<p>
													{pool.address.slice(0, 5)}...{pool.address.slice(37, 42)}
												</p>
											</div>
										</div>
										<div className="update__delete">
										<Link className="fa fa-trash" onClick={() => handleOpen(pool._id)}></Link>
											<Link
												to={`/admin/editico/${pool._id}`}
												className="fa fa-pencil-square-o"></Link>
										</div>
									</div>
									<div className="media-btm">
										<div className="na">
											{pool.up_pool_raise}
											<span> {pool.symbol}</span>
										</div>
										<div className="radio">Ratio per 1 {pool.crypto_type}</div>
									</div>
									
									<div class={`battery ${full}`}>
									{num ?
											[...Array(num)].map(() => (
												<div className="bar active" data-power="10"></div>
											))
											: ""}
									</div>
								
									<div className="percentage">
										<span className="total">{number1 ? number1.toFixed(2) : "0"}%</span>
										<span className="sfund">{allocation ? allocation.toFixed(2) : "0"}/{pool.total_supply} {pool.symbol}</span>
									</div>
								</div>

								<div className="text-center tw-btns">
									{/* {pool.address ?
								<NavLink
									to={`/admin/updatetier/${pool.address}`}
									className="coming-soon">
									Update Tiers Value
								</NavLink>
								: ""} */}
									{pool.address ?
										<NavLink
											to={`/admin/adduserinwhitelist/${pool._id}`}
											className="detail yellow_btn">
											Add User in White List
										</NavLink>
										: ""}
									{pool.address ?
										<NavLink
											to={`/admin/adduserinwhitelist/${pool._id}`}
											className="detail yellow_btn">
											{pool.pool_type} pool
										</NavLink>
										: <a href="#comming-soon" className="coming-soon yellow_btn">
										comming-soon
									  </a>}

									
									{/* {pool.address ?
								<Link
									to={`/admin/readwhitelist/${pool.address}`}
									className="coming-soon">
									Read White List
								</Link>
								: ""} */}
									{/* m                              {pool.address ?
								<a href="#prepare-token" onClick={() => clickClaimStore(pool.address)} className="coming-soon">
									Prepare Claim
								</a>
								: ""} */}
									{/* {pool.address ?
								<a href="#distribute-token" onClick={() => clickSendToken(pool.address)} className="coming-soon">
									Distribute Token
								</a>
								: ""} */}
									{/* {pool.address ?
								<a
									href="#download-csv"
									onClick={() => downloadcsv(pool.address)}
									className="coming-soon">
									download csv
								</a>
								: ""} */}
								</div>

							</div>
						</div>
					) : (
						""
					)}
				</div>
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
		</div>
	);
};

export default SearchPool;
