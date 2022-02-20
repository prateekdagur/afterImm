import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom'
import GlobalTypes from "../../redux/actions/GlobalTypes";
import { getDataAPI } from "../../utils/API";
import { gettoken } from "../../redux/actions/claimTokenAction"
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";

//claim token listing component.
const ClaimTokenLIsting = () => {
    const [search, setSearch] = useState("");
    const [pools, setPools] = useState([]);
    const { claimtoken } = useSelector((state) => state);
    const [page, setPage] = useState(1);

    const address = useParams().address
    const dispatch = useDispatch();

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
                    alert(err.response.data.msg)
                });
        }

    }, [search, dispatch]);

    useEffect(() => {
        if (address) {
            dispatch(gettoken(address, page))
        }
    }, [dispatch, address, page])
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
        <div>
            <br />
            <div className="search-form">
                <input
                    type="search"
                    name="search"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    placeholder="Search"
                    className="claimsearch-bar"
                    autocomplete="off"
                />
                <button className="btn" type="submit">
                    <span>
                        {search ? <i className="fa" aria-hidden="true"></i> : <i className="fa" aria-hidden="true"></i>}
                    </span>
                </button>
            </div>
            {search ? (
                <div className="search__drop">
                    {pools.map((pool) => (
                        <Link key={pool._id} to={`/admin/claimtokenlisting/${pool.address}`}>
                            <p className="pool">{pool.title}</p>
                        </Link>
                    ))}
                </div>
            ) : (
                ""
            )}

            <br />
            <div class="completed">
                <table>
                    <thead>
                        <tr>
                            <th>user address</th>
                            <th>value</th>
                            <th></th>
                            <th>claim status</th>
                            <th></th>
                        </tr>
                    </thead>

                    {claimtoken.claimToken
                        ? claimtoken.claimToken.map((claimtoken) => (
                            <tbody>
                                <tr>
                                    <td>

                                        <div class="client-info">
                                            <h5>{claimtoken.from_address}</h5>
                                        </div>
                                    </td>
                                    <td class="day">
                                        {claimtoken.value}
                                    </td>
                                    <td class="sfund"></td>
                                    <td class="day">{claimtoken.claim_status}</td>
                                </tr>
                            </tbody>
                        ))
                        : ""}

                </table>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Pagination
                        count={claimtoken.totalpage}
                        page={page}
                        defaultPage={page}
                        color="Primary"
                        classes={{ ul: classes.ul }}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>

    )
}

export default ClaimTokenLIsting
