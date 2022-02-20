import React from "react";
import { Route, Switch, Link, NavLink } from "react-router-dom";
import UpcommingPool from "./UpcommingPool";
import CompletedPool from "./CompletedPool";
import FeaturedPool from "./FeaturedPool";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataAPI } from "../../utils/API";
import GlobalTypes from "../../redux/actions/GlobalTypes";
import plusimag from "../../images/plus-btn.png";
import { getico } from "../../redux/actions/icoAction";
import ListViewPool from "./ListViewPool";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";

//admin ico component for route path.
const AdminICO = () => {
  const [search, setSearch] = useState("");
  const [pools, setPools] = useState([]);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const { ico } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getico(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (search) {
      getDataAPI(`search?title=${search}`)
        .then((res) => setPools(res.data.pool))
        .catch((err) => {
          dispatch({
            type: GlobalTypes.NOTIFY,
            payload: {
              error: err.response.data.msg,
            },
          });
        });
    }
  }, [search, dispatch]);


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

  const featurepoolcomponent = (
    <div id="tabs-1" className="adminpooltp">
      <div className="upcoming-list updblock">
        {ico.paginatedFeatured_pool
          ? ico.paginatedFeatured_pool.map((featured) => (
            <div key={featured._id} className="inner-box">
              <FeaturedPool key={featured._id.toString()} featured={featured} page={page} />
            </div>
          )) : ""}
      </div>

      <div className="upcoming-all updnone">
        {ico.paginatedFeatured_pool
          ? ico.paginatedFeatured_pool.map((pool, i) => (
            <div key={i} className="inner-box">
              <ListViewPool key={i.toString()} pool={pool} />
            </div>
          )) : ""}
      </div>
      <div className="pool_pagination" style={{ display: "flex", justifyContent: "left" }}>
        <Pagination
          count={ico.totalfeaturedPage}
          page={page}
          defaultPage={page}
          color="primary"
          classes={{ ul: classes.ul }}
          onChange={handleChange}
        />
      </div>
    </div>
  )
  return (
    <div className="container_cust">
      <div id="tabs" className="admin">
        <div className="ico-main">
          <div className="admin-title">
            <h2>List of IGO/IDO</h2>
          </div>
          <div className="outer-tbsearch">
            <div className="left-position">
              <div className="tb-search">
                <div className="tb-searchinner">
                  <ul>
                    <li>
                      <NavLink
                        to="/admin/upcommingpool"
                      >
                        Upcoming
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin/completedpool"
                      >
                        Completed
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin/featuredpool"
                      >
                        Featured
                      </NavLink>
                    </li>
                    {/* <li>
                  <NavLink
                    to="/admin/mergecompleted"
                  >
                    merge completed
                  </NavLink>
                </li> */}
                  </ul>
                </div>
                <div className="right-topleft">
                  <div className="search-form">
                    <input
                      type="search"
                      name="search"
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                      placeholder="Search"
                      className="search-bar"
                      autoComplete="off"
                    />
                    <button className="btn" type="submit">
                      <span>
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </span>
                    </button>
                  </div>
                  {search ? (
                    <div className="search__drop">
                      {pools.map((pool) => (
                        <Link key={pool._id} to={`/admin/searchpool/${pool._id}`}>
                          <p className="pool">{pool.title}</p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="right-position">
              <ul>
                <li className="tab-listing">
                  <a href="#gt" className="active list-all">
                    <i className="fa fa-th-large" aria-hidden="true"></i>
                  </a>
                  <a href="#ff" className="list-tab">
                    <i className="fa fa-bars" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <Link to="/admin/createico" className="create-btn yellow_btn">
                    Create IGO
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </div>

        <div className="ico-main tb-view">
          <div className="admin-title">
            <h2>List of IGO/IDO</h2>
            <Link to="/admin/createico" className="create-btn yellow_btn">
              Create IGO
            </Link>
          </div>
          <div className="outer-tbsearch">
            <div className="left-position">
              <div className="tb-search">
                <div className="tb-searchinner">
                  <ul>
                    <li>
                      <NavLink
                        to="/admin/upcommingpool"
                      >
                        Upcoming
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin/completedpool"
                      >
                        Completed
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin/featuredpool"
                      >
                        Featured
                      </NavLink>
                    </li>
                    {/* <li>
                  <NavLink
                    to="/admin/mergecompleted"
                  >
                    merge completed
                  </NavLink>
                </li> */}
                  </ul>
                </div>
                <div className="right-topleft">
                  <div className="search-form">
                    <input
                      type="search"
                      name="search"
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                      placeholder="Search"
                      className="search-bar"
                      autoComplete="off"
                    />
                    <button className="btn" type="submit">
                      <span>
                        {search ? <i className="fa" aria-hidden="true"></i> : <i className="fa fa-search" aria-hidden="true"></i>}
                      </span>
                    </button>
                  </div>
                  {search ? (
                    <div className="search__drop">
                      {pools.map((pool) => (
                        <Link key={pool._id} to={`/admin/searchpool/${pool._id}`}>
                          <p className="pool">{pool.title}</p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ico-main mb-view">
          <div className="admin-title">
            <h2>List of IGO/IDO</h2>
            <Link to="/admin/createico" className="create-btn">
              <img src={plusimag} alt="" />
            </Link>
          </div>
          <div className="outer-tbsearch">
            <div className="left-position">
              <div className="tb-search">
                <div className="tb-searchinner">
                  <ul>
                    <li>
                      <NavLink
                        to="/admin/upcommingpool"
                      >
                        Upcoming
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin/completedpool"
                      >
                        Completed
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin/featuredpool"
                      >
                        Featured
                      </NavLink>
                    </li>
                    {/* <li>
                  <NavLink
                    to="/admin/mergecompleted"
                  >
                    merge completed
                  </NavLink>
                </li> */}
                  </ul>
                </div>
                <div className="right-topleft">
                  <div className="search-form">
                    <input
                      type="search"
                      name="search"
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                      placeholder="Search"
                      className="search-bar"
                      autoComplete="off"
                    />
                    <button className="btn" type="submit">
                      <span>
                        {search ? <i className="fa" aria-hidden="true"></i> : <i className="fa fa-search" aria-hidden="true"></i>}
                      </span>
                    </button>
                  </div>
                  {search ? (
                    <div className="search__drop">
                      {pools.map((pool) => (
                        <Link key={pool._id} to={`/admin/searchpool/${pool._id}`}>
                          <p className="pool">{pool.title}</p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <Switch>
          <Route exact path="/admin/upcommingpool">
            <div id="tabs-1" className="adminpooltp">
              <UpcommingPool />
            </div>
          </Route>
          <Route exact path="/admin/completedpool">
            <div id="tabs-1" className="adminpooltp">
              <div className="upcoming-list updblock">
                {ico.paginatedcompleted_pool
                  ? ico.paginatedcompleted_pool.map((pool) => (
                    <div key={pool._id} className="inner-box">
                      <CompletedPool pool={pool} page={page} />
                    </div>
                  ))
                  : ""}
              </div>

              <div className="upcoming-all updnone">
                {ico.paginatedcompleted_pool
                  ? ico.paginatedcompleted_pool.map((pool) => (
                    <div key={pool._id} className="inner-box">
                      <ListViewPool pool={pool} />
                    </div>
                  ))
                  : ""}
              </div>
              <div className="pool_pagination" style={{ display: "flex", justifyContent: "left" }}>
                <Pagination
                  count={ico.totalcompletedPage}
                  page={page}
                  defaultPage={page}
                  color="primary"
                  classes={{ ul: classes.ul }}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Route>
          <Route exact path="/admin/featuredpool">
            {featurepoolcomponent}
          </Route>

        </Switch>
      </div>

    </div>
  );
};

export default AdminICO;
