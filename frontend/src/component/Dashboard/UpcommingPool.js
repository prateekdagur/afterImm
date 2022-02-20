import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getico, deleteico } from "../../redux/actions/icoAction";
import { NavLink } from "react-router-dom";
import Modal from "@material-ui/core/Modal";

//componenet of upcoming pool.
const UpcommingPool = () => {
  const { ico, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getico(page));
  }, [dispatch, page]);

  const handleChange = (event, value) => {
    setPage(value);
  };
  const useStyles = makeStyles(() => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: "#fff",
      },
    },
  }));
  const classes = useStyles();
 
  var upcomming = 0;
  if (ico.paginatedUpcomming_pool && ico.paginatedUpcomming_pool.length) {
    upcomming = 1;
  }
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState('')
  const handleOpen = (id) => {
    setId(id)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deletePool = () => {
    dispatch(deleteico(Id, auth))
    dispatch(getico(page));
    handleClose()
  }

  const body = (
    <div className="paper">
      <div className="paper-inner">
        <div className="upload-cancel paper-btns">
          <a className=" paper_button" href="#cancel" onClick={() => handleClose()} >
            Cancel
          </a>
          <a className="coming-soon paper_button" href="#confirm" onClick={deletePool}>
            Confirm
          </a>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <div className="upcoming-list updblock">
        {ico.paginatedUpcomming_pool
          ? ico.paginatedUpcomming_pool.map((upcpool) => (
            <div key={upcpool._id} className="inner-box">
              <div className="boxinner-main">
              <div className="list-boxes">
                <div className="media">
                  <div className="client-name">
                    <div className="client-img">
                      <img
                        src={upcpool.images}
                        alt=""
                      />
                    </div>
                    <div className="client-info">
                      <h5>{upcpool.title}</h5>
                      <p>{upcpool.address.slice(0, 5)}...{upcpool.address.slice(37, 42)}</p>
                    </div>
                  </div>

                  <div className="update__delete">
                    <button className="fa fa-trash" onClick={() => handleOpen(upcpool._id)}></button>
                    <Link
                      to={`/admin/editico/${upcpool._id}`}
                      className="fa fa-pencil-square-o"
                    ></Link>
                  </div>
                </div>
                <div className="media-btm">
                <div className="na">
                  {upcpool.up_pool_raise}
                  <span> {upcpool.symbol}</span>
                </div>
                <div className="radio">Ratio per 1 {upcpool.crypto_type}</div>                
                </div>
                <div className="percentage">
                  <span className="total">{upcpool.total_supply ? (upcpool.distribute_token / upcpool.total_supply).toFixed(4) * 100 : ""}%</span>
                  <span className="sfund">{upcpool.distribute_token}/{upcpool.total_supply} {upcpool.symbol}</span>
                </div>
              </div>
              <div className="text-center tw-btns">
                {
                  upcpool.address ? <NavLink to={`/admin/adduserinwhitelist/${upcpool._id}`} className="detail yellow_btn">
                    Add User in White List
                  </NavLink> : ""
                }
                {/* {upcpool.address ? 
                <NavLink to={`/admin/updatetier/${upcpool.address}`} className="coming-soon">
                Update Tiers Value
                </NavLink>
                : ""} */}

                
                <a href="#comming-soon" className="coming-soon yellow_btn">
                  comming-soon
                </a>


              </div>

            </div>
            </div>
          ))
          : ""}
      </div>


      <div className="upcoming-all updnone">
        {ico.paginatedUpcomming_pool
          ? ico.paginatedUpcomming_pool.map((upcpool) => (
            <div key={upcpool._id} className="inner-box">
              <div className="boxinner-main">
              <div className="list-boxes">
                <div className="media">
                  <div className="client-name">
                    <div className="client-img">
                      <img
                        src={upcpool.images}
                        alt=""
                      />
                    </div>
                    <div className="client-info">
                      <h5>{upcpool.title}</h5>
                      <p>{upcpool.address.slice(0, 5)}...{upcpool.address.slice(37, 42)}</p>
                    </div>
                  </div>
                </div>
                <div className="progressbar-list">
                <div className="media-btm">
                <div className="na">
                  {upcpool.up_pool_raise}
                  <span> {upcpool.symbol}</span>
                </div>
                <div className="radio">Ratio per 1 {upcpool.crypto_type}</div>                     
                </div>
                <div className="percentage">
                  <span className="total">{upcpool.total_supply ? (upcpool.distribute_token / upcpool.total_supply).toFixed(4) * 100 : ""}%</span>
                  <span className="sfund">{upcpool.distribute_token}/{upcpool.total_supply} {upcpool.symbol}</span>
                </div>
              </div>
              <div className="dlt-btnns">
              <div className="update__delete">
              <button className="fa fa-trash" onClick={() => handleOpen(upcpool._id)}></button>
                    <Link
                      to={`/admin/editico/${upcpool._id}`}
                      className="fa fa-pencil-square-o"
                    ></Link>
								</div>
              <div className="text-center tw-btns">  
                <a href="#comming-soon" className="coming-soon yellow_btn">
                  comming-soon
                </a>
              </div>
              </div>
              </div>
            </div>
            </div>
          ))
          : ""}
      </div>
      
      <div>
        {upcomming ? "" : <h2
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
      </div>
    
      <div className="pool_pagination" style={{ display: "flex", justifyContent: "left" }}>
        <Pagination
          count={ico.totalUpcommingPage}
          page={page}
          defaultPage={page}
          color="primary"

          classes={{ ul: classes.ul }}
          onChange={handleChange}
        />
      </div>
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

export default UpcommingPool;
