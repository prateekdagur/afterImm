import React, { useState } from "react";
// import Web3 from "web3";
// import { SeedifyFundsContractAbi } from "../../abis3";

// const web3 = new Web3(Web3.givenProvider);


// const contractAddr = "0x8c56736fcF9af1173C37C0912Bdd5B18A0c09fDB";

//  const SimpleContract = new web3.eth.Contract(
//  	SeedifyFundsContractAbi,
//  	contractAddr,
//  );


const TransferOwnership = () => {
		const [number, setNumber] = useState();

		// const handleSet = async (e) => {
		// 	e.preventDefault();
		// 	const accounts = await window.ethereum.enable();
		// 	const account = accounts[0];
		// 	const gas = await SimpleContract.methods
		// 		.transferOwnership(number)
		// 		.estimateGas();
		// 	const result = await SimpleContract.methods.transferOwnership(number).send({
		// 		from: account,
		// 		gas,
		// 	});
		// };

	return (
		<div>
			<div className="right-panel-main">
				<h2>Transfer Ownership</h2>
				<div className="rightpanel-form">
					<div className="form-inner">
						<div className="form-group">
							<label>New Owner Address</label>
							<input
								type="text"
								className="input-form"
								value={number}
									onChange={(e) => setNumber(e.target.value)}
								placeholder="Enter Owner Address"
							/>
						</div>
					</div>
					<div className="form-group">
						<button type="button" className="btn">
							SUBMIT
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TransferOwnership;
