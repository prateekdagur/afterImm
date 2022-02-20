import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../../images/Logo.png";

//sidebar component.
const Sidebar = () => {
	return (
		<div>
			<div className="left-panal">
				<div className="logo">
					<NavLink to="/admin/upcommingpool">
						<img src={logo} alt="logo" />
					</NavLink>
				</div>
				{/* <ul className="ul-list">
					<li>
						<NavLink to="/admin/deploynewico">Deploy New ICO</NavLink>
					</li>
				
				</ul> */}
				<ul className="ul-list secondul">
					<li>
						<NavLink to="/admin/upcommingpool">List ICO / IDO</NavLink>
					</li>
					<li>
						<NavLink to="/admin/mergecompleted">Merge Completed Pool</NavLink>
					</li>
					{/* <li>
						<NavLink to="/admin/claimtokenlisting/:address">List Claim Token</NavLink>
					</li> */}
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
