import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { deletecompletedPool } from "../../redux/actions/completedPoolAction";

//import { getstoreClaim, getsendClaimToken } from "../../redux/actions/claimTokenAction";
import Modal from "@material-ui/core/Modal";
// import Pagination from "@material-ui/lab/Pagination";
// import { makeStyles } from "@material-ui/core/styles";


const MergeCompletedListPool = ({ pool }) => {
    
    // const clickClaimStore = (addr) => {
    //   dispatch(getstoreClaim(addr));
  
    // };
    // const clickSendToken = (addr) => {
    //   dispatch(getsendClaimToken(addr))
    // }
  
    // const downloadcsv = (name) => {
    //   const link = document.createElement('a');
    //   link.href = `/exportcsv/${name}-allocation.csv`;
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // }
  
    const dispatch = useDispatch();
    
    const [open, setOpen] = useState(false);
    const [Id, setId] = useState('')
    const handleOpen = (id) => {
      setId(id)
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const {auth} = useSelector(state => state)
    const deletePool = () => {
      dispatch(deletecompletedPool(Id, auth))
      setOpen(false)
 
    }
    const body = (
      <div className="paper">
        <a className="cancel" href="#cancel" onClick={() => handleClose()} >
          Cancel
        </a>
        <a className="coming-soon" href="#confirm" onClick={deletePool}>
          Confirm
        </a>
      </div>
    );
  
    
    // const useStyles = makeStyles(() => ({
    //   ul: {
    //     "& .MuiPaginationItem-root": {
    //       color: "#fff",
    //     },
    //   },
    // }));
    // const classes = useStyles();
    var progress_percentage = (pool.allocation / pool.total_supply) * 100
	var num = Math.ceil(progress_percentage / 2)
	var full = "";
	if (num === 50) {
		full = 'fullupload'
	}
  var progressBar = [];
	for (let i = 0; i < num; i++) {
		progressBar.push(i)
	}
	return (
        <div>
                <div className="boxinner-main updblock">
                  <div className="list-boxes">
                    <div className="media">
                      <div className="client-name">
                        <div className="client-img">
                          <img
                            src={pool.images}
                            alt=""
                          />
                        </div>
                        <div className="client-info">
                          <h5>{pool.title}</h5>
                          {/* <p>{pool.address.slice(0, 5)}...{pool.address.slice(37, 42)}</p> */}
                        </div>
                      </div>  
                    </div>
                    <div className="progressbar-list">
                    <div className="media-btm">
                      <div className="na">
                        {pool.up_pool_raise}
                        <span> {pool.symbol}</span>
                      </div>
                      <div to="#c" className="radio">Ratio per 1 {pool.crypto_type}</div>
                    </div>
                    <div className={`battery ${full}`}>
                      {num
                        ? progressBar.map((x) => (
                          <div className="bar active" data-power="10" key={x}></div>
                        ))
                        : ""}
                    </div>
                    <div className="percentage">
                      <span className="total">{progress_percentage ? progress_percentage.toFixed(2) + "%" : ""}</span>
                      <span className="sfund">{pool.total_raised}/{pool.total_supply} {pool.symbol}</span>
                    </div>
                 </div>
                   

                 <div className="dlt-btnns">
                 <div className="update__delete">
                        <button className="fa fa-trash" onClick={() => handleOpen(pool._id)} ></button>
                        <Link
                          to={`/admin/updatecompletedpool/${pool._id}`}
                          className="fa fa-pencil-square-o"
                        ></Link>
                      </div>
                  <div className="text-center tw-btns">
                    {/* {
                      pool.address ? <Link to={`/admin/adduserinwhitelist/${pool._id}`} className="detail yellow_btn">
                        Add User in White List
                      </Link> : ""
                    } */}
                    {/* {pool.address ? 
                  <Link to={`/admin/updatetier/${pool.address}`} className="coming-soon">
                  Update Tiers Value
                  </Link>
                  : ""} */}
  
                    {/* {pool.address ? 
                   <Link to={`/admin/readwhitelist/${pool.address}`} className="coming-soon">
                   Read White List
                   </Link>
                   : ""} */}
  
                    {/* {pool.address ?
                    <a href="#prepare-token" onClick={() => clickClaimStore(pool.address)} className="coming-soon">
                      Prepare Claim
                    </a>
                    : ""}
  
                  {pool.address ?
                    <a href="#distribute-token" onClick={() => clickSendToken(pool.address)} className="coming-soon">
                      Distribute Token
                    </a>
                    : ""}
                  {pool.address ?
                    <a href="#download-csv" onClick={() => downloadcsv(pool.title)} className="coming-soon">
                      download-allocation
                    </a>
                    : ""} */}
  
                    {pool ?
                      <a href="#download-csv" className="coming-soon yellow_btn">
                        Completed Pool
                      </a>
                      : ""}
                  </div>
                </div>
                </div> 
                </div>
              
       
           
       
        {
          pool.title ? "" : <h2 style={{ color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>No records found</h2>
        }
        <div>
          {/* <a href={`/exportcsv/${title}.csv`} download={`${title}.csv`} id='downloadallocation'> </a> */}
        </div>
        {pool.title ? "" : <h2
          style={{
            color: "white",
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          No records found
        </h2>}
        {/* <div className="pool_pagination" style={{ display: "flex", justifyContent: "left" }}>
          <Pagination
            count={ico.totalcompletedPage}
            page={page}
            defaultPage={page}
            color="primary"
            classes={{ ul: classes.ul }}
            onChange={handleChange}
          />
        </div> */}
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            {body}
          </Modal>
        </div>
      </div>
	);
};

export default MergeCompletedListPool;
