import React, { memo } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Logo1.svg";
// import medium from "../../images/medium.svg";
import TelegramIcon from '@material-ui/icons/Telegram';
const Footer = () => (
  <div className="footer">
    <div className="container_cust">
      <div className="footer-inner">
        <div className="footer-logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <p>Seedify.fund is a Blockchain Gaming focused Incubator and Launchpad. Through staking $SFUND, become eligible to buy game tokens before everyone else, and have an edge in the play to earn era!
          </p>
        </div>
        <div className="footer-right ">
          <div className="footer-lft">
            <ul className="navbar-nav footer-link">
              {/* <li className="nav-item ">
                <a className="nav-link" href="#">Contact Us</a>
              </li> */}
              {/* <li className="nav-item ">
                <a className="nav-link" href="#">Whitepaper</a>
              </li> */}
              {/* <li className="nav-item ">
                <a className="nav-link" href="https://p50z1ifoy8t.typeform.com/to/iSzThzNs" 	target="_blank" rel="noopener noreferrer">Apply as a Project</a>
              </li> */}
            </ul>
            <div className="footer-social-tab">
              <ul className="navbar-nav ">
                <li className="nav-item ">
                  <a className="nav-link" href="https://twitter.com/SeedifyFund"
                    target="_blank" rel="noopener noreferrer"><span><i className="fa fa-twitter" aria-hidden="true"></i></span> </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://medium.com/seedify/what-is-seedify-e4e99a7a255a"
                    target="_blank" rel="noopener noreferrer"><span className="medium-icon"></span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://t.me/seedifyfund " target="_blank" rel="noopener noreferrer"> <TelegramIcon /></a>
                </li>
              </ul>
            </div>
          </div>

          <ul className="navbar-nav footer-link">
            <li className="nav-item ">
              <Link className="nav-link" to="/termsofservices">
                Terms of Services
              </Link>

            </li>
            <li className="nav-item ">
              <Link className="nav-link" to="/privacypolicy">
                Privacy Policy
              </Link>
            </li>
            {/* <li className="nav-item ">
              <a className="nav-link" href="#">Security Audits</a>
            </li> */}
            <li className="nav-item footer-tab"><p>&copy; seedify 2021</p>
            </li>
          </ul>
          <div className="footer-social">
            <ul className="navbar-nav ">
              <li className="nav-item ">
                <a className="nav-link" href="https://twitter.com/SeedifyFund"
                  target="_blank" rel="noopener noreferrer"><span><i className="fa fa-twitter" aria-hidden="true"></i></span> </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://medium.com/seedify/what-is-seedify-e4e99a7a255a"
                  target="_blank" rel="noopener noreferrer"><span className="medium-icon"></span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://t.me/seedifyfund " target="_blank" rel="noopener noreferrer"> <TelegramIcon /></a>
              </li>
            </ul>
            <p className="full-p">&copy; Seedify 2021</p>
          </div>
        </div>
        <div className="copyright-mob">
          <p>&copy; Seedify 2021</p>

          <div className="footer-social-copyright">
            <ul className="navbar-nav ">
              <li className="nav-item ">
                <a className="nav-link" href="https://twitter.com/SeedifyFund"
                  target="_blank" rel="noopener noreferrer"><span><i className="fa fa-twitter" aria-hidden="true"></i></span> </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://medium.com/seedify/what-is-seedify-e4e99a7a255a"
                  target="_blank" rel="noopener noreferrer"><span className="medium-icon"></span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://t.me/seedifyfund " target="_blank" rel="noopener noreferrer"> <TelegramIcon /></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default memo(Footer);