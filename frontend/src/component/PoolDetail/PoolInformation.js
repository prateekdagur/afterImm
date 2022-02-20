import React from "react";
import "./TokenInformation.css";

//Pool information component.
const PoolInformation = ({ pool_detail }) => {
	var date = new Date(pool_detail.token_distribution_date)
	var distribution_date = date.toString().split(' ');
	return (
		<>
			<div className="pool_details">
				<div className="container_cust">
					<div className="inner_pool_details">
					<div className="tble">
					   <h2>Pool Information</h2>
					   <div className="tble-outer">
						<div className="table">
							{/* Table for pool information */}
							<table cellSpacing={0}>								
								<tbody>
									<tr>
										<td align="left">
											<span>Token Distribution</span>
										</td>
										<td align="right">{distribution_date[1]} {distribution_date[2]}{pool_detail.token_distribution_date ? "th" : ""} {distribution_date[3]}{pool_detail.token_distribution_date ? "," : ""} {distribution_date[4]} UTC</td>
									</tr>
									<tr>
										<td align="left">
											<span>Min. Allocation</span>
										</td>
										<td align="right">{pool_detail.min_allocation ? pool_detail.min_allocation + (pool_detail.crypto_type ==="BUSD"?" BUSD":' BNB') : "TBA"}</td>
									</tr>

									<tr>
										<td align="left">
											<span>Max. Allocation</span>
										</td>
										<td align="right">{pool_detail.max_allocation ? pool_detail.max_allocation + (pool_detail.crypto_type ==="BUSD"?" BUSD":' BNB') : "TBA"}</td>
									</tr>

									<tr>
										<td align="left">
											<span>Token Price</span>
										</td>
										<td align="right">{pool_detail.up_pool_raise ? (pool_detail.crypto_type ==="BUSD"? "1 BUSD = ": "1 BNB = ")  + pool_detail.up_pool_raise + ' ' + pool_detail.symbol : "TBA"} </td>
									</tr>

									<tr>
										<td className="border-left-radius" align="left">
											<span>Access Type</span>
										</td>
										<td className="border-right-radius" align="right">
											{pool_detail.up_pool_access}
										</td>
									</tr>
								</tbody>
							</table>
							</div>
						</div>
						</div>
					<div className="tble">
					<h2>Token Information</h2>
					<div className="tble-outer">

						<div className="table">
							{/* Table for token information */}
							
							<table cellSpacing={0}>								
								<tbody>
									<tr>
										<td align="left">
											<span>Name</span>
										</td>
										<td align="right">{pool_detail.title}</td>
									</tr>
									<tr>
										<td align="left">
											<span>Symbol</span>
										</td>
										<td align="right">{pool_detail.symbol}</td>
									</tr>

									<tr>
										<td align="left">
											<span>Decimals</span>
										</td>
										<td align="right">{pool_detail.decimal}</td>
									</tr>

									<tr>
										<td align="left">
											<span>Address</span>
										</td>
										<td className="address_break" align="right">
										{pool_detail.token_address}
										</td>
									</tr>

									<tr>
										<td className="border-left-radius" align="left">
											<span>Total Supply</span>
										</td>
										<td className="border-right-radius" align="right">
											{pool_detail.total_supply}
										</td>
									</tr>
								</tbody>
							</table>
							</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PoolInformation;
