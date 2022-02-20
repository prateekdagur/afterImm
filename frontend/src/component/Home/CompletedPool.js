import "./FeaturedPool.css";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Modal from "@material-ui/core/Modal";
import { Link } from 'react-router-dom'
import  SeedifyFundsContractAbi  from "../abis.json";

import "./Pool.css";
import BusdIDOabi from "../busdIDO.json";

//web3 provider.
const web3 = new Web3(
	new Web3.providers.HttpProvider(
		"https://bsc-dataseed.binance.org/",
	),
);

//featured pool
const CompletedPool = ({ pool }) => {
	const [number2, setNumber2] = useState();
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
			  let totalTokenFxn = pool.crypto_type === "BUSD" ? "totalBUSDReceivedInAllTier" : "totalBnbReceivedInAllTier";

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
	  }, [contractAddr, pool.crypto_type]);
	
	  useEffect(() => {
		setInterval(async function () {
		  //Consuming smart contract ABI and contract address.
		  if (contractAddr) {
			const SimpleContract = new web3.eth.Contract(
				pool.crypto_type === "BUSD"
				? BusdIDOabi
				: SeedifyFundsContractAbi,
	
			  contractAddr
			);
			//Getting total bnb from blockchain
			let totalTokenFxn = pool.crypto_type === "BUSD" ? "totalBUSDReceivedInAllTier" : "totalBnbReceivedInAllTier";

			const result = await SimpleContract.methods[totalTokenFxn]().call() 
			//Getting max cap from blockchain
			const total = await SimpleContract.methods.maxCap().call();
			setNumber2(result / 10 ** 18);
			setNumber1((result / 10 ** 18 / (total / 10 ** 18)) * 100);
		  }
		}, 20000);
	  }, [contractAddr, pool.crypto_type]);

	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	if (pool.content) {
		var length = pool.content.length
		if (length > 210) {
			length = 1;
		} else {
			length = 0;
		}
	}
	if (pool.title) {
		var title_length = pool.title.length
		if (title_length >= 20) {
			title_length = 1;
		} else {
			title_length = 0;
		}
	}
	const body = (
		<div className="paper">
			<div className="paper-inner">
			<div className="paper-head">
			<h2 className="paper_h2" id="simple-modal-title">Read More</h2>
			<span onClick={handleClose}><i class="fa fa-times" aria-hidden="true"></i></span>
		</div>
			<p>{pool.content}</p>
		</div>
		</div>
	);
	var num = Math.ceil(number1 / 2)
	var full = "";
	if (num === 50) {
		full = 'fullupload'
	}

	var phase_type = '';
	if(pool.idophase){
		if(pool.idophase.split(' ')[0] === '1st'){
			phase_type = 'firstphase'
		}
		if(pool.idophase.split(' ')[0] ==='2ND'){
			phase_type = 'secondphase'
		}
		if(pool.idophase.split(' ')[0] === '3RD'){
			phase_type = 'thirdphase'
		}
	}
	var allocation = number2 * pool.up_pool_raise;
	return (
		<div className="pool_card">
			<div className="pool-link">

				<div className="tit_le">
					<div className="title-img">
						<Link
							key={pool._id}
							to={`/pool_detail/featured/${pool._id}`}>
							<img className="image_circle" src={pool.images} alt="" />
						</Link>
						{pool.idophase ?
							<div className={`phase ${phase_type}`}>
								<p>{pool.idophase}</p>
							</div>
							: ""}
					</div>
					<div className="title-head">
						<h3>
							<div className="h-title">
								<Link
									key={pool._id}
									to={`/pool_detail/featured/${pool._id}`}>
									{title_length ? pool.title.substring(0, 20) + "..." : pool.title}
								</Link>
							</div>
							<span>
								1 {pool.crypto_type === "BUSD" ? "BUSD" : "BNB"} ={" "}
								{pool.up_pool_raise} {pool.symbol}
							</span>
						</h3>
						<div className="title-info">
							<p>
								{length ? pool.content.substring(0, 170) : pool.content}{length ? "..." : ""}{length ? <a href="#read-more" onClick={handleOpen}> Read More</a> : ""}
							</p>
						</div>
					</div>
				</div>
				<div className="title-head-mob">
					<h3>
						<div className="h-title">
							<Link
								key={pool._id}
								to={`/pool_detail/featured/${pool._id}`}>
								{title_length ? pool.title.substring(0, 20) + "..." : pool.title}
							</Link>
						</div>
					</h3>
					<div className="title-info">
						<p>
							{length ? pool.content.substring(0, 170) : pool.content}{length ? "..." : ""}{length ? <a href="#read-more" onClick={handleOpen}> Read More</a> : ""}
						</p>
					</div>
				</div>

			</div>
			<div className="center-bg"></div>
			<div className="home-progress">
				<div className="raise-three">
					<div className="raise">
						<p className="total_raise">Total Raise</p>
						<h2>
							{number2 ? number2.toFixed(2) : "0"}{" "}
							{pool.crypto_type === "BUSD" ? "BUSD" : "BNB"}
						</h2>
					</div>
					<div className="allocation">
						<div>
							<p className="feature_max">Maximum</p>
							<h3>{pool.max_allocation ? pool.max_allocation + (pool.crypto_type === "BUSD" ? " BUSD" : " BNB") : "TBA"}</h3>
						</div>
						<div>
							<p className="feature_max">Access</p>
							<h3>{pool.up_pool_access}</h3>
						</div>
					</div>
				</div>
				<div className="prog_bar">
					<div className="prog_bar_grd">
						<span className="prog">Progress</span>
						<span className="parti">
							Max Participants <span className="white_text">{pool.participants}</span>
						</span>
					</div>

					<div class={`battery ${full}`}>
						{num ?
							[...Array(num)].map(() => (
								<div className='bar active' data-power='10'></div>
							)) : ""
						}

					</div>
					<div className="prog_bar_grd">
						{<span className="prog _percent">{number1 ? number1.toFixed(2) : "0"}%</span>}
						{
							<span className="parti _nls">
								{allocation ? allocation.toFixed(2) : "0"}/{pool.total_supply} {pool.symbol}
							</span>
						}
					</div>
				</div>
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
	);
};

export default CompletedPool;
