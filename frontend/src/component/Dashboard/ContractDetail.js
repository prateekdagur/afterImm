import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { contractdetail } from "../../redux/actions/icoAction";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/API";


//update tier component
const ContractDetail = () => {
    const [pool, setPool] = useState('');
    const [id, setId] = useState('');

    const { auth, ico } = useSelector(state => state)
    const dispatch = useDispatch();

    useEffect(() => {
        // Getting res from backend api and setting to the setPool.
        getDataAPI("dropdowncontract").then((res) => setPool(res.data.upc_pool));
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(contractdetail(id, auth))

        }
    }, [id, auth, dispatch])


    return (
        <div className="container_cust">
            <div className="right-panel-main wishlist-data">
                <h2>Contract Detail</h2>
                <form>
                    <div className="rightpanel-form">
                        <div className="form-inner">
                            <div className="form-group">
                                <select
                                    className="crt-igo"
                                    name="up_pool_access"
                                    onChange={(e) => setId(e.target.value)}>
                                    <option
                                        className="ico___dropdown"
                                        value=""

                                        required>
                                        Select IGO
                                    </option>
                                    {pool ? pool.map((p) => (
                                        <option className="ico___dropdown" key={p._id} value={p._id}>{p.title} {p.idophase} ({p.up_pool_access})</option>
                                    ))
                                        : ""}

                                </select>
                            </div>

                        </div>
                    </div>
                </form>
            </div>


            <h4 className="form-title" style={{ paddingBottom: 20 }}>{ico.contract_detail ? "Contract Details" : ""} </h4>
           
            <br/>
            {
                ico.contract_detail ?
                    (
                        <div className="inner_pool_details">

                            <div className="tble">

                                <div className="tble-outer">

                                    <div className="table">
                                        {/* Table for token information */}

                                        <table cellSpacing={0}>
                                            <tbody>
                                                <tr>
                                                    <td align="left">
                                                        <span>Contract Name</span>
                                                    </td>
                                                    <td align="right">{ico.contract_detail.contractName} </td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <span>Project Owner</span>
                                                    </td>
                                                    <td align="right">{ico.contract_detail.projectOwner}</td>
                                                </tr>

                                                <tr>
                                                    <td align="left">
                                                        <span>Max Cap</span>
                                                    </td>
                                                    <td align="right">{ico.contract_detail.maxCap / 10 ** 18}</td>
                                                </tr>

                                                <tr>
                                                    <td align="left">
                                                        <span>Total Users</span>
                                                    </td>
                                                    <td className="address_break" align="right">
                                                        {ico.contract_detail.totalUsers}
                                                    </td>
                                                </tr>


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>



                            <div className="tble">

                                <div className="tble-outer">

                                    <div className="table">
                                        {/* Table for token information */}

                                        <table cellSpacing={0}>
                                            <tbody>
                                                <tr>
                                                    <td align="left">
                                                        <span>Contract Status</span>
                                                    </td>
                                                    <td align="right">{ico.contract_detail.paused ? "Sale Disabled" : "Sale Enabled"}</td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <span>Sale Start</span>
                                                    </td>
                                                    <td align="right">{new Date(ico.contract_detail.saleStart * 1000).toUTCString()}</td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <span>Sale End</span>
                                                    </td>
                                                    <td align="right">{new Date(ico.contract_detail.saleEnd * 1000).toUTCString()}</td>
                                                </tr>

                                                <tr>
                                                    <td className="border-left-radius" align="left">
                                                        <span>Total BUSD Received</span>
                                                    </td>
                                                    <td className="address_break" align="right">
                                                    {Web3.utils.fromWei(ico.contract_detail.totalbusd , 'ether')}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : ""
            }

            {
                ico.contract_detail ?
                    (

                        <div className="inner_pool_details">
                            <div className="tble">
                                <h4 className="form-title" style={{ paddingBottom: 20 }}>Tier-1 Details</h4>
                                <div className="tble-outer">

                                    <div className="table">
                                        {/* Table for token information */}

                                        <table cellSpacing={0}>
                                            <tbody>
                                                <tr>
                                                    <td align="left">
                                                        <span>Max Tier Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tierone.maxTierCap, 'ether')}</td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <span>Min User Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tierone.minUserCap, 'ether')}</td>
                                                </tr>

                                                <tr>
                                                    <td align="left">
                                                        <span>Max User Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tierone.maxUserCap, 'ether')}</td>
                                                </tr>

                                                <tr>
                                                    <td align="left">
                                                        <span>Amount Raised</span>
                                                    </td>
                                                    <td className="address_break" align="right">
                                                        {Web3.utils.fromWei(ico.contract_detail.tierone.amountRaised, 'ether')}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <span>No. of Users</span>
                                                    </td>
                                                    <td align="right">{ico.contract_detail.tierone.users}</td>
                                                </tr>


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>



                            <div className="tble">
                                <h4 className="form-title" style={{ paddingBottom: 20 }}>Tier-2 Details</h4>
                                <div className="tble-outer">

                                    <div className="table">
                                        {/* Table for token information */}

                                        <table cellSpacing={0}>
                                            <tbody>
                                                <tr>
                                                    <td align="left">
                                                        <span>Max Tier Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tiertwo.maxTierCap, 'ether')}</td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <span>Min User Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tiertwo.minUserCap, 'ether')}</td>
                                                </tr>

                                                <tr>
                                                    <td align="left">
                                                        <span>Max User Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tiertwo.maxUserCap, 'ether')}</td>
                                                </tr>

                                                <tr>
                                                    <td align="left">
                                                        <span>Amount Raised</span>
                                                    </td>
                                                    <td className="address_break" align="right">
                                                        {Web3.utils.fromWei(ico.contract_detail.tiertwo.amountRaised, 'ether')}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <span>No. of Users</span>
                                                    </td>
                                                    <td align="right">{ico.contract_detail.tiertwo.users}</td>
                                                </tr>


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ) : ""
            }

            {
                ico.contract_detail ?
                    (

                        <div className="inner_pool_details">
                            <div className="tble">
                                <h4 className="form-title" style={{ paddingBottom: 20 }}> Tier-3 Details</h4>
                                <div className="tble-outer">

                                    <div className="table">
                                        {/* Table for token information */}

                                        <table cellSpacing={0}>
                                            <tbody>
                                                <tr>
                                                    <td align="left">
                                                        <span>Max Tier Cap</span>
                                                    </td>
                                                    <td align="right"> {Web3.utils.fromWei(ico.contract_detail.tierthree.maxTierCap, 'ether')}</td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <span>Min User Cap</span>
                                                    </td>
                                                    <td align="right"> {Web3.utils.fromWei(ico.contract_detail.tierthree.minUserCap, 'ether')}</td>
                                                </tr>

                                                <tr>
                                                    <td align="left">
                                                        <span>Max User Cap</span>
                                                    </td>
                                                    <td align="right"> {Web3.utils.fromWei(ico.contract_detail.tierthree.maxUserCap, 'ether')}</td>
                                                </tr>

                                                <tr>
                                                    <td align="left">
                                                        <span>Amount Raised</span>
                                                    </td>
                                                    <td className="address_break" align="right">
                                                        {Web3.utils.fromWei(ico.contract_detail.tierthree.amountRaised, 'ether')}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <span>No. of Users</span>
                                                    </td>
                                                    <td align="right">{ico.contract_detail.tierthree.users}</td>
                                                </tr>


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>



                            <div className="tble">
                                <h4 className="form-title" style={{ paddingBottom: 20 }}>Tier-4 Details</h4>
                                <div className="tble-outer">

                                    <div className="table">
                                        {/* Table for token information */}

                                        <table cellSpacing={0}>
                                            <tbody>
                                                <tr>
                                                    <td align="left">
                                                        <span>Max Tier Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tierfour.maxTierCap, 'ether')}</td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <span>Min User Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tierfour.minUserCap, 'ether')}</td>
                                                </tr>

                                                <tr>
                                                    <td align="left">
                                                        <span>Max User Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tierfour.maxUserCap, 'ether')}</td>
                                                </tr>

                                                <tr>
                                                    <td align="left">
                                                        <span>Amount Raised</span>
                                                    </td>
                                                    <td className="address_break" align="right">
                                                        {Web3.utils.fromWei(ico.contract_detail.tierfour.amountRaised, 'ether')}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <span>No. of Users</span>
                                                    </td>
                                                    <td align="right">{ico.contract_detail.tierfour.users}</td>
                                                </tr>


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ) : ""
            }

            {
                ico.contract_detail ?
                    (

                        <div className="inner_pool_details">
                            <div className="tble">
                                <h4 className="form-title" style={{ paddingBottom: 20 }}> Tier-5 Details</h4>
                                <div className="tble-outer">

                                    <div className="table">
                                        {/* Table for token information */}

                                        <table cellSpacing={0}>
                                            <tbody>
                                                <tr>
                                                    <td align="left">
                                                        <span>Max Tier Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tierfive.maxTierCap, 'ether')}</td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <span>Min User Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tierfive.minUserCap, 'ether')}</td>
                                                </tr>

                                                <tr>
                                                    <td align="left">
                                                        <span>Max User Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tierfive.maxUserCap, 'ether')}</td>
                                                </tr>

                                                <tr>
                                                    <td align="left">
                                                        <span>Amount Raised</span>
                                                    </td>
                                                    <td className="address_break" align="right">
                                                        {Web3.utils.fromWei(ico.contract_detail.tierfive.amountRaised, 'ether')}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <span>No. of Users</span>
                                                    </td>
                                                    <td align="right">{ico.contract_detail.tierfive.users}</td>
                                                </tr>


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>



                            <div className="tble">
                                <h4 className="form-title" style={{ paddingBottom: 20 }}>Tier-6 Details</h4>
                                <div className="tble-outer">

                                    <div className="table">
                                        {/* Table for token information */}

                                        <table cellSpacing={0}>
                                            <tbody>
                                                <tr>
                                                    <td align="left">
                                                        <span>Max Tier Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tiersix.maxTierCap, 'ether')}</td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <span>Min User Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tiersix.minUserCap, 'ether')}</td>
                                                </tr>

                                                <tr>
                                                    <td align="left">
                                                        <span>Max User Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tiersix.maxUserCap, 'ether')}</td>
                                                </tr>

                                                <tr>
                                                    <td align="left">
                                                        <span>Amount Raised</span>
                                                    </td>
                                                    <td className="address_break" align="right">
                                                        {Web3.utils.fromWei(ico.contract_detail.tiersix.amountRaised, 'ether')}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <span>No. of Users</span>
                                                    </td>
                                                    <td align="right">{ico.contract_detail.tiersix.users}</td>
                                                </tr>


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ) : ""
            }

            {
                ico.contract_detail ?
                    (

                        <div className="inner_pool_details">
                            <div className="tble">
                                <h4 className="form-title" style={{ paddingBottom: 20 }}> Tier-7 Details</h4>
                                <div className="tble-outer">

                                    <div className="table">
                                        {/* Table for token information */}

                                        <table cellSpacing={0}>
                                            <tbody>
                                                <tr>
                                                    <td align="left">
                                                        <span>Max Tier Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tierseven.maxTierCap, 'ether')}</td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <span>Min User Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tierseven.minUserCap, 'ether')}</td>
                                                </tr>

                                                <tr>
                                                    <td align="left">
                                                        <span>Max User Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tierseven.maxUserCap, 'ether')}</td>
                                                </tr>

                                                <tr>
                                                    <td align="left">
                                                        <span>Amount Raised</span>
                                                    </td>
                                                    <td className="address_break" align="right">
                                                        {Web3.utils.fromWei(ico.contract_detail.tierseven.amountRaised, 'ether')}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <span>No. of Users</span>
                                                    </td>
                                                    <td align="right">{ico.contract_detail.tierseven.users}</td>
                                                </tr>


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>



                            <div className="tble">
                                <h4 className="form-title" style={{ paddingBottom: 20 }}> Tier-8 Details</h4>
                                <div className="tble-outer">

                                    <div className="table">
                                        {/* Table for token information */}

                                        <table cellSpacing={0}>
                                            <tbody>
                                                <tr>
                                                    <td align="left">
                                                        <span>Max Tier Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tiereight.maxTierCap, 'ether')} </td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <span>Min User Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tiereight.minUserCap, 'ether')}</td>
                                                </tr>

                                                <tr>
                                                    <td align="left">
                                                        <span>Max User Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tiereight.maxUserCap, 'ether')}</td>
                                                </tr>

                                                <tr>
                                                    <td align="left">
                                                        <span>Amount Raised</span>
                                                    </td>
                                                    <td className="address_break" align="right">
                                                        {Web3.utils.fromWei(ico.contract_detail.tiereight.amountRaised, 'ether')}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <span>No. of Users</span>
                                                    </td>
                                                    <td align="right">{ico.contract_detail.tiereight.users}</td>
                                                </tr>


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ) : ""
            }


            {
                ico.contract_detail ?
                    (

                        <div className="inner_pool_details">
                            <div className="tble">
                                <h4 className="form-title" style={{ paddingBottom: 20 }}> Tier-9 Details</h4>
                                <div className="tble-outer">

                                    <div className="table">
                                        {/* Table for token information */}

                                        <table cellSpacing={0}>
                                            <tbody>
                                                <tr>
                                                    <td align="left">
                                                        <span>Max Tier Cap</span>
                                                    </td>
                                                    <td align="right"> {Web3.utils.fromWei(ico.contract_detail.tiernine.maxTierCap, 'ether')}</td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <span>Min User Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tiernine.minUserCap, 'ether')}</td>
                                                </tr>

                                                <tr>
                                                    <td align="left">
                                                        <span>Max User Cap</span>
                                                    </td>
                                                    <td align="right">{Web3.utils.fromWei(ico.contract_detail.tiernine.maxUserCap, 'ether')}</td>
                                                </tr>

                                                <tr>
                                                    <td align="left">
                                                        <span>Amount Raised</span>
                                                    </td>
                                                    <td className="address_break" align="right">
                                                        {Web3.utils.fromWei(ico.contract_detail.tiernine.amountRaised, 'ether')}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left">
                                                        <span>No. of Users</span>
                                                    </td>
                                                    <td align="right">{ico.contract_detail.tiernine.users}</td>
                                                </tr>


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ) : ""
            }
        </div >
    );
};

export default ContractDetail;
