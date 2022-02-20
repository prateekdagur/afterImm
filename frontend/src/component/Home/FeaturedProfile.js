import React from "react";


const FeaturedProfile = ({ pool }) => {

    return (
        <div>
            <div className="fw-grid">
                <div className="fw-grid-inner vesting">
                    <div className="fw-img">
                        <img src={pool.logo} width="70px" height="70px" alt="igo logo" />
                        <div className="phasetitle">
                            <h3>{pool.title}</h3>
                            <p>{pool.vetsing_date}</p>

                        </div>
                    </div>
                    <div className="fw-second">
                        <div className="fwsecond-box">
                            <p>Phase</p>
                            <span>{pool.pool_type} {pool.phase ? pool.phase : ""}</span>
                        </div>
                        <div className="fwsecond-box">
                            <p>Amount</p>
                            <span>{pool.amount}</span>
                        </div>
                        <div className="fwsecond-box">
                            <p>Vesting Percentage</p>
                            <span>{pool.vesting_percentage} %</span>
                        </div>
                        <div className="fwsecond-box">
                            <p>Symbol</p>
                            <span>{pool.token_symbol}</span>
                        </div> 
                        <div className="fwsecond-box">
                            <p>ROI</p>
                            <span>{pool.return_of_investment}</span>
                        </div>
                    </div>

                </div>
            </div>
            <div className="fw-grid tb-view">
                <div className="fw-grid-inner">
                    <div className="tbview-first">
                        <div className="fw-img">
                            <img src={pool.logo} width="70px" height="70px" alt="igo logo" />
                            <h3>{pool.title}</h3>
                        </div>
                        <div className="fw-second">
                            <div className="fwsecond-box">
                                <p>Phase</p>
                                <span>{pool.pool_type} {pool.phase ? pool.phase : ""}</span>
                            </div>
                            <div className="fwsecond-box">
                                <p>Amount</p>
                                <span>{pool.amount}</span>
                            </div>
                            <div className="fwsecond-box">
                                <p>Vesting Percentage</p>
                                <span>{pool.vesting_percentage} %</span>
                            </div>
                            <div className="fwsecond-box">
                                <p>Symbol</p>
                                <span>{pool.token_symbol}</span>
                            </div>
                            <div className="fwsecond-box">
                                <p>ROI</p>
                                <span>{pool.return_of_investment}</span>
                            </div>
                        </div>
                    </div>
                  
                </div>
            </div>
        </div>

    );
};
export default FeaturedProfile;

