import React, { useEffect, useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import $ from "jquery";
import "./AdminLayout.css";
import AdminHeader from "./AdminHeader";
import CreateICO from "./CreateICO";
import DeployNewICO from "./DeployNewICO";
import TransferOwnership from "./TransferOwnership";
import UpdateTier from "./UpdateTier";
import AdminICO from "./AdminICO";
import AddUserInWhiteList from "./AddUserInWhiteList";
import ReadWhiteList from "./ReadWhiteList";
import ListWhitelist from "./ListWhitelist"
import SearchPool from "./SearchPool"
import ClaimTokenLIsting from "./ClaimTokenLIsting"
//import Sidebar from "./Sidebar";
import CreatedCompletedPoolForm from "./CreatedCompletedPoolForm"
import MergeCompletedPool from "./MergeCompletedPool"
import MergeCompletedListPool from "./MergeCompletedListPool"
import { getcompletedpoolpagination } from "../../redux/actions/completedPoolAction";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import VestingDetails from "./VestingDetails"
import ContractDetail from "./ContractDetail"



//admin layout component
const AdminLayout = () => {
  const dispatch = useDispatch();

  const { completedpoolredcr } = useSelector((state) => state);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getcompletedpoolpagination(page));
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


  useEffect(() => {
    $(document).ready(function () {
      $(".list-tab").click(function () {
        $(".upcoming-list").addClass("upcoming-list updnone");
        $(".upcoming-list").removeClass("updblock");
        $(".upcoming-all").addClass("upcoming-all updblock");
        $(".upcoming-all").removeClass("updnone");
      });

      $(".list-all").click(function () {
        $(".upcoming-list").addClass("upcoming-list updblock");
        $(".upcoming-list").removeClass("updnone");
        $(".upcoming-all").addClass("upcoming-all updnone");
        $(".upcoming-all").removeClass("updblock");
      });

      $(".dropbtn").click(function () {
        $(".dropdown-content").addClass("show");
      });

      $(".list-tab").click(function () {
        $(".list-all").removeClass("active");
        $(".list-tab").addClass("active");
      });

      $(".list-all").click(function () {
        $(".list-tab").removeClass("active");
        $(".list-all").addClass("active");
      });
    });
  });


  return (
    <div className="dashboard">

      <AdminHeader />
      <div className="right-panal">


        <Switch>
          <Route exact path="/admin/upcommingpool">

            <AdminICO />
          </Route>

          <Route exact path="/admin/mergecompleted">
            <div className="container_cust">
              <div id="tabs" className="admin">
                <div className="outer-tbsearch">
                  <div className="left-position">

                  </div>
                  <div className="right-position">
                    <ul>
                      <li className="tab-listing">
                        <a href="#list" className="active list-all">
                          <i className="fa fa-th-large" aria-hidden="true" ></i>
                        </a>
                        <a href="#tab" className="list-tab">
                          <i className="fa fa-bars" aria-hidden="true"></i>
                        </a>
                      </li>

                      <li>
                        <Link to="/admin/createcompletedpool" className="create-btn yellow_btn">
                          create completed pool
                        </Link>
                      </li>

                    </ul>
                  </div>
                </div>
                <br />
                <br />

                <div id="tabs-1" className="adminpooltp">
                  <div className="upcoming-list updblock">
                    {completedpoolredcr.paginatedcompleted_pool
                      ? completedpoolredcr.paginatedcompleted_pool.map((pool) => (
                        <div key={pool._id} className="inner-box">
                          <MergeCompletedPool pool={pool} />
                        </div>)) : ""}
                  </div>

                  <div className="upcoming-all updnone">
                    {completedpoolredcr.paginatedcompleted_pool
                      ? completedpoolredcr.paginatedcompleted_pool.map((pool) => (
                        <div key={pool._id} className="inner-box">
                          <MergeCompletedListPool pool={pool} />
                        </div>)) : ""}
                  </div>
                </div>

                <div className="pool_pagination" style={{ display: "flex", justifyContent: "left" }}>
                  <Pagination
                    count={completedpoolredcr.totalcompletedPage}
                    page={page}
                    defaultPage={page}
                    color="primary"
                    classes={{ ul: classes.ul }}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </Route>

          <Route exact path="/admin/completedpool">
            <AdminICO />
          </Route>
          <Route exact path="/admin/featuredpool">
            <AdminICO />
          </Route>
          <Route exact path="/admin/createico">
            <CreateICO />
          </Route>
          <Route exact path="/admin/createcompletedpool">
            <CreatedCompletedPoolForm />
          </Route>
          <Route exact path="/admin/deploynewico">
            <DeployNewICO />
          </Route>
          <Route exact path="/admin/transferownership/:id">
            <TransferOwnership />
          </Route>
          <Route exact path="/admin/updatetier">
            <UpdateTier />
          </Route>
          <Route exact path="/admin/editico/:id">
            <CreateICO />
          </Route>
          <Route exact path="/admin/updatecompletedpool/:id">
            <CreatedCompletedPoolForm />
          </Route>
          <Route exact path="/admin/adduserinwhitelist/:id">
            <AddUserInWhiteList />
          </Route>
          <Route exact path="/admin/readwhitelist/:address">
            <ReadWhiteList />
          </Route>
          <Route exact path="/admin/listwhitelist/:name/:id">
            <ListWhitelist />
          </Route>
          <Route exact path="/admin/searchpool/:id">
            <SearchPool />
          </Route>
          <Route exact path="/admin/claimtokenlisting/:address">
            <ClaimTokenLIsting />
          </Route>
          <Route exact path="/admin/vestingDetails">
            <VestingDetails />
          </Route>
          <Route exact path="/admin/contractdetail">
            <ContractDetail />
          </Route>
        </Switch>
      </div>

    </div>
  );
};

export default AdminLayout;
