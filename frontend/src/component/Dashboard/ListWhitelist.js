import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataAPI } from "../../utils/API";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux'
import {
  // uploadwhitelistone,
  // uploadwhitelisttwo,
  // uploadwhitelistthree,
  // uploadwhitelistfour,
  // uploadwhitelistfive,
  // uploadwhitelistsix,
  // uploadwhitelistseven,
  // uploadwhitelisteight,
  // uploadwhitelistnine,

  uploadwhitelistonebulk,
  uploadwhitelisttwobulk,
  uploadwhitelistthreebulk,
  uploadwhitelistfourbulk,
  uploadwhitelistfivebulk,
  uploadwhitelistsixbulk,
  uploadwhitelistsevenbulk,
  uploadwhitelisteightbulk,
  uploadwhitelistninebulk
} from "../../redux/actions/whitelistAction"

//showing list of white list addresses.
const ListWhitelist = () => {
  const [whitelist, setWhitelist] = useState([]);
  const [pool, setPool] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const {auth} = useSelector(state => state)
  const dispatch = useDispatch();
  var name = useParams().name;
  var id = useParams().id;


  var x = 1;
  if (name) {
    var names = name.charAt(0).toUpperCase() + name.slice(1);
  }
  const get_whitelist = () => {
    if (name === "one") {
      getDataAPI(`getwhitelistone/${[id, page]}`).then((res) => setWhitelist(res.data.paginatedlistone, setTotalPage(res.data.totalPage)));
    } else if (name === "two") {
      getDataAPI(`getwhitelisttwo/${[id, page]}`).then((res) => setWhitelist(res.data.paginatedlisttwo, setTotalPage(res.data.totalPage)));
    } else if (name === "three") {
      getDataAPI(`getwhitelistthree/${[id, page]}`).then((res) => setWhitelist(res.data.paginatedlistthree, setTotalPage(res.data.totalPage)));
    } else if (name === "four") {
      getDataAPI(`getwhitelistfour/${[id, page]}`).then((res) => setWhitelist(res.data.paginatedlistfour, setTotalPage(res.data.totalPage)));
    } else if (name === "five") {
      getDataAPI(`getwhitelistfive/${[id, page]}`).then((res) => setWhitelist(res.data.paginatedlistfive, setTotalPage(res.data.totalPage)));
    } else if (name === "six") {
      getDataAPI(`getwhitelistsix/${[id, page]}`).then((res) => setWhitelist(res.data.paginatedlistsix, setTotalPage(res.data.totalPage)));
    } else if (name === "seven") {
      getDataAPI(`getwhitelistseven/${[id, page]}`).then((res) => setWhitelist(res.data.paginatedlistseven, setTotalPage(res.data.totalPage)));
    } else if (name === "eight") {
      getDataAPI(`getwhitelisteight/${[id, page]}`).then((res) => setWhitelist(res.data.paginatedlisteight, setTotalPage(res.data.totalPage)));
    } else if (name === "nine") {
      getDataAPI(`getwhitelistnine/${[id, page]}`).then((res) => setWhitelist(res.data.paginatedlistnine, setTotalPage(res.data.totalPage)));
    }
  }

  useEffect(() => {
    if (name === "one") {
      getDataAPI(`getwhitelistone/${[id, page]}`).then((res) => setWhitelist(res.data.paginatedlistone, setTotalPage(res.data.totalPage)));
    } else if (name === "two") {
      getDataAPI(`getwhitelisttwo/${[id, page]}`).then((res) => setWhitelist(res.data.paginatedlisttwo, setTotalPage(res.data.totalPage)));
    } else if (name === "three") {
      getDataAPI(`getwhitelistthree/${[id, page]}`).then((res) => setWhitelist(res.data.paginatedlistthree, setTotalPage(res.data.totalPage)));
    } else if (name === "four") {
      getDataAPI(`getwhitelistfour/${[id, page]}`).then((res) => setWhitelist(res.data.paginatedlistfour, setTotalPage(res.data.totalPage)));
    } else if (name === "five") {
      getDataAPI(`getwhitelistfive/${[id, page]}`).then((res) => setWhitelist(res.data.paginatedlistfive, setTotalPage(res.data.totalPage)));
    } else if (name === "six") {
      getDataAPI(`getwhitelistsix/${[id, page]}`).then((res) => setWhitelist(res.data.paginatedlistsix, setTotalPage(res.data.totalPage)));
    } else if (name === "seven") {
      getDataAPI(`getwhitelistseven/${[id, page]}`).then((res) => setWhitelist(res.data.paginatedlistseven, setTotalPage(res.data.totalPage)));
    } else if (name === "eight") {
      getDataAPI(`getwhitelisteight/${[id, page]}`).then((res) => setWhitelist(res.data.paginatedlisteight, setTotalPage(res.data.totalPage)));
    } else if (name === "nine") {
      getDataAPI(`getwhitelistnine/${[id, page]}`).then((res) => setWhitelist(res.data.paginatedlistnine, setTotalPage(res.data.totalPage)));
    }
  }, [name, id, page])

  // const uploadBlockchain = () => {
  //   if (name === "one") {
  //     dispatch(uploadwhitelistone(id))
  //     get_whitelist()
  //   } else if (name === "two") {
  //     dispatch(uploadwhitelisttwo(id))
  //     get_whitelist()
  //   } else if (name === "three") {
  //     dispatch(uploadwhitelistthree(id))
  //     get_whitelist()
  //   } else if (name === "four") {
  //     dispatch(uploadwhitelistfour(id))
  //     get_whitelist()
  //   } else if (name === "five") {
  //     dispatch(uploadwhitelistfive(id))
  //     get_whitelist()
  //   } else if (name === "six") {
  //     dispatch(uploadwhitelistsix(id))
  //     get_whitelist()
  //   } else if (name === "seven") {
  //     dispatch(uploadwhitelistseven(id))
  //     get_whitelist()
  //   } else if (name === "eight") {
  //     dispatch(uploadwhitelisteight(id))
  //     get_whitelist()
  //   } else if (name === "nine") {
  //     dispatch(uploadwhitelistnine(id))
  //     get_whitelist()
  //   }
  // }

  const uploadBlockchainBulk = () => {
    if (name === "one") {
      dispatch(uploadwhitelistonebulk(id, auth.token))
      get_whitelist()
    } else if (name === "two") {
      dispatch(uploadwhitelisttwobulk(id, auth.token))
      get_whitelist()
    } else if (name === "three") {
      dispatch(uploadwhitelistthreebulk(id, auth.token))
      get_whitelist()
    } else if (name === "four") {
      dispatch(uploadwhitelistfourbulk(id, auth.token))
      get_whitelist()
    } else if (name === "five") {
      dispatch(uploadwhitelistfivebulk(id, auth.token))
      get_whitelist()
    } else if (name === "six") {
      dispatch(uploadwhitelistsixbulk(id, auth.token))
      get_whitelist()
    } else if (name === "seven") {
      dispatch(uploadwhitelistsevenbulk(id, auth.token))
      get_whitelist()
    } else if (name === "eight") {
      dispatch(uploadwhitelisteightbulk(id, auth.token))
      get_whitelist()
    } else if (name === "nine") {
      dispatch(uploadwhitelistninebulk(id, auth.token))
      get_whitelist()
    }
  }



  useEffect(() => {
    getDataAPI(`getPool/${id}`).then((res) => setPool(res.data));
  }, [id]);

  if (whitelist.length === 0) {
    x = 0;
  }


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

  return (
    <div className="container_cust">
      <div className="right-panel-main wishlist-data">
        <div className="wishlist-head">
          <h2>
            List Whitelist {names}
          </h2>
          <button onClick={() => uploadBlockchainBulk()} className="blockchainupload yellow_btn">upload on blockchain</button>

        </div>
        <div className="completed">
          <table>
            <thead>
              <tr>
                <th>IGO name</th>
                <th>address</th>
                <th className="extrath"></th>
                <th>whitelist status</th>
                {/* <th></th> */}
              </tr>
            </thead>
            {whitelist
              ? whitelist.map((whitelist) => (
                <tbody key={whitelist._id}>
                  <tr>
                    <td>
                      <div className="td-clintimg">
                        <div className="client-img">
                          <img
                            src={pool.images}
                            alt=""
                          />
                        </div>
                        <div className="client-info">
                          <h5>{pool.title}</h5>
                        </div>
                      </div>
                    </td>
                    <td className="day">
                      {name === "one" ? whitelist.white_list1 : ""}{" "}
                      {name === "two" ? whitelist.white_list2 : ""}{" "}
                      {name === "three" ? whitelist.white_list3 : ""}{" "}
                      {name === "four" ? whitelist.white_list4 : ""}{" "}
                      {name === "five" ? whitelist.white_list5 : ""}{" "}
                      {name === "six" ? whitelist.white_list6 : ""}{" "}
                      {name === "seven" ? whitelist.white_list7 : ""}{" "}
                      {name === "eight" ? whitelist.white_list8 : ""}{" "}
                      {name === "nine" ? whitelist.white_list9 : ""}{" "}

                    </td>
                    <td className="sfund"></td>
                    <td className="day">{whitelist.addr_status}</td>
                  </tr>
                </tbody>
              ))
              : ""}
          </table>
        </div>
        <div>
          {x ? "" : <h2
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
        <div className="pool_pagination single-whitelist" style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPage}
            page={page}
            defaultPage={page}
            color="primary"
            classes={{ ul: classes.ul }}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>

  );
};

export default ListWhitelist;
