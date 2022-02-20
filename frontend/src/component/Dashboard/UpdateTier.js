import React, { useState, useEffect } from "react";
import { updatetier, updatesalestart, updatesaleend, updatepaused, updateunpaused, updateconfig, updatemaxcap } from "../../redux/actions/icoAction";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/API";



//update tier component
const UpdateTier = () => {
	const [pool, setPool] = useState('');
	const [id, setId] = useState('');
	const [ID, setID] = useState('');
	const [pool_id, setPool_id] = useState('');
	const [paused_id, setPaused_id] = useState('');
	const [unpaused_id, setunPaused_id] = useState('');
	const [gas, setGas] = useState("")
	const [gasPrice, setGasPrice] = useState("");
	const [configid, setConfigid] = useState("");
	const [maxCap, setMaxCap] = useState("");
	const [maxcap_id, setMaxCap_id] = useState("");

	const [startSale, setStartSale] = useState('');
	const [endSale, setEndSale] = useState('');
	const initialState = {
		tiers: "",
		maxtiercap: "",
		minusercap: "",
		maxusercap: "",
		numberOfUsers: "",
	};
	const [contractData, setContractData] = useState(initialState);
	const {
		tiers,
		maxtiercap,
		minusercap,
		maxusercap,
		numberOfUsers,
	} = contractData;
	const { auth } = useSelector(state => state)
	const dispatch = useDispatch();

	useEffect(() => {
		// Getting res from backend api and setting to the setPool .
		getDataAPI("dropdowncontract").then((res) => setPool(res.data.upc_pool));
		getDataAPI("getconfig").then((res) => setConfigid(res.data[0]._id) & setGasPrice(res.data[0].gasPrice) & setGas(res.data[0].gas));

	}, []);

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setContractData({ ...contractData, [name]: value });
	};
	const handleDeploy = (e) => {
		e.preventDefault();
		dispatch(updatetier(id, contractData, auth))
	}
	const updateSaleStart = () => {
		dispatch(updatesalestart(ID, startSale, auth))
	}

	const updateSaleEnd = () => {
		dispatch(updatesaleend(pool_id, endSale, auth))
	}

	const paused = () => {
		dispatch(updatepaused(paused_id, auth))
	}

	const unpaused = () => {
		dispatch(updateunpaused(unpaused_id, auth))
	}

	const updateConfig = () => {
		dispatch(updateconfig(configid, gas, gasPrice, auth))
	}

	const updateMaxCap = () => {
		dispatch(updatemaxcap(maxcap_id, maxCap, auth))
	}
	
	return (
		<div className="container_cust">
			<div className="right-panel-main wishlist-data">
				<h2>Update Contract</h2>
				<form onSubmit={handleDeploy}>
					<div className="rightpanel-form">
						<h4 className="form-title">01. Update Tier  </h4>
						<div className="form-inner">
							<div className="form-group">
								<label>IGO</label>
								<select
									className="input-select"
									name="up_pool_access"

									onChange={(e) => setId(e.target.value)}>
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
							</div>
							<div className="form-group">
								<label>TIERS</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Tiers"
									required
									name="tiers"
									value={tiers}
									onChange={handleChangeInput}
								/>
							</div>

							<div className="form-group">
								<label>MAX TIER CAP</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Max Tier Cap"
									required
									name="maxtiercap"
									value={maxtiercap}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>MIN USER CAP</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Min User Cap"
									required
									name="minusercap"
									value={minusercap}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>MAX USER CAP</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Max User Cap"
									required
									name="maxusercap"
									value={maxusercap}
									onChange={handleChangeInput}
								/>
							</div>


							<div className="form-group date-input">
								<label>MAX USER</label>
								<input
									type="text"
									className="input-form"
									name="numberOfUsers"
									placeholder="Enter Max User"
									value={numberOfUsers}
									onChange={handleChangeInput}
								/>
							</div>
						</div>

						<div className="form-group">
							<button type="submit" className="crt-ico">
								UPDATE
							</button>
						</div>
					</div>
				</form>

				{/* UPDATE SALE START TIME */}

				<div style={{ paddingTop: 40 }}>
					<div className="rightpanel-form">
						<h4 className="form-title">02. Update Sale Start Time </h4>
						<div className="form-inner">
							<div className="form-group">
								<label>IGO</label>
								<select
									className="input-select"
									name="updatesaletime"

									onChange={(e) => setID(e.target.value)}>
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
							</div>
							<div className="form-group">
								<label>Sale Start</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Sale Start Timestamp"
									required
									name="startSale"
									value={startSale}
									onChange={(e) => setStartSale(e.target.value)}
								/>
							</div>



						</div>

						<div className="form-group">
							<button type="submit" onClick={() => updateSaleStart()} className="crt-ico">
								UPDATE
							</button>
						</div>
					</div>
				</div>

				{/* UPDATE SALE END TIME */}

				<div style={{ paddingTop: 40 }}>
					<div className="rightpanel-form">
						<h4 className="form-title">03. Update Sale End Time  </h4>
						<div className="form-inner">
							<div className="form-group">
								<label>IGO</label>
								<select
									className="input-select"
									name="updatesaletime"

									onChange={(e) => setPool_id(e.target.value)}>
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
							</div>

							<div className="form-group">
								<label>Sale End</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Sale End Timestamp"
									required
									name="endSale"
									value={endSale}
									onChange={(e) => setEndSale(e.target.value)}
								/>
							</div>

						</div>

						<div className="form-group">
							<button type="submit" onClick={() => updateSaleEnd()} className="crt-ico">
								UPDATE
							</button>
						</div>
					</div>
				</div>

				{/* UPDATE Max Cap */}

				<div style={{ paddingTop: 40 }}>
					<div className="rightpanel-form">
						<h4 className="form-title">04. Update Max Cap  </h4>
						<div className="form-inner">
							<div className="form-group">
								<label>IGO</label>
								<select
									className="input-select"
									name="updatesaletime"
									onChange={(e) => setMaxCap_id(e.target.value)}>
									<option
										className="ico___dropdown"
										value=""

										required>
										Select IGO
									</option>
									{pool ? pool.map((p) => (
										<option className="ico___dropdown" key={p._id} value={p._id}>{p.title} {p.idophase} ({p.up_pool_access})</option>
									))
										: ""}

								</select>
							</div>

							<div className="form-group">
								<label>MaxCap</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Max Cap"
									required
									name="maxCap"
									value={maxCap}
									onChange={(e) => setMaxCap(e.target.value)}
								/>
							</div>

						</div>

						<div className="form-group">
							<button type="submit" onClick={() => updateMaxCap()} className="crt-ico">
								UPDATE
							</button>
						</div>
					</div>
				</div>


				{/* UPDATE CONTRACT STATUS*/}

				<div style={{ paddingTop: 40 }}>
					<div className="rightpanel-form">
						<h4 className="form-title">05. Pause Contract</h4>
						<div className="form-inner">
							<div className="form-group">
								<label>IGO</label>
								<select
									className="input-select"
									name="updatepaused"

									onChange={(e) => setPaused_id(e.target.value)}>
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
							</div>

						</div>

						<div className="form-group">
							<button type="submit" onClick={() => paused()} className="crt-ico">
								PAUSED
							</button>
						</div>
					</div>
				</div>

				{/* UPDATE CONTRACT STATUS*/}

				<div style={{ paddingTop: 40 }}>
					<div className="rightpanel-form">
						<h4 className="form-title">06. Unpause Contract </h4>
						<div className="form-inner">
							<div className="form-group">
								<label>IGO</label>
								<select
									className="input-select"
									name="updateUNpaused"

									onChange={(e) => setunPaused_id(e.target.value)}>
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
							</div>

						</div>

						<div className="form-group">
							<button type="submit" onClick={() => unpaused()} className="crt-ico">
								UNPAUSED
							</button>
						</div>
					</div>
				</div>


				<div style={{ paddingTop: 40 }}>
					<div className="rightpanel-form">
						<h4 className="form-title">07. Update Gas </h4>
						<div className="form-inner">
						<div className="form-group">
								<label>Gas</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Gas"
									name="gas"
									value={gas}
									onChange={(e) => setGas(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label>Gas Price</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Gas Price"
									required
									name="gasPrice"
									value={gasPrice}
									onChange={(e) => setGasPrice(e.target.value)}
								/>
							</div>
							</div>
						<div className="form-group">
							<button type="submit" onClick={() => updateConfig()} className="crt-ico">
								UPDATE
							</button>
						</div>
					</div>
				</div>

			</div>

		</div >
	);
};

export default UpdateTier;
