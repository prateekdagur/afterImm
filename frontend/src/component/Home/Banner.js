import React, {memo} from "react";
import "./Banner.css";

//banner component.
const Banner = () => {
	return (
		<div>
			<div className="banner ho_me">
				<div className="container_cust">
					<div className="inner_banner ho_me">
						{/* <a href="https://t.me/seedifyfund/610" target="_blank" rel="noopener noreferrer"><div className="blink-text" style={{ fontSize: 25 }}>Rebranding of Seedify is ongoing. Check the new design here</div></a> */}

						<h1>Enter the gateway of Blockchain Gaming</h1>
						{/* <p> Get the blockchain gaming tokens you love, through holding SFUND
						</p> */}
						<a
							className="gen_btn new_btns join_banner_btn"
							href="https://form.typeform.com/to/i9cyC7Un"
							target="_blank"
							rel="noopener noreferrer">
							Apply as a Project
						</a>
						<a
							className="gen_btn new_btns join_banner_btn"
							href="https://pancakeswap.finance/swap?inputCurrency=0xe9e7cea3dedca5984780bafc599bd69add087d56&outputCurrency=0x477bc8d23c634c154061869478bce96be6045d12"
							target="_blank"
							rel="noopener noreferrer">
							Buy on Pancakeswap
						</a>
						<a
							className="gen_btn new_btns join_banner_btn"
							href="https://kucoin.com/trade/SFUND-USDT"
							target="_blank"
							rel="noopener noreferrer">
							Buy on KuCoin
						</a>
						<a
							className="gen_btn new_btns join_banner_btn"
							href="https://www.gate.io/en/trade/SFUND_USDT"
							target="_blank"
							rel="noopener noreferrer">
							Buy on Gate.io
						</a>
					</div>
				</div>
				<div className="nd_banner">
					<div className="container_cust">
						<div className="speedi_grd">
							<div className="speedi_inner_grd">
								<div className="inner_sp_grd">
									<h2>What is Seedify.fund</h2>
									<p>
										Before getting started, let's dig into Seedify and what it
										stands for
									</p>
									<a
										href="https://medium.com/seedify/what-is-seedify-e4e99a7a255a"
										target="_blank"
										rel="noopener noreferrer">
										Learn more
									</a>
								</div>
							</div>
							<div className="speedi_inner_grd">
								<div className="inner_sp_grd">
									<h2>Tier System</h2>
									<p>Get to know more about the IGO allocation system here</p>
									<a
										href="https://medium.com/seedify/the-updated-tier-system-c9652ce5cf5b"
										target="_blank"
										rel="noopener noreferrer">
										Learn more
									</a>
								</div>
							</div>
							<div className="speedi_inner_grd">
								<div className="inner_sp_grd">
									<h2>How to get started</h2>
									<p>
										Time for action! This guide enlights you on your blockchain
										gaming path
									</p>
									<a
										href="https://medium.com/seedify/how-to-get-started-with-seedify-33b4bfd0a001"
										target="_blank"
										rel="noopener noreferrer">
										Learn more
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default memo(Banner);
