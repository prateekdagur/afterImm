import React, { useState, useEffect } from "react";
import { deploynewcontract } from "../../redux/actions/icoAction";
import { useSelector, useDispatch } from "react-redux";
import { VIEW_CONTRACT } from "../../utils/config"


const DeployNewICO = () => {
	const [tx, setTx] = useState('');
	const initialState = {
		contractName: "",
		maxCap: "",
		startSale: "",
		endSale: "",
		numberOfUsers: "",
		phaseNo: "",
	};
	const [contractData, setContractData] = useState(initialState);
	const {
		contractName,
		maxCap,
		startSale,
		endSale,
		numberOfUsers,
		phaseNo
	} = contractData;
	const { auth, ico } = useSelector(state => state)
	const dispatch = useDispatch();

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setContractData({ ...contractData, [name]: value });
	};
	const handleDeploy = (e) => {
		e.preventDefault();
		dispatch(deploynewcontract(contractData, auth))
	}


	useEffect(() => {
		if (ico.receipt) {
			setTx(ico.receipt)

		}
	}, [ico.receipt]);


	return (
		<div className="container_cust">
			<div className="right-panel-main wishlist-data">
				<h2>Deploy New Contract</h2>
				<form onSubmit={handleDeploy}>
					<div className="rightpanel-form">
						<h4 className="form-title">01.  Contract Details </h4>
						<div className="form-inner">
							<div className="form-group">
								<label>Contract Name</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Contract Name"
									required
									name="contractName"
									value={contractName}
									onChange={handleChangeInput}
								/>
							</div>


							<div className="form-group">
								<label>Enter Max Cap of Contract</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Max Cap"
									required
									name="maxCap"
									value={maxCap}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Start Sale</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter StartSale"
									required
									name="startSale"
									value={startSale}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>End Sale</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter EndSale"
									required
									name="endSale"
									value={endSale}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group date-input">
								<label>Max User</label>
								<input
									type="text"
									className="input-form"
									name="numberOfUsers"
									placeholder="Enter Max User"
									required
									value={numberOfUsers}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group date-input">
								<label>Phase Number</label>
								<input
									type="text"
									className="input-form"
									name="phaseNo"
									placeholder="Enter Phase Number"
									required
									value={phaseNo}
									onChange={handleChangeInput}
								/>
							</div>
						</div>

						<div className="form-group">
							<button type="submit" className="crt-ico">
								Deploy Contract
							</button>
						</div>
					</div>
				</form>


			</div>
			{tx ? <a href={`${VIEW_CONTRACT}tx/${tx.transactionHash}`} target="_blank" rel="noreferrer" className="crt-ico">View Contract on BSC</a> : ""}
			{tx ? <><h5 style={{ color: "#7BF5FB" }}>BlockNumber : {tx.blockNumber}</h5>
				<h5 style={{ color: "#7BF5FB" }}>ContractAddress : {tx.contractAddress}</h5></> : ""}

		</div >
	);
};

export default DeployNewICO;