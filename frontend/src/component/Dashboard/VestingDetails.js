import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { getDataAPI } from "../../utils/API";
// import { addvesting, addprofilecsv } from "../../redux/actions/icoAction"
// import Papa from 'papaparse';
import { CSVLink } from "react-csv";

//create ico component to write all details from form.
const VestingDetails = () => {
    // const { auth } = useSelector(state => state)
    // const dispatch = useDispatch();
    // const [pool, setPool] = useState('')
    // const [Addr, setAddr] = useState('')
    // const [Address, setAddress] = useState('')
    // const [csvfile, setCsvfile] = useState('');
    const [UPool, setUPool] = useState('')
    const [id, setId] = useState('')
    const [csv, setcsv] = useState('')


    // const initialState = {
    //     vetsing_date: "",
    //     vesting_percentage: "",
    //     return_of_investment: ""
    // }
    // const [vestingData, setVestingData] = useState(initialState);

    // const {
    //     vetsing_date,
    //     vesting_percentage,
    //     return_of_investment
    // } = vestingData;

    // useEffect(() => {
    //     // Getting res from backend api and setting to the setPool .
    //     getDataAPI("get_dropdown").then((res) => setPool(res.data.upc_pool));
    // }, []);

    var csvData = [];
    useEffect(async () => {
        // Getting res from backend api and setting to the setPool .
        getDataAPI(`get_upcomming`).then((res) => setUPool(res.data.upc_pool))
        if (id) {
            const lotterycsv = await getDataAPI(`epxportlottery/${id}`);

            for (let i = 0; i < lotterycsv.data.length; i++) {
                csvData.push({ title : lotterycsv.data[i].title, wallet  : lotterycsv.data[i].wallet})
            }
            setcsv(csvData)
        }

    }, [id]);

    const exportLottery = async () => {

        var tempLink = document.getElementById('csvlotterydownload');
        tempLink.setAttribute('download', 'lottery_wallets.csv');
        tempLink.click();

    }

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setVestingData({ ...vestingData, [name]: value });
    // };

    // const handleSubmit = () => {
    //     dispatch(addvesting(vestingData, Addr, auth))
    // }

    // const UploadCsv = () => {
    //     if (csvfile) {
    //         Papa.parse(csvfile, {
    //             complete: function (results) {
    //                 dispatch(addprofilecsv(results.data, Address, auth))
    //             }
    //         }

    //         )

    //     }
    //     setCsvfile('');
    // }

    return (
        <div className="container_cust">
            <div className="right-panel-main wishlist-data">
                <h2>Lottery Details</h2>

                {/* <div className="rightpanel-form">

                    <h4 className="form-title">01. Vesting Detail</h4>
                    <div className="form-inner">
                        <div className="form-group">
                            <label>IGO</label>
                            <select
                                className="input-select"
                                name="igo_id"

                                onChange={(e) => setAddr(e.target.value)}>
                                <option
                                    className="ico___dropdown"
                                    value=""
                                    required>
                                    Select Igo
                                </option>
                                {pool ? pool.map((p) => (
                                    <option className="ico___dropdown" key={p._id} value={p.address}>{p.title} {p.idophase} ({p.up_pool_access})</option>
                                ))
                                    : ""}

                            </select>
                        </div>

                        <div className="form-group">
                            <label>Vesting Date</label>
                            <input
                                type="text"
                                className="input-form"
                                placeholder="VESTING DATE"
                                name="vetsing_date"
                                value={vetsing_date}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Vesting Percentage</label>
                            <input
                                type="text"
                                className="input-form"
                                placeholder="VESTING PERCENTAGE"
                                name="vesting_percentage"
                                value={vesting_percentage}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>ROI</label>
                            <input
                                type="text"
                                className="input-form"
                                placeholder="RETURN OF INVESTMENT"
                                name="return_of_investment"
                                value={return_of_investment}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="crt-ico" onClick={() => handleSubmit()}>
                            ADD VESTING
                        </button>
                    </div>
                </div>

                <div className="rightpanel-form">

                    <h4 className="form-title">02. Profile Detail</h4>
                    <div className="form-inner">
                        <div className="form-group">
                            <label>IGO</label>
                            <select
                                className="input-select"
                                name="address"

                                onChange={(e) => setAddress(e.target.value)}>
                                <option
                                    className="ico___dropdown"
                                    value=""
                                    required>
                                    Select Igo
                                </option>
                                {pool ? pool.map((p) => (
                                    <option className="ico___dropdown" key={p.address} value={p.address}>{p.title} {p.idophase} ({p.up_pool_access})</option>
                                ))
                                    : ""}

                            </select>
                        </div>

                        <div className="form-group">
                            <label>CSV</label>
                            <input type="file" accept=".csv,.xlsx,.xls" className="upld-input" onChange={(e) => setCsvfile(e.target.files[0])} />
                        </div>

                    </div>
                    <div className="form-group">
                        <button className="crt-ico" onClick={() => UploadCsv()}>
                            ADD CSV
                        </button>
                    </div>
                </div> */}


                <div className="rightpanel-form">

                    <h4 className="form-title">01. Export Lottery</h4>
                    <div className="form-inner">
                        <div className="form-group">
                            <label>IGO</label>
                            <select
                                className="input-select"
                                name="address"

                                onChange={(e) => setId(e.target.value)}>
                                <option
                                    className="ico___dropdown"
                                    value=""
                                    required>
                                    Select Igo
                                </option>
                                {UPool ? UPool.map((p) => (
                                    <option className="ico___dropdown" key={p.address} value={p._id}>{p.title} {p.idophase} ({p.up_pool_access})</option>
                                ))
                                    : ""}

                            </select>
                        </div>

                    </div>
                    <div className="form-group">
                        <button className="crt-ico" onClick={exportLottery}>
                            EXPORT CSV
                        </button>
                    </div>
                </div>


            </div>
            <CSVLink id="csvlotterydownload" data={csv} style={{ display: "none" }}>Download me</CSVLink>
        </div >
    );
};
export default VestingDetails;
