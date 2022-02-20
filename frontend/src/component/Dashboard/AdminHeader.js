import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/authAction";
import profile from "../../images/profile.png";
// import droparrow from "../../images/drop-arrow.png";
// import dropdown_up from "../../images/drop-up.png";
import logo from "../../images/Logo1.svg";
import { NavLink } from "react-router-dom";

//admin header component.
const AdminHeader = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state)


  useEffect(() => {
    window.onclick = function (event) {
      if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
    };
  }, []);

  const drop_toggle = () => {
    document.getElementById("myDropdown").classList.toggle("show");
  };

  return (
    <div>
      <div className="right-top">
        <header className="hea_der">
          <div className="container_cust">
            <div className="inner_header">
              <div className="logo">
                <Link to="/admin/upcommingpool">
                  <img src={logo} alt="" />
                </Link>
              </div>
              <div className="navi_gation">
                <Link
                  className="gen_btn btn_white"
                  to={
                    auth.token && auth.role
                      ? "/admin/upcommingpool"
                      : "/admin/login"
                  }>
                  dashboard
                </Link>

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse"
                    id="navbarSupportedContent">
                    <ul className="navbar-nav white-ul">
                      
                      <li className="nav-item">
                      <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         Pools
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                         <NavLink to="/admin/upcommingpool">List IGO / IDO</NavLink>
                         <NavLink to="/admin/mergecompleted">Merge Pool</NavLink>
                         <NavLink to="/admin/vestingDetails">Lottery Detail</NavLink>
                        </div>
                      </div>
                      </li>
                      <li className="nav-item">
                      <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         Contracts
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <NavLink to="/admin/deploynewico">Deploy Contract</NavLink>
                        <NavLink to="/admin/updatetier">Update Contract</NavLink>
                        <NavLink to="/admin/contractdetail">Contract Detail</NavLink>
                        </div>
                      </div>
                      </li>

                      {/* <li className="nav-item">
											<a className="nav-link" href="#">Whitelist</a>
										</li> */}

                      <div className="dropdown admin-drop drop-tab">
                        <button onClick={drop_toggle} className="dropbtn">
                          Seedify Admin{" "}
                          {/* <span>
                      <img src={droparrow} alt="dropdown" />
                    </span> */}
                        </button>
                        <div id="myDropdown" className="dropdown-content">
                          {/* <img className="dropdown_ups" src={dropdown_up} alt="" /> */}
                          <Link to="#" onClick={() => dispatch(logout())}>
                            logout
                          </Link>
                        </div>
                        <div className="profile-bar">
                          <img onClick={drop_toggle} src={profile} alt="profile" />
                        </div>
                      </div>
                    </ul>

                  </div>
                </nav>

                <div className="dropdown admin-drop drop-desktop">
                  <button onClick={drop_toggle} className="dropbtn">
                    Seedify Admin{" "}
                    {/* <span>
                      <img src={droparrow} alt="dropdown" />
                    </span> */}
                  </button>
                  <div id="myDropdown" className="dropdown-content">
                    {/* <img className="dropdown_ups" src={dropdown_up} alt="" /> */}
                    <Link to="#" onClick={() => dispatch(logout())}>
                      logout
                    </Link>
                  </div>
                  <div className="profile-bar">
                    <img onClick={drop_toggle} src={profile} alt="profile" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default AdminHeader;
