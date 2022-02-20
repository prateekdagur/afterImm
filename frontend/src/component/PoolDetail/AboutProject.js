import React, { memo } from "react";
import "./AboutProject.css";
import { Markup } from 'interweave';

//About project component.
const AboutProject = ({ pool_detail }) => {
	var desc_even = [];
	var desc_odd = [];
	if (pool_detail.description) {
		var content_length = pool_detail.description.split('\n').length;
		var length = Math.ceil(content_length / 2)
		for (let i = 0; i < length; i++) {
			desc_even.push(i)
		}

		for (let i = length; i < content_length; i++) {
			desc_odd.push(i)
		}
	}

	return (
		<div>
			<div className="about_project">
				<div className="container_cust">
					<div className="inner_about_project border-left-radius border-right-radius">
						<h3>About the Project</h3>
						<div className="content_grid">

							<div className="content">

								{
									desc_even ? desc_even.map(i => (
										<Markup key={i} content={pool_detail.description ? `${pool_detail.description.split('\n')[i]}` : ""} />
									))
										: ""
								}

							</div>

							<div className="content">

								{
									desc_odd ? desc_odd.map(i => (
										<Markup key={i} content={pool_detail.description ? `${pool_detail.description.split('\n')[i]}` : ""} />
									))
										: ""
								}

							</div>

						</div>
						<div className="whitepaper-btn">
							{pool_detail.white_paper ? <a href={`${pool_detail.white_paper}`} className="border-btn" target="_blank" rel="noopener noreferrer">Whitepaper</a> : ""}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(AboutProject);
