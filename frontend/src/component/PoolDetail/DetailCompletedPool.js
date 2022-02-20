import React, { useState, useEffect, memo } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../Home/Header";
import "./PoolDetail.css";
import PoolInformation from "./PoolInformation";
import AboutProject from "./AboutProject";
import TelegramIcon from "@material-ui/icons/Telegram";
import LanguageIcon from "@material-ui/icons/Language";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "../Home/footer";
import { getDataAPI } from "../../utils/API";


toast.configure();
const DetailCompletedPool = () => {
    const [pool_detail, setPool_detail] = useState("");
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    //var checkvalid = 0;
    const id = useParams().id;
    useEffect(() => {
        // Getting res from backend api and setting to the setPool detail.
        getDataAPI(`getCompletedAdmin/${id}`).then((res) => setPool_detail(res.data.Completedpool));
    }, [id]);


    var progress_percentage = (pool_detail.allocation / pool_detail.total_supply) * 100
    var num = Math.ceil(progress_percentage / 2)
    var full = "";
    if (num === 50) {
        full = 'fullupload'
    }
    var progressBar = [];
    for(let i = 0; i < num; i++){
        progressBar.push(i)
    }
    return (
        <div>
            <Header />

            <div className="pool_detail_banner">
                <div className="container_cust">
                    <div className="inner_pool_detail_banner">
                        <div className="left_ban">
                            <div className="ti_tle">
                                <img src={pool_detail.images} alt="" />
                                <div className="socia_grd">
                                    <div>
                                        <h3>{pool_detail.title}</h3>

                                        <p>{pool_detail.content}</p>
                                    </div>
                                    <div className="socia_l">
                                        <ul>
                                            {pool_detail.twitter_link ? (
                                                <li className="nav-item ">
                                                    <a
                                                        className="nav-link"
                                                        href={pool_detail.twitter_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <span>
                                                            <i
                                                                className="fa fa-twitter"
                                                                aria-hidden="true"
                                                            ></i>
                                                        </span>{" "}
                                                    </a>
                                                </li>
                                            ) : (
                                                ""
                                            )}
                                            {pool_detail.medium_link ? (
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link"
                                                        href={pool_detail.medium_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <span>
                                                            <i
                                                                className="fa fa-medium"
                                                                aria-hidden="true"
                                                            ></i>
                                                        </span>
                                                    </a>
                                                </li>
                                            ) : (
                                                ""
                                            )}
                                            {pool_detail.telegram_link ? (
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link"
                                                        href={pool_detail.telegram_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {" "}
                                                        <TelegramIcon />
                                                    </a>
                                                </li>
                                            ) : (
                                                ""
                                            )}
                                            {pool_detail.browser_web_link ? (
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link"
                                                        href={pool_detail.browser_web_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {" "}
                                                        <LanguageIcon />
                                                    </a>
                                                </li>
                                            ) : (
                                                ""
                                            )}
                                            {pool_detail.youtube ? (
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link"
                                                        href={pool_detail.youtube}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {" "}
                                                        <YouTubeIcon />
                                                    </a>
                                                </li>
                                            ) : (
                                                ""
                                            )}
                                            {pool_detail.instagram ? (
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link"
                                                        href={pool_detail.instagram}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {" "}
                                                        <InstagramIcon />
                                                    </a>
                                                </li>
                                            ) : (
                                                ""
                                            )}
                                            {pool_detail.discord ? (
                                                <li className="nav-item ">
                                                    <a
                                                        className="nav-link"
                                                        href={pool_detail.discord}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <span>
                                                            <i className="fa fa-discord" area-hidden="true"></i>
                                                        </span>{" "}
                                                    </a>
                                                </li>
                                            ) : (
                                                ""
                                            )}

                                            {pool_detail.fblink ? (
                                                <li className="nav-item ">
                                                    <a
                                                        className="nav-link"
                                                        href={pool_detail.fblink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <span>
                                                            <i className="fa fa-facebook-square" aria-hidden="true"></i>
                                                        </span>{" "}
                                                    </a>
                                                </li>
                                            ) : (
                                                ""
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right_ban phaseigo">
                            <div className="outer-top">
                                <ul>
                                    <li>
                                        {
                                            pool_detail.phase_one_id ?
                                                <Link to={`/pool_detail/completed/${pool_detail.phase_one_id}`} target="_blank">
                                                    Phase 1
                                                </Link>
                                                : ""
                                        }

                                    </li>
                                    <li>
                                        {
                                            pool_detail.phase_two_id ?
                                                <Link to={`/pool_detail/completed/${pool_detail.phase_two_id}`} target="_blank">
                                                    Phase 2
                                                </Link>
                                                : ""
                                        }

                                    </li>
                                    <li>
                                        {pool_detail.phase_three_id ?
                                            <Link to={`/pool_detail/completed/${pool_detail.phase_three_id}`} target="_blank">
                                                Phase 3
                                            </Link>
                                            : ""}

                                    </li>
                                </ul>
                            </div>
                            <div className="outd-card">
                                <div className="detail_card_outer">
                                    <div className="detail_card">
                                        <div className="tit_row">
                                            <div className="tit_le2">
                                                {/* <img src={bitcoin} alt="" /> */}
                                                <h3>
                                                    <div className="pooldetail-title">
                                                        {/* Binance {pool_detail.crypto_type ==="BUSD"?"USD": ""} Coin{" "} */}
                                                    </div>
                                                    <span>
                                                        {" "}
                                                        1{" "}
                                                        {pool_detail.crypto_type === "BUSD"
                                                            ? "BUSD"
                                                            : "BNB"}{" "}
                                                        = {pool_detail.up_pool_raise} {pool_detail.symbol}{" "}
                                                    </span>
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="allocation">
                                            <div>
                                                <p>Total Raised</p>
                                                <div className="timer_desktop">
                                                    <h3 style={{ color: "white", fontSize: 18 }}>
                                                        {pool_detail.total_raised ? pool_detail.total_raised.toFixed(2) : "0"}{" "}
                                                        {pool_detail.crypto_type === "BUSD" ? "BUSD" : "BNB"}
                                                    </h3>
                                                </div>
                                                <div className="timer_mobile">
                                                    <h3 style={{ color: "white", fontSize: 14 }}>
                                                        {/* {number2 ? number2.toFixed(4) : "0"}{" "} */}
                                                        {pool_detail.crypto_type === "BUSD" ? "BUSD" : "BNB"}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="rts">
                                                {/* {startIn ? <p className="status-p">Start in</p> : ""} */}
                                                <div className="timer_desktop">
                                                    {/* {startIn === 1 ? (
                                                    <h3
                                                        style={{ color: "white", fontSize: 18 }}
                                                        id="poolonpagestart"
                                                    >
                                                        {startTime}
                                                    </h3>
                                                ) : (
                                                    ""
                                                )} */}
                                                </div>
                                                <div className="timer_mobile">
                                                    {/* {startIn === 1 ? (
                                                    <h3
                                                        style={{ color: "white", fontSize: 14 }}
                                                        id="poolonpagestart"
                                                    >
                                                        {startTimeMobile}
                                                    </h3>
                                                ) : (
                                                    ""
                                                )} */}
                                                </div>
                                                {/* {closesIn ? <p className="status-p">Ends in</p> : ""} */}
                                                <div className="timer_desktop">
                                                    {/* {closesIn === 1 ? (
                                                    <h3
                                                        style={{ color: "white", fontSize: 18 }}
                                                        id="poolonpagestart"
                                                    >
                                                        {startTimeMobile}
                                                    </h3>
                                                ) : (
                                                    ""
                                                )} */}
                                                </div>
                                                <div className="timer_mobile">
                                                    {/* {closesIn === 1 ? (
                                                    <h3
                                                        style={{ color: "white", fontSize: 14 }}
                                                        id="poolonpagestart"
                                                    >
                                                        {startTimeMobile}
                                                    </h3>
                                                ) : (
                                                    ""
                                                )} */}
                                                </div>
                                                {num < 50 ? <p className="status-p">Status</p> : ""}
                                                {num < 50 ? <h3>Closed</h3> : ""}
                                                {num === 50 ? <h3>Filled</h3> : ""}
                                            </div>
                                        </div>

                                        <div className="prog_bar">
                                            <div className="prog_bar_grd">
                                                <span className="prog _percent">
                                                    <p>Progress</p> {progress_percentage ? progress_percentage.toFixed(2) : "0"}%
                                                </span>
                                                {
                                                    <span className="parti _nls">
                                                        {pool_detail.allocation ? pool_detail.allocation.toFixed(2) : "0"}/
                                                        {pool_detail.total_supply} {pool_detail.symbol}
                                                    </span>
                                                }
                                            </div>

                                            <div className={`battery ${full}`}>
                                                {num ?
                                                    progressBar.map((x) => (
                                                        <div className="bar active" data-power="10" key={x}></div>
                                                    ))
                                                    : ""}
                                            </div>
                                        </div>
                                        <div className="buy-btnbtc">
                                            <div className="buy-token">
                                                {/* {y ? (
                                                ""
                                            ) : (
                                                <button
                                                    className="btnn_white"
                                                    onClick={() => checkTierAddress()}
                                                >
                                                    Buy Tokens
                                                </button>
                                            )} */}
                                            </div>
                                            <div className="prog_bar_grd">
                                                <span className="parti">
                                                    <p>Limited</p> Participants {pool_detail.participants}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PoolInformation pool_detail={pool_detail} />
            <AboutProject pool_detail={pool_detail} />
            <Footer />
        </div>
    );
};

export default memo(DetailCompletedPool);
