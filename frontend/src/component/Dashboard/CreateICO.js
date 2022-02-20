import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { creatICO, getico } from "../../redux/actions/icoAction";
import { checkImage} from "../../utils/ico_valid";
import GlobalTypes from "../../redux/actions/GlobalTypes";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateico } from "../../redux/actions/icoAction";
import { Editor } from '@tinymce/tinymce-react';
import { useHistory } from "react-router-dom";


//create ico component to write all details from form.
const CreateICO = () => {
	const dispatch = useDispatch();

	const initialState = {
		title: "",
		total_supply: "",
		symbol: "",
		up_pool_raise: "",
		images: "",
		start_date: "",
		end_date: "",
		content: "",
		min_allocation: "",
		max_allocation: "",
		participants: "",
		swap_amount: "",
		min_swap_level: "",
		address: "",
		decimal: "",
		description: "",
		pool_type: "",
		up_pool_access: "",
		twitter_link: "",
		git_link: "",
		telegram_link: "",
		reddit_link: "",
		medium_link: "",
		browser_web_link: "",
		white_paper: "",
		token_address: "",
		abi_name: "",
		network_type: "",
		crypto_type: "",
		token_distribution_date: "",
		max_allocation_tierone: "",
		max_allocation_tiertwo: "",
		max_allocation_tierthree: "",
		max_allocation_tierfour: "",
		max_allocation_tierfive: "",
		max_allocation_tiersix: "",
		max_allocation_tierseven: "",
		max_allocation_tiereight: "",
		max_allocation_tiernine: "",
		min_allocation_tierone: "",
		min_allocation_tiertwo: "",
		min_allocation_tierthree: "",
		min_allocation_tierfour: "",
		min_allocation_tierfive: "",
		min_allocation_tiersix: "",
		min_allocation_tierseven: "",
		min_allocation_tiereight: "",
		min_allocation_tiernine: "",
		idophase: "",
		youtube: "",
		instagram: "",
		discord: "",
		fblink: "",
		contract_type: "",
		distribution_type: "",
		blockNumber : ""
	};
	const [icoData, setIcoData] = useState(initialState);
	const {
		// contract_type,
		pool_type,
		start_date,
		end_date,
		images,
		title,
		up_pool_raise,
		content,
		min_allocation,
		max_allocation,
		up_pool_access,
		participants,
		//swap_amount,
		//min_swap_level,
		symbol,
		decimal,
		address,
		total_supply,
		description,
		token_address,
		abi_name,
		twitter_link,
		git_link,
		telegram_link,
		reddit_link,
		medium_link,
		browser_web_link,
		white_paper,
		// network_type,
		crypto_type,
		token_distribution_date,
		max_allocation_tierone,
		max_allocation_tiertwo,
		max_allocation_tierthree,
		max_allocation_tierfour,
		max_allocation_tierfive,
		max_allocation_tiersix,
		max_allocation_tierseven,
		max_allocation_tiereight,
		max_allocation_tiernine,
		min_allocation_tierone,
		min_allocation_tiertwo,
		min_allocation_tierthree,
		min_allocation_tierfour,
		min_allocation_tierfive,
		min_allocation_tiersix,
		min_allocation_tierseven,
		min_allocation_tiereight,
		min_allocation_tiernine,
		idophase,
		youtube,
		instagram,
		discord,
		fblink,
		distribution_type,
		blockNumber

	} = icoData;
	const [image, setImages] = useState("");
	// const [abi, setAbi] = useState("");
	var abi = '';
	const [text, setText] = useState('')
	const [onEdit, setOnEdit] = useState(false);
	const { ico, icoid, auth } = useSelector((state) => state);
	const param = useParams();
	var id = param.id
	const history = useHistory();

	useEffect(() => {
		dispatch(getico());
	}, [dispatch]);

	useEffect(() => {
		if (id) {
			setOnEdit(true);
			if (ico.pool) {
				ico.pool.forEach((poo) => {
					if (poo._id === id) {
						setIcoData(poo);
						setText(poo.description)
					}
				});
			}
		} else {
			setOnEdit(false);
		}
	}, [id, ico.pool]);

	const handleImage = (e) => {
		const file = e.target.files[0];
		const err = checkImage(file);
		if (err)
			return dispatch({
				type: GlobalTypes.NOTIFY,
				payload: { error: err },
			});
		setImages(file);
	};
	// const handleabi = (e) => {
	// 	const abifile = e.target.files[0];
	// 	const err = checkAbi(abifile);
	// 	if (err)
	// 		return dispatch({
	// 			type: GlobalTypes.NOTIFY,
	// 			payload: { error: err },
	// 		});
	// 	setAbi(abifile);
	// };
	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setIcoData({ ...icoData, [name]: value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		if (onEdit) {
			dispatch(
				updateico(
					icoData,
					id,
					image,
					images,
					abi,
					abi_name,
					text,
					auth
				),
			);

		} else {
			dispatch(
				creatICO(
					icoData,
					image,
					abi,
					text,
					auth
				),
			)
		}
	};

	useEffect(() => {
		if (icoid.id) {
			history.push(`/admin/editico/${icoid.id}`);
		}
	}, [icoid.id, history])
	//project description editior
	const [displayModal, setDisplayModal] = useState(false);
	const handleUpdate = (value) => {
		setText(value)
	};
	return (
		<div className="container_cust">
			{
				displayModal && <div className={`Modal ${displayModal ? 'Show' : ''}`}>
					<Editor
						initialValue={description}
						value={text}
						init={{
							plugins: 'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help',
							toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
							height: 500
						}}
						onEditorChange={handleUpdate}
					/>
				</div>
			}
			<div className="right-panel-main wishlist-data">
				<h2>{onEdit ? "UPDATE IGO" : "Create IGO"}</h2>
				<form onSubmit={handleSubmit}>
					<div className="rightpanel-form">
						<h4 className="form-title">01.  IGO Details </h4>
						<div className="form-inner">
							<div className="form-group">
								<label>IGO Name</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Name"
									required
									name="title"
									value={title}
									onChange={handleChangeInput}
								/>
							</div>

							<div className="form-group">
								<label>Minimum allocation</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Min Allocation"
									name="min_allocation"
									value={min_allocation}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Maximum allocation</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Max Allocation"
									name="max_allocation"
									value={max_allocation}
									onChange={handleChangeInput}
								/>
							</div>

							{/* <div className="form-group">
								<label>Token Price in BNB/BUSD</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Price"
									required
									name="up_pool_raise"
									value={up_pool_raise}
									onChange={handleChangeInput}
								/>
							</div> */}

							<div className="form-group">
								<label>Start Date</label>
								<input
									type="text"
									className="input-date"
									placeholder="Enter Start Date"
									name="start_date"
									value={start_date}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>End Date</label>
								<input
									type="text"
									className="input-date"
									placeholder="Enter End Date"
									name="end_date"
									value={end_date}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group date-input">
								<label>Token Distribution Date</label>
								<input
									type="datetime-local"
									className="input-date"
									name="token_distribution_date"
									placeholder="Enter Token Distribution Date"
									value={token_distribution_date}
									onChange={handleChangeInput}
								/>
							</div>

							<div className="form-group">
								<label>White Paper</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter white paper link"
									name="white_paper"
									value={white_paper}
									onChange={handleChangeInput}
								/>
							</div>

							<div className="form-group">
								<label>Project Description</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Description"
									name="description"
									value={text}
									onChange={e => setText(e.target.value)}
									onClick={() => setDisplayModal(!displayModal)}
								/>
							</div>

							{/* <div className="form-group">
								<label>Min Swap Level</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Min Swap Level"
									name="min_swap_level"
									value={min_swap_level}
									onChange={handleChangeInput}
								/>
							</div> */}

							<div className="form-group">
								<label>Pool Content</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter content"
									name="content"
									value={content}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Participants</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter No. of Participants"
									name="participants"
									value={participants}
									onChange={handleChangeInput}
								/>
							</div>
							{/* <div className="form-group">
								<label>Upload Token ABI (abi.json)</label>
								<div className="upload-area">
									<input
										type="file"
										className="input-form"
										placeholder="Choose ABI"
										name="abi_name"
										onChange={handleabi}
									/>
									<p>{abi ? abi.name : ""}</p>
									<a className="upld-btn" href="#cancel">
										Upload
									</a>
								</div>
							</div> */}
							<div className="form-group">
								<label>Upload Pool logo</label>
								<div className="upload-area">
									<input
										type="file"
										className="input-form"
										placeholder="Choose logo"
										name="images"
										onChange={handleImage}
									/>
									<div className="outer-parea">
										<p>{image ? image.name : ""}</p>
									</div>
									<a className="upld-btn" href="#cancel">
										Choose Logo
									</a>
								</div>
							</div>
							<div className="form-group">
								{onEdit ? (
									<img
										// src={x ? `/img/${x}` : ""}
										src={images}
										height="70px"
										width="70px"
										alt=""
									/>
								) : (
									""
								)}
							</div>
						
							<div className="form-group">
							<label>Block Number</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter contract creation block number"
									name="blockNumber"
									value={blockNumber}
									onChange={handleChangeInput}
								/>
							</div>
						</div>

						<h4 className="form-title">02.  Token Information </h4>
						<div className="form-inner">

							<div className="form-group">
								<label>IGO Symbol</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Symbol"
									required
									name="symbol"
									value={symbol}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Token Price (e.g. 1 BNB/BUSD = 10000 XYZ) </label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Price"
									required
									name="up_pool_raise"
									value={up_pool_raise}
									onChange={handleChangeInput}
								/>
							</div>
							{/* <div className="form-group">
								<label>Swap Amount (e.g. 1 BNB = 10000 XYZ)</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Swap Amount"
									name="swap_amount"
									value={swap_amount}
									onChange={handleChangeInput}
								/>
							</div> */}


							<div className="form-group">
								<label>Total Supply</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Total Supply"
									required
									name="total_supply"
									value={total_supply}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Decimals</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Decimals"
									name="decimal"
									value={decimal}
									onChange={handleChangeInput}
								/>
							</div>

							<div className="form-group">
								<label>Token Address</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Token Address link"
									name="token_address"
									value={token_address}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Contract Address</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Address"
									name="address"
									value={address}
									onChange={handleChangeInput}
								/>
							</div>
						</div>
						<h4 className="form-title">03.  Min Allocations </h4>
						<div className="form-inner">
							<div className="form-group">
								<label>Min allocation for Tier-1</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Min allocation"
									required
									name="min_allocation_tierone"
									value={min_allocation_tierone}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Min allocation for Tier-2</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Min allocation"
									required
									name="min_allocation_tiertwo"
									value={min_allocation_tiertwo}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Min allocation for Tier-3</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Min allocation"
									required
									name="min_allocation_tierthree"
									value={min_allocation_tierthree}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Min allocation for Tier-4</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Min allocation"
									required
									name="min_allocation_tierfour"
									value={min_allocation_tierfour}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Min allocation for Tier-5</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Min allocation"
									required
									name="min_allocation_tierfive"
									value={min_allocation_tierfive}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Min allocation for Tier-6</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Min allocation"
									required
									name="min_allocation_tiersix"
									value={min_allocation_tiersix}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Min allocation for Tier-7</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Min allocation"
									required
									name="min_allocation_tierseven"
									value={min_allocation_tierseven}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Min allocation for Tier-8</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Min allocation"
									required
									name="min_allocation_tiereight"
									value={min_allocation_tiereight}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Min allocation for Tier-9</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Min allocation"
									required
									name="min_allocation_tiernine"
									value={min_allocation_tiernine}
									onChange={handleChangeInput}
								/>
							</div>
						</div>
						<h4 className="form-title">04.  Max Allocations </h4>
						<div className="form-inner">

							<div className="form-group">
								<label>Max allocation for Tier-1</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Max allocation"
									required
									name="max_allocation_tierone"
									value={max_allocation_tierone}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Max allocation for Tier-2</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Max allocation"
									required
									name="max_allocation_tiertwo"
									value={max_allocation_tiertwo}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Max allocation for Tier-3</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Max allocation"
									required
									name="max_allocation_tierthree"
									value={max_allocation_tierthree}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Max allocation for Tier-4</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Max allocation"
									required
									name="max_allocation_tierfour"
									value={max_allocation_tierfour}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Max allocation for Tier-5</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Max allocation"
									required
									name="max_allocation_tierfive"
									value={max_allocation_tierfive}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Max allocation for Tier-6</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Max allocation"
									required
									name="max_allocation_tiersix"
									value={max_allocation_tiersix}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Max allocation for Tier-7</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Max allocation"
									required
									name="max_allocation_tierseven"
									value={max_allocation_tierseven}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Max allocation for Tier-8</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Max allocation"
									required
									name="max_allocation_tiereight"
									value={max_allocation_tiereight}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Max allocation for Tier-9</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Max allocation"
									required
									name="max_allocation_tiernine"
									value={max_allocation_tiernine}
									onChange={handleChangeInput}
								/>
							</div>
						</div>

						<h4 className="form-title">05.  Social links</h4>
						<div className="form-inner">
							<div className="form-group">
								<label>Git Link</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter git link"
									name="git_link"
									value={git_link}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Telegram Link</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter telegram link"
									name="telegram_link"
									value={telegram_link}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Reddit Link</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter reddit link"
									name="reddit_link"
									value={reddit_link}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Browser Web Link</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter browser web link"
									name="browser_web_link"
									value={browser_web_link}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>YouTube Link</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter youtube link"
									name="youtube"
									value={youtube}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Facebook Link</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter facebook link"
									name="fblink"
									value={fblink}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Discord Link</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter discord link"
									name="discord"
									value={discord}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Instagram Link</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter instagram link"
									name="instagram"
									value={instagram}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Twitter Link</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter twitter link"
									name="twitter_link"
									value={twitter_link}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Medium Link</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter medium link"
									name="medium_link"
									value={medium_link}
									onChange={handleChangeInput}
								/>
							</div>
						</div>
						<h4 className="form-title">06.  Other Details </h4>
						<div className="form-inner">
							<div className="form-group">
								<label>Crypto Type</label>
								<select
									className="input-select"
									name="crypto_type"
									value={crypto_type}
									onChange={handleChangeInput}>
									<option
										className="ico___dropdown"
										value=""
										disabled="disabled"
										required>
										Select acceptance currency
									</option>
									<option className="ico___dropdown">BUSD</option>
									<option className="ico___dropdown">BNB</option>
								</select>
							</div>
							<div className="form-group">
								<label>Phase Type</label>
								<select
									className="input-select"
									name="idophase"
									value={idophase}
									onChange={handleChangeInput}>
									<option
										className="ico___dropdown"
										value=""
										disabled="disabled"
										required>
										Select Phase Type
									</option>
									<option className="ico___dropdown">1ST PHASE</option>
									<option className="ico___dropdown">2ND PHASE</option>
								</select>
							</div>
							<div className="form-group">
								<label>Pool Access Type</label>
								<select
									className="input-select"
									name="up_pool_access"
									value={up_pool_access}
									onChange={handleChangeInput}>
									<option
										className="ico___dropdown"
										value=""
										disabled="disabled"
										required>
										Select Pool Type
									</option>
									<option className="ico___dropdown">Public</option>
									<option className="ico___dropdown">Private</option>
								</select>
							</div>
							{/* <div className="form-group">
								<label>Network Type</label>
								<select
									className="input-select"
									name="network_type"
									value={network_type}
									onChange={handleChangeInput}>
									<option
										className="ico___dropdown"
										value=""
										disabled="disabled"
										required>
										Select Network Type
									</option>
									<option className="ico___dropdown">ETHEREUM</option>
									<option className="ico___dropdown">BSC</option>
								</select>
							</div> */}
							<div className="form-group">
								<label>Pool Type</label>
								<select
									className="input-select"
									name="pool_type"
									value={pool_type}
									onChange={handleChangeInput}>
									<option
										className="ico___dropdown"
										value=""
										disabled="disabled"
										required>
										Select Pool Type
									</option>
									<option className="ico___dropdown">upcomming</option>
									<option className="ico___dropdown">featured</option>
									<option className="ico___dropdown">completed</option>
								</select>
							</div>
							<div className="form-group">
								<label>Distribution Type</label>
								<select
									className="input-select"
									name="distribution_type"
									value={distribution_type}
									onChange={handleChangeInput}>
									<option
										className="ico___dropdown"
										value=""
										disabled="disabled"
									>
										Select Distribution Type
									</option>
									<option className="ico___dropdown">BSC_BASED</option>
									<option className="ico___dropdown">SOLANA_BASED</option>
								</select>
							</div>

						</div>
						<div className="form-group">
							<button type="submit" className="crt-ico">
								{onEdit ? "UPDATE" : "Create IGO"}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
export default CreateICO;


