import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteico, getico, dumpEvent } from "../../redux/actions/icoAction";
//import { getstoreClaim, getsendClaimToken } from "../../redux/actions/claimTokenAction";
import Modal from "@material-ui/core/Modal";
import BusdIDOabi from "../busdIDO.json";
import { SeedifyFundsContractAbi } from "../abis";
import Web3 from "web3";


//web3 provider.
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://bsc-dataseed.binance.org/",
  ),
);

//completed pool component.
const CompletedPool = ({ pool, page }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state)
  const [number2, setNumber2] = useState();
  const [number1, setNumber1] = useState();

  var contractAddr = '';
  if (pool.address) {
    contractAddr = pool.address.toUpperCase();
  }

  useEffect(() => {
    //Consuming smart contract ABI and contract address.
    async function simpleContract() {
      try {
        if (contractAddr) {
          const SimpleContract = new web3.eth.Contract(
            pool.crypto_type === "BUSD"
              ? BusdIDOabi
              : SeedifyFundsContractAbi,
            contractAddr
          );
          //Getting total bnb from blockchain
          let totalTokenFxn = pool.crypto_type === "BUSD" ? "totalBUSDReceivedInAllTier" : "totalBnbReceivedInAllTier";

          const result = await SimpleContract.methods[totalTokenFxn]().call()
          //Getting max cap from blockchain
          const total = await SimpleContract.methods.maxCap().call();
          setNumber2(result / 10 ** 18);
          setNumber1((result / 10 ** 18 / (total / 10 ** 18)) * 100);
        }
      } catch (err) {
        console.log(err);
      }
    }
    simpleContract();
  }, [contractAddr, pool.crypto_type]);

  var num = Math.ceil(number1 / 2)
  var full = "";
  if (num === 50) {
    full = 'fullupload'
  }

  // useEffect(() => {
  //   var classs = document.getElementById('list');
  //   if(classs === "upcoming-list"){
  //     setListView(false)
  //   }else{
  //     setListView(true)
  //   }   
  // },[listview])

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


  const [open, setOpen] = useState(false);
  const [Id, setId] = useState('')
  const handleOpen = (id) => {
    setId(id)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const deletePool = () => {
  //   useCallback(async() => {
  //     await dispatch(deleteico(Id, auth))
  //   }, [dispatch])

  //   setOpen(false)
  //   //window.location.reload()
  // }


  const deletePool = useCallback((Id, auth) => {
    dispatch(deleteico(Id, auth))
    setOpen(false)
    dispatch(getico(page));
  }, [dispatch, page])

  const dumped = (addr) => {
    dispatch(dumpEvent(addr))
  }

  //window.location.reload()

  const body = (
    <div className="paper">
      <div className="paper-inner">
        <div className="upload-cancel paper-btns">
          <a className=" paper_button" href="#cancel" onClick={() => handleClose()} >
            Cancel
          </a>
          <a className="coming-soon paper_button" href="#confirm" onClick={() => { deletePool(Id, auth) }}>
            Confirm
          </a>
        </div>
      </div>
    </div>
  );


  var allocation = number2 * pool.up_pool_raise;

  return (
    <div>
      <div className="boxinner-main">
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
                <p>{pool.address.slice(0, 5)}...{pool.address.slice(37, 42)}</p>
              </div>
            </div>


            <div className="update__delete">
              <button className="fa fa-angle-double-down" onClick={() => dumped(pool.address)} ></button>
              <button className="fa fa-trash" onClick={() => handleOpen(pool._id)} ></button>
              <Link
                to={`/admin/editico/${pool._id}`}
                className="fa fa-pencil-square-o"
              ></Link>
            </div>

          </div>
          <div className="media-btm">
            <div className="na">
              {pool.up_pool_raise}
              <span> {pool.symbol}</span>
            </div>
            <div to="#c" className="radio">Ratio per 1 {pool.crypto_type}</div>
          </div>
          <div className={`battery ${full}`}>
            {num
              ? [...Array(num)].map((x) => (
                <div className="bar active" data-power="10" key={x}></div>
              ))
              : ""}
          </div>
          <div className="percentage">
            {<span className="total">{number1 ? number1.toFixed(2) : "0"}%</span>}
            <span className="sfund">{allocation ? allocation.toFixed(2) : "0"}/{pool.total_supply} {pool.symbol}</span>
          </div>
        </div>

        <div className="text-center tw-btns">
          {
            pool.address ? <Link to={`/admin/adduserinwhitelist/${pool._id}`} className="detail yellow_btn">
              Add User in White List
            </Link> : ""
          }
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
                 */}
         

          {pool.address ?
            <a href="#download-csv" className="coming-soon yellow_btn">
              Completed Pool
            </a>
            : ""}
        </div>
      </div>

      <div>
        {/* <a href={`/exportcsv/${title}.csv`} download={`${title}.csv`} id='downloadallocation'> </a> */}
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

export default CompletedPool;

