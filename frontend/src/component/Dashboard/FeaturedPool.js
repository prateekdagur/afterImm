
import { Link, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector} from "react-redux";
import { deleteico, getico } from "../../redux/actions/icoAction";

// import {
// 	getstoreClaim,
// 	getsendClaimToken,
// } from "../../redux/actions/claimTokenAction";
import Modal from "@material-ui/core/Modal";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BusdIDOabi from "../busdIDO.json";
import { SeedifyFundsContractAbi } from "../abis";
import Web3 from "web3";


//web3 provider.
const web3 = new Web3(
	new Web3.providers.HttpProvider(
		"https://bsc-dataseed.binance.org/",
	),
);

toast.configure();
//featured pool component.
const FeaturedPool = ({featured, page}) => {
	const [open, setOpen] = useState(false);
	const [Id, setId] = useState('');
	const {auth} = useSelector(state => state)

	const dispatch = useDispatch()

	const handleOpen = (id) => {
		setId(id)
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	
	const [number2, setNumber2] = useState();
	const [number1, setNumber1] = useState();

	var contractAddr = '';
	if (featured.address) {
		contractAddr = featured.address.toUpperCase();
	}

	useEffect(() => {
		//Consuming smart contract ABI and contract address.
		async function simpleContract() {
		  try {
			if (contractAddr) {
			  const SimpleContract = new web3.eth.Contract(
				featured.crypto_type === "BUSD"
				  ? BusdIDOabi
				  : SeedifyFundsContractAbi,
				contractAddr
			  );
			  //Getting total bnb from blockchain
			  let totalTokenFxn = featured.crypto_type === "BUSD" ? "totalBUSDReceivedInAllTier" : "totalBnbReceivedInAllTier";

			  const result = await SimpleContract.methods[totalTokenFxn]().call() 
			  //Getting max cap from blockchain
			  const total = await SimpleContract.methods.maxCap().call();
			  setNumber2(result / 10 ** 18);
			  setNumber1((result / 10 ** 18 / (total / 10 ** 18)) * 100);
			}
		  } catch (err) {
			console.log(err);
		  }
		}
		simpleContract();
	  }, [contractAddr, featured.crypto_type]);


  var num = Math.ceil(number1 / 2)
	var full = "";
	if (num === 50) {
		full = 'fullupload'
	}


	// const useStyles = makeStyles(() => ({
	// 	ul: {
	// 		"& .MuiPaginationItem-root": {
	// 			color: "#fff",
	// 		},
	// 	},
	// }));
	// const classes = useStyles();
	// const clickClaimStore = (addr) => {
	// 	dispatch(getstoreClaim(addr));
	// };
	// const clickSendToken = (addr) => {
	// 	dispatch(getsendClaimToken(addr));
	// };
	// const downloadcsv = (name) => {
	// 	var link = document.createElement('a');
	// 	link.href = `/exportcsv/${name}-allocation.csv`;
	// 	document.body.appendChild(link);
	// 	link.click();
	// 	document.body.removeChild(link);

	// }
	

	const deletePool = () => {
		dispatch(deleteico(Id, auth))
		setOpen(false)
		dispatch(getico(page));
	}
	var progressBar = [];
	for (let i = 0; i < num; i++) {
		progressBar.push(i)
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
	var allocation = number2 * featured.up_pool_raise;
	return (
		<div>
			<div className="boxinner-main">
			<div className="list-boxes">
				<div className="media">
					<div className="client-name">
						<div className="client-img">
							<img
								src={featured.images}
								alt=""
							/>
						</div> 
						<div className="client-info">
							<h5>{featured.title}</h5>
							<p>
								{featured.address ? featured.address.slice(0, 5) : ""}...
								{featured.address ? featured.address.slice(37, 42) : ""}
							</p>
						</div>
					</div>

					<div className="update__delete">
						<button className="fa fa-trash" onClick={() => handleOpen(featured._id)}></button>
						<Link
							to={`/admin/editico/${featured._id}`}
							className="fa fa-pencil-square-o"></Link>
					</div>
				</div>
				<div className="media-btm">
					<div className="na">
						{featured.up_pool_raise}
						<span> {featured.symbol}</span>
					</div>
					<div className="radio">Ratio per 1 {featured.crypto_type}</div>
				</div>
				<div className={`battery ${full}`}>
					{num
						? progressBar.map((x) => (
							<div className="bar active" data-power="10" key={x}></div>
						))
						: ""}
				</div>
				<div className="percentage">
				{<span className="total">{number1 ? number1.toFixed(2) : "0"}%</span>}
            <span className="sfund">{allocation ? allocation.toFixed(2) : "0"}/{featured.total_supply} {featured.symbol}</span>
				</div>
			</div>

			<div className="text-center tw-btns">
				{/* <a href={`/pool_detail/featured/${featured._id}`} target="_blank" className="detail">
				details
			  </a>
			  <a href="#ff" className="coming-soon">
				FEATURED
			  </a> */}
				{/* <NavLink
									to={`/admin/transferownership/${featured._id}`}
									className="detail">
									Transfer Ownership
								</NavLink> */}
				{featured.address ? <NavLink
					to={`/admin/adduserinwhitelist/${featured._id}`}
					className="detail yellow_btn">
					Add User in White List
				</NavLink> : ""}

				{/* {featured.address ?
								<NavLink
									to={`/admin/updatetier/${featured.address}`}
									className="coming-soon">
									Update Tiers Value
								</NavLink>
								: ""} */}
				{/* {featured.address ?
								<Link
									to={`/admin/readwhitelist/${featured.address}`}
									className="coming-soon">
									Read White List
								</Link>
								: ""} */}
				{/* {featured.address ?
								<a
									href="#prepare-token"
									onClick={() => clickClaimStore(featured.address)}
									className="coming-soon">
									Prepare Claim
								</a> : ""}
							{featured.address ?
								<Link
									to="#distribute-token"
									onClick={() => clickSendToken(featured.address)}
									className="coming-soon">
									Distribute Token
								</Link>
								: ""}

							{featured.address ?
								<Link
									href="#download-csv"
									onClick={() => downloadcsv(featured.title)}
									className="coming-soon">
									download csv
								</Link> : ""} */}
				{featured.address ?
					<button
						className="coming-soon yellow_btn">
						Featured Pool
					</button> : ""}
			</div>
		</div>

			<div>
				{featured ? "" : <h2
					style={{
						color: "white",
						width: "100%",
						height: "80vh",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					No records found
				</h2>}
			</div>

			
			<div>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
					{body}
				</Modal>
			</div>
		</div>
	);
};

export default FeaturedPool;
