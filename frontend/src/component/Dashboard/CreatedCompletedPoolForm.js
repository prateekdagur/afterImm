import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { creatcompletedpool, updatecompletedpool, getcompletedbyid } from "../../redux/actions/completedPoolAction";
import { checkImage } from "../../utils/ico_valid";
import GlobalTypes from "../../redux/actions/GlobalTypes";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Editor } from '@tinymce/tinymce-react';
import { useHistory } from "react-router-dom";


//create ico component to write all details from form.
const CreateICO = () => {
	const dispatch = useDispatch();

	const initialState = {
		title: "",
		total_supply: "",
		symbol: "",
		token_address: "",
		phase_one_id: "",
		phase_two_id: "",
		//phase_three_id: "",
		up_pool_raise: "",
		images: "",
		content: "",
		min_allocation: "",
		max_allocation: "",
		participants: "",
		min_swap_level: "",
		decimal: "",
		description: "",
		up_pool_access: "",
		twitter_link: "",
		git_link: "",
		telegram_link: "",
		reddit_link: "",
		medium_link: "",
		browser_web_link: "",
		white_paper: "",
		crypto_type: "",
		token_distribution_date: "",
		idophase: "",
		youtube: "",
		instagram: "",
		discord: "",
		total_raised: "",
		allocation: "",
		fblink: "",
	};
	const [icoData, setIcoData] = useState(initialState);
	const {
		images,
		title,
		up_pool_raise,
		content,
		token_address,
		phase_one_id,
		phase_two_id,
		//phase_three_id,
		min_allocation,
		max_allocation,
		up_pool_access,
		participants,
		//min_swap_level,
		symbol,
		decimal,
		total_supply,
		description,
		twitter_link,
		git_link,
		telegram_link,
		reddit_link,
		medium_link,
		browser_web_link,
		white_paper,
		crypto_type,
		token_distribution_date,
		youtube,
		instagram,
		discord,
		total_raised,
		allocation,
		fblink
	} = icoData;
	const [image, setImages] = useState("");
	const [text, setText] = useState('')
	const [onEdit, setOnEdit] = useState(false);
	const { auth, completedpoolredcr, completedidredcr } = useSelector((state) => state);
	const param = useParams();
	var id = param.id
	const history = useHistory();

	useEffect(() => {
		if (id) {
			dispatch(getcompletedbyid(id));
		}
	}, [id, dispatch]);

	useEffect(() => {
		if (id) {
			setOnEdit(true);
			if (completedpoolredcr.completedpool) {
				setIcoData(completedpoolredcr.completedpool);
				setText(completedpoolredcr.completedpool.description)
			}
		} else {
			setOnEdit(false);
		}
	}, [id, completedpoolredcr.completedpool]);

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

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setIcoData({ ...icoData, [name]: value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		if (onEdit) {
			dispatch(
				updatecompletedpool(
					icoData,
					id,
					image,
					images,
					text,
					auth
				),
			);

		} else {
			dispatch(
				creatcompletedpool(
					icoData,
					image,
					text,
					auth
				),
			)
		}
	};

	useEffect(() => {
		if (completedidredcr.id) {
			history.push(`/admin/updatecompletedpool/${completedidredcr.id}`);
		}
	}, [completedidredcr.id, history])
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
								<label>Pool Content</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter content"
									required
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
									required
									name="participants"
									value={participants}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Project Description</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Description"
									required
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
							</div>
							 */}

							<div className="form-group date-input">
								<label>Token Distribution Date</label>
								<input
									type="datetime-local"
									className="input-date"
									name="token_distribution_date"
									placeholder="Enter Start Date"
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
								<label>Total Raised</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter total raised"
									name="total_raised"
									value={total_raised}
									onChange={handleChangeInput}
								/>
							</div>
						
							
							<div className="form-group">
								<label>Phase 1st</label>
								<input
									type="text"
									className="input-form"
									placeholder="id"
									name="phase_one_id"
									value={phase_one_id}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="form-group">
								<label>Phase 2nd</label>
								<input
									type="text"
									className="input-form"
									placeholder="id"
									name="phase_two_id"
									value={phase_two_id}
									onChange={handleChangeInput}
								/>
							</div>
							{/* <div className="form-group">
								<label>Phase 3rd</label>
								<input
									type="text"
									className="input-form"
									placeholder="id"
									name="phase_three_id"
									value={phase_three_id}
									onChange={handleChangeInput}
								/>
							</div> */}
							<div className="form-group">
								<label>Upload Pool logo</label>
								<div className="upload-area">
									<input
										type="file"
										className="input-form"
										placeholder="Enter Project Team"
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

					</div>

					<h4 className="form-title">02.  Token Information</h4>
					<div className="form-inner">
					<div className="form-group">
								<label>Token Price (e.g. 1 BNB/BUSD = 10000 XYZ)</label>
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
								<label>Decimals</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter Decimals"
									required
									name="decimal"
									value={decimal}
									onChange={handleChangeInput}
								/>
							</div>
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
								<label>Token Address</label>
								<input
									type="text"
									className="input-form"
									placeholder="Enter token address"
									name="token_address"
									value={token_address}
									onChange={handleChangeInput}
								/>
							</div>
                  </div>

					<h4 className="form-title">03.  Allocations </h4>
					<div className="form-inner">
						<div className="form-group">
							<label>Distributed Tokens Allocation</label>
							<input
								type="text"
								className="input-form"
								placeholder="Enter total allocated tokens"
								name="allocation"
								value={allocation}
								onChange={handleChangeInput}
							/>
						</div>
						<div className="form-group">
							<label>Min Allocation</label>
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
							<label>Max Allocation</label>
							<input
								type="text"
								className="input-form"
								placeholder="Enter Max Allocation"
								name="max_allocation"
								value={max_allocation}
								onChange={handleChangeInput}
							/>
						</div>
					</div>

					<h4 className="form-title">04.  Social links </h4>
					<div className="form-inner">
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

					</div>
					<h4 className="form-title">05.  Other Details</h4>
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
										Select Pool Access Type
									</option>
									<option className="ico___dropdown">Private</option>
									<option className="ico___dropdown">Public</option>
								</select>
							</div>
						</div>
					<div className="form-group">
						<button type="submit" className="crt-ico">
							{onEdit ? "UPDATE" : "Create"}
						</button>
					</div>
					</div>
				</form>
		</div>
		</div >
	);
};
export default CreateICO;
