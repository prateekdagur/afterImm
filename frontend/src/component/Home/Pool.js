import React, { useState, memo } from "react";
import "./Pool.css";
import Modal from "@material-ui/core/Modal";
import { Link } from 'react-router-dom'

//pool component to set the information inside particular pool.
const Pool = ({ pool }) => {
	if (pool.time_duration < 0) {
		var startcheck = 0;
	} else {
		startcheck = 1;
	}
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

	var phase_type = '';
	if (pool.idophase) {
		if (pool.idophase.split(' ')[0] === '1st') {
			phase_type = 'firstphase'
		}
		if (pool.idophase.split(' ')[0] === '2ND') {
			phase_type = 'secondphase'
		}
		if (pool.idophase.split(' ')[0] === '3RD') {
			phase_type = 'thirdphase'
		}
	}
	return (	
			
		<div className="pool_card">		
			
			<div className="pool-link">

				<div className="tit_le">
					<div className="title-img">
						<Link key={pool._id} to={`/pool_detail/upcoming/${pool._id}`}>
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
								<Link key={pool._id} to={`/pool_detail/upcoming/${pool._id}`}>
									{title_length ? pool.title.substring(0, 20) + "..." : pool.title}
								</Link>
							</div>

							{startcheck ? <span>In {pool.time_duration} days</span> : <span>TBA</span>}
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
							<Link key={pool._id} to={`/pool_detail/upcoming/${pool._id}`}>
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
			<div className="home-progress up-allocation">

				<div className="allocation">
					<div>
						<p>Min Allocation</p>
						<h3>{pool.min_allocation ? pool.min_allocation : "TBA"}</h3>
					</div>
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

export default memo(Pool);
