import React, { useState } from "react";
import Web3 from "web3";
import { SeedifyFundsContractAbi } from "../../abis3";
import { useParams } from "react-router-dom";

const web3 = new Web3(Web3.givenProvider);

//for reading white list addresses whether addresses are uploaded on blockchain or not.
const ReadWhiteList = () => {
	var contractAddr = useParams().address.toUpperCase()
	const simpleContract = new web3.eth.Contract(
		SeedifyFundsContractAbi,
		contractAddr,
	);
	const [addressOne, getAddressOne] = useState();
	const [getResultOne, setResultOne] = useState();
	const [addressTwo, getAddressTwo] = useState();
	const [getResultTwo, setResultTwo] = useState();
	const [addressThree, getAddressThree] = useState();
	const [getResultThree, setResultThree] = useState();
	const [addressFour, getAddressFour] = useState();
	const [getResultFour, setResultFour] = useState();
	const [addressFive, getAddressFive] = useState();
	const [getResultFive, setResultFive] = useState();
	const [addressSix, getAddressSix] = useState();
	const [getResultSix, setResultSix] = useState();
	const [addressSeven, getAddressSeven] = useState();
	const [getResultSeven, setResultSeven] = useState();
	const [addressEight, getAddressEight] = useState();
	const [getResultEight, setResultEight] = useState();
	const [addressNine, getAddressNine] = useState();
	const [getResultNine, setResultNine] = useState();
	const [whitelistCheckOne, setWhitelistCheckOne] = useState('')
	const [whitelistCheckTwo, setWhitelistCheckTwo] = useState('')
	const [whitelistCheckThree, setWhitelistCheckThree] = useState('')
	const [whitelistCheckFour, setWhitelistCheckFour] = useState('')
	const [whitelistCheckFive, setWhitelistCheckFive] = useState('')
	const [whitelistCheckSix, setWhitelistCheckSix] = useState('')
	const [whitelistCheckSeven, setWhitelistCheckSeven] = useState('')
	const [whitelistCheckEight, setWhitelistCheckEight] = useState('')
	const [whitelistCheckNine, setWhitelistCheckNine] = useState('')

	//Read white list component
	const handleWhitelistOne = async () => {
		const resultOne = await simpleContract.methods.getWhitelistOne(addressOne).call();
		setResultOne(resultOne);
		if (resultOne) {
			setWhitelistCheckOne("True")
		} else {
			setWhitelistCheckOne("False")
		}
	};

	const handleWhitelistTwo = async () => {
		const resultTwo = await simpleContract.methods.getWhitelistTwo(addressTwo).call();
		setResultTwo(resultTwo);
		if (resultTwo) {
			setWhitelistCheckTwo("True")
		} else {
			setWhitelistCheckTwo("False")
		}
	};

	const handleWhitelistThree = async () => {
		const resultThree = await simpleContract.methods.getWhitelistThree(addressThree).call();
		setResultThree(resultThree);
		if (resultThree) {
			setWhitelistCheckThree("True")
		} else {
			setWhitelistCheckThree("False")
		}
	};

	const handleWhitelistFour = async () => {
		const resultFour = await simpleContract.methods.getWhitelistFour(addressFour).call();
		setResultFour(resultFour);
		if (resultFour) {
			setWhitelistCheckFour("True")
		} else {
			setWhitelistCheckFour("False")
		}
	};

	const handleWhitelistFive = async () => {
		const resultFive = await simpleContract.methods.getWhitelistFive(addressFive).call();
		setResultFive(resultFive);
		if (resultFive) {
			setWhitelistCheckFive("True")
		} else {
			setWhitelistCheckFive("False")
		}
	};

	const handleWhitelistSix = async () => {
		const resultSix = await simpleContract.methods.getWhitelistSix(addressSix).call();
		setResultSix(resultSix);
		if (resultSix) {
			setWhitelistCheckSix("True")
		} else {
			setWhitelistCheckSix("False")
		}
	};

	const handleWhitelistSeven = async () => {
		const resultSeven = await simpleContract.methods.getWhitelistSeven(addressSeven).call();
		setResultSeven(resultSeven);
		if (resultSeven) {
			setWhitelistCheckSeven("True")
		} else {
			setWhitelistCheckSeven("False")
		}
	};

	const handleWhitelistEight = async () => {
		const resultEight = await simpleContract.methods.getWhitelistEight(addressEight).call();
		setResultEight(resultEight);
		if (resultEight) {
			setWhitelistCheckEight("True")
		} else {
			setWhitelistCheckEight("False")
		}
	}; 

	const handleWhitelistNine = async () => {
		const resultNine = await simpleContract.methods.getWhitelistNine(addressNine).call();
		setResultNine(resultNine);
		if (resultNine) {
			setWhitelistCheckNine("True")
		} else {
			setWhitelistCheckNine("False")
		}
	};

	return (
		<div>
			<div className="right-panel-main">
				<h2>Read White List</h2>
				<div className="rightpanel-form">
					<div className="form-inner">
						<div className="form-group">
							<label>Get White LIst One</label>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<input
									type="text"
									className="input-form"
									onChange={(e) => getAddressOne(e.target.value)}
									placeholder="Enter value"
								/>

								<button onClick={handleWhitelistOne} type="button" className="bttn">
									QUERY
								</button>
								<div>
									<h3 style={{ paddingLeft: 20, color: "white" }}>
										{getResultOne ? whitelistCheckOne : whitelistCheckOne}
									</h3>
								</div>
							</div>
						</div>
					</div>

					<div className="form-inner">
						<div className="form-group">
							<label>Get White LIst Two</label>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<input
									type="text"
									className="input-form"
									onChange={(e) => getAddressTwo(e.target.value)}
									placeholder="Enter value"
								/>

								<button onClick={handleWhitelistTwo} type="button" className="bttn">
									QUERY
								</button>
								<div>
									<h3 style={{ paddingLeft: 20, color: "white" }}>
										{getResultTwo ? whitelistCheckTwo : whitelistCheckTwo}
									</h3>
								</div>
							</div>
						</div>
					</div>

					<div className="form-inner">
						<div className="form-group">
							<label>Get White LIst Three</label>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<input
									type="text"
									className="input-form"
									onChange={(e) => getAddressThree(e.target.value)}
									placeholder="Enter value"
								/>

								<button onClick={handleWhitelistThree} type="button" className="bttn">
									QUERY
								</button>
								<div>
									<h3 style={{ paddingLeft: 20, color: "white" }}>
										{getResultThree ? whitelistCheckThree : whitelistCheckThree}
									</h3>
								</div>
							</div>
						</div>
					</div>

					<div className="form-inner">
						<div className="form-group">
							<label>Get White List Four</label>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<input
									type="text"
									className="input-form"
									onChange={(e) => getAddressFour(e.target.value)}
									placeholder="Enter value"
								/>

								<button onClick={handleWhitelistFour} type="button" className="bttn">
									QUERY
								</button>
								<div>
									<h3 style={{ paddingLeft: 20, color: "white" }}>
										{getResultFour ? whitelistCheckFour : whitelistCheckFour}
									</h3>
								</div>
							</div>
						</div>
					</div>

					<div className="form-inner">
						<div className="form-group">
							<label>Get White List Five</label>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<input
									type="text"
									className="input-form"
									onChange={(e) => getAddressFive(e.target.value)}
									placeholder="Enter value"
								/>

								<button onClick={handleWhitelistFive} type="button" className="bttn">
									QUERY
								</button>
								<div>
									<h3 style={{ paddingLeft: 20, color: "white" }}>
										{getResultFive ? whitelistCheckFive : whitelistCheckFive}
									</h3>
								</div>
							</div>
						</div>
					</div>

					<div className="form-inner">
						<div className="form-group">
							<label>Get White List Six</label>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<input
									type="text"
									className="input-form"
									onChange={(e) => getAddressSix(e.target.value)}
									placeholder="Enter value"
								/>

								<button onClick={handleWhitelistSix} type="button" className="bttn">
									QUERY
								</button>
								<div>
									<h3 style={{ paddingLeft: 20, color: "white" }}>
										{getResultSix ? whitelistCheckSix : whitelistCheckSix}
									</h3>
								</div>
							</div>
						</div>
					</div>

					<div className="form-inner">
						<div className="form-group">
							<label>Get White List Seven</label>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<input
									type="text"
									className="input-form"
									onChange={(e) => getAddressSeven(e.target.value)}
									placeholder="Enter value"
								/>

								<button onClick={handleWhitelistSeven} type="button" className="bttn">
									QUERY
								</button>
								<div>
									<h3 style={{ paddingLeft: 20, color: "white" }}>
										{getResultSeven ? whitelistCheckSeven : whitelistCheckSeven}
									</h3>
								</div>
							</div>
						</div>
					</div>

					<div className="form-inner">
						<div className="form-group">
							<label>Get White List Eight</label>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<input
									type="text"
									className="input-form"
									onChange={(e) => getAddressEight(e.target.value)}
									placeholder="Enter value"
								/>

								<button onClick={handleWhitelistEight} type="button" className="bttn">
									QUERY
								</button>
								<div>
									<h3 style={{ paddingLeft: 20, color: "white" }}>
										{getResultEight ? whitelistCheckEight : whitelistCheckEight}
									</h3>
								</div>
							</div>
						</div>
					</div>

					<div className="form-inner">
						<div className="form-group">
							<label>Get White List Nine</label>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<input
									type="text"
									className="input-form"
									onChange={(e) => getAddressNine(e.target.value)}
									placeholder="Enter value"
								/>

								<button onClick={handleWhitelistNine} type="button" className="bttn">
									QUERY
								</button>
								<div>
									<h3 style={{ paddingLeft: 20, color: "white" }}>
										{getResultNine ? whitelistCheckNine : whitelistCheckNine}
									</h3>
								</div>
							</div>
						</div>
					</div>
                </div>
			</div>
		</div>
	);
};

export default ReadWhiteList;
