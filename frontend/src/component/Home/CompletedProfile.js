import React from "react";



const CompletedProfile = ({ pool }) => {

	return (
		<div>
			<div className="fw-grid">
				<div className="fw-grid-inner">
					<div className="fw-img">
						<img src={pool.logo_url} width="70px" height="70px" alt="igo logo" />
						<div className="phasetitle">
							<h3>{pool.title}</h3>

						</div>
					</div>
					<div className="fw-second">
						<div className="fwsecond-box">
							<p>Phase</p>
							
							<span>{pool.pool_access_type} {pool.phase ? pool.phase : ""}</span>
						</div>
						<div className="fwsecond-box">
							<p>Amount</p>
							<span>{pool.amount}</span>
						</div>
					</div>
					<div className="fw-bar">						
						<div className="fwsecond-box">
							<p>Entry</p>
							
							<span>
									1
									{pool.crypto_type === "BUSD"
										? "BUSD"
										: "BNB"}{" "}
									= {pool.pool_raise} {pool.symbol}{" "}
								</span>
						</div>

					</div>

				</div>
			</div>
			<div className="fw-grid tb-view">
				<div className="fw-grid-inner">
					<div className="tbview-first">
						<div className="fw-img">
							<img src={pool.logo_url} width="70px" height="70px" alt="igo logo" />
							<h3>{pool.title}</h3>
						</div>
						<div className="fw-second">
							<div className="fwsecond-box">
								<p>Phase</p>
								<p>{pool.pool_access_type}</p><p>{pool.phase ? pool.phase : ""}</p>
							</div>
							<div className="fwsecond-box">
								<p>Amount</p>
								<span>{pool.amount}</span>
							</div>
						</div>
					</div>
					<div className="tbview-first">
						<div className="fw-bar">
							<div className="bar-txtouter">
								<div className="bar-txt">
									<p>Entry</p>
									<h6>
										{" "}
										1{" "}
										{pool.crypto_type === "BUSD"
											? "BUSD"
											: "BNB"}{" "}
										= {pool.pool_raise} {pool.symbol}{" "}
									</h6>
								</div>

							</div>

						</div>

					</div>
				</div>
			</div>
		</div>
	);
};
export default CompletedProfile;
