import React, { useState, useEffect, memo } from "react";
import { useParams, Link } from "react-router-dom";
import { web3 } from "../../redux/actions/metamaskAction";

import { BrowserRouter as Router } from "react-router-dom";
import { getDataAPI } from "../../utils/API";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import Modal from "@material-ui/core/Modal";
import Header from "../Home/Header";

import "./PoolDetail.css";
import PoolInformation from "./PoolInformation";
import AboutProject from "./AboutProject";
import TelegramIcon from "@material-ui/icons/Telegram";
import LanguageIcon from "@material-ui/icons/Language";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";

//import img1 from "../../images/img1.png";
import txprogress from "../../images/loading.gif";
import SeedifyFundsContractAbi from "../abis.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import BusdIDOabi from "../busdIDO.json";
import tokenABI from "../tokenABI.json";
import Footer from "../Home/footer";
import axios from "axios";
import {CHAIN_ID, RPC_URL, CONTRACT_INSTANCE} from "../../utils/config";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        CHAIN_ID: RPC_URL,
      },
      chainId: CHAIN_ID,
      network: "binance",
    },
  },
};
//Web3Modal.
const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
});

const tokenContractInstance = new web3.eth.Contract(
  tokenABI,
  web3.utils.toChecksumAddress(
    CONTRACT_INSTANCE
  )
);


toast.configure();
const PoolDetail = () => {
  const { metamask } = useSelector((state) => state);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // use state hooks to set and get values.
  const [pool_detail, setPool_detail] = useState("");
  const [number1, setNumber1] = useState();
  const [number2, setNumber2] = useState();
  const [amount, setAmount] = useState();
  const [whichtier, setwhichtier] = useState(0);
  const [txloader, settxloader] = useState(false);
  // const [checktierloader, setchecktierloader] = useState(false)
  const [minvalue, setMinValue] = useState();
  const [tokenAllowance, setTokenAllowance] = useState();
  const [userBalance, setUserBalance] = useState();
  const [totalTokenSupply, setTotalTokenSupply] = useState("");
  const [approvecheck, setApprovecheck] = useState("");
  //var checkvalid = 0;
  const id = useParams().id;
  const name = useParams().name;
  var y = 1;
  if (name === "upcomming") {
    y = 1;
  }

  useEffect(() => {
    // Getting res from backend api and setting to the setPool detail.
    getDataAPI(`getPool/${id}`).then((res) => setPool_detail(res.data));
  }, [id]);

  var contractAddr = "";
  if (pool_detail.address) {
    contractAddr = web3.utils.toChecksumAddress(pool_detail.address);
  }

  useEffect(() => {
    const checkTokensApproval = async () => {
      // const web3 = new Web3(provider);
      // Get balance of connected address.
      if (web3 && metamask.address) {
        var balance = await web3.eth.getBalance(metamask.address);
        if (pool_detail.crypto_type === "BUSD" && metamask.address) {
          const result = web3.utils.fromWei(
            await tokenContractInstance.methods
              .allowance(metamask.address, contractAddr)
              .call()
          );
          setTokenAllowance(result);
          const totalSupply = web3.utils.fromWei(
            await tokenContractInstance.methods.totalSupply().call()
          );
          setTotalTokenSupply(totalSupply);
          balance = await tokenContractInstance.methods
            .balanceOf(metamask.address)
            .call();
        }
        setUserBalance(balance);
      }
    };
    checkTokensApproval();
  }, [metamask.address, pool_detail, contractAddr]);

  useEffect(() => {
    //Consuming smart contract ABI and contract address.
    if (contractAddr) {
      async function TotalRaised() {
        let totalTokenFxn = pool_detail.crypto_type === "BUSD" ? "totalBUSDReceivedInAllTier" : "totalBnbReceivedInAllTier";
        let SimpleContract = new web3.eth.Contract(
          pool_detail.crypto_type === "BUSD"
            ? BusdIDOabi
            : SeedifyFundsContractAbi,
          contractAddr
        );
        //Getting max cap from blockchain
        let total = await SimpleContract.methods.maxCap().call();
        let MAX_CAP = parseFloat(web3.utils.fromWei(total, 'ether'))
        try {
          //Getting total bnb from blockchain         
          const result = await SimpleContract.methods[totalTokenFxn]().call()

          setNumber2(parseFloat(web3.utils.fromWei(result, 'ether')));
          setNumber1((parseFloat(web3.utils.fromWei(result, 'ether')) / (MAX_CAP)) * 100);

        } catch (err) {
          console.log(err);
        }

      }
      TotalRaised();

    }

  }, [contractAddr, pool_detail.crypto_type]);

  useEffect(() => {
    if (contractAddr) {
      let totalTokenFxn = pool_detail.crypto_type === "BUSD" ? "totalBUSDReceivedInAllTier" : "totalBnbReceivedInAllTier";
      let SimpleContract = new web3.eth.Contract(
        pool_detail.crypto_type === "BUSD"
          ? BusdIDOabi
          : SeedifyFundsContractAbi,
        contractAddr
      );
      //Getting max cap from blockchain

      setInterval(async function () {
        //Getting max cap from blockchain
        let total = await SimpleContract.methods.maxCap().call();
        let MAX_CAP = parseFloat(web3.utils.fromWei(total, 'ether'))
        const result = await SimpleContract.methods[totalTokenFxn]().call()

        //Getting max cap from blockchain
        setNumber2(parseFloat(web3.utils.fromWei(result, 'ether')));
        setNumber1((parseFloat(web3.utils.fromWei(result, 'ether')) / (MAX_CAP)) * 100);
      }, 20000);
    }
  }, [contractAddr, pool_detail.crypto_type]);

  //function for transaction from metamask.

  const transactionMetamask = async () => {
    try {
      handleClose();
      // use web3 function to convert to wei , removing 10**18 multiplier
      const avalue = web3.utils.toWei(amount.toString());
      const totalTokenFxn = pool_detail.crypto_type === "BUSD" ? "totalBUSDReceivedInAllTier" : "totalBnbReceivedInAllTier";

      const SimpleContract = new web3.eth.Contract(
        pool_detail.crypto_type === "BUSD"
          ? BusdIDOabi
          : SeedifyFundsContractAbi,
        contractAddr
      )
      let total = await SimpleContract.methods.maxCap().call();
      let MAX_CAP = parseFloat(web3.utils.fromWei(total, 'ether'))
      // First validation
      const totalAmountReceivedInAllTier = await SimpleContract.methods[totalTokenFxn]().call()
      const total_amount_in_all_tier = parseFloat(web3.utils.fromWei(totalAmountReceivedInAllTier, 'ether'));
      if ((parseFloat(total_amount_in_all_tier) + parseFloat(amount)) > MAX_CAP) {
        return toast.info("Purchase would exceed max cap!", { position: toast.POSITION.TOP_CENTER });

      }

      // check for min allocation.
      if (amount >= minvalue && whichtier > 0) {
        // Second validation
        const tierDetail = await SimpleContract.methods.tierDetails(whichtier).call()
        const tier_max_cap = parseFloat(web3.utils.fromWei(tierDetail.maxTierCap, 'ether'));
        const total_amount = parseFloat(web3.utils.fromWei(tierDetail.amountRaised, 'ether'));

        if ((parseFloat(total_amount) + parseFloat(amount)) > tier_max_cap) {
          return toast.info("Purchase would exceed Tier max cap!", { position: toast.POSITION.TOP_CENTER });
        }

        // Third validation
        const max_Alloca_Per_User = parseFloat(web3.utils.fromWei(tierDetail.maxUserCap, 'ether'));
        const buyInTier = await SimpleContract.methods.userDetails(metamask.address).call()
        const buy_In_Tier = parseFloat(web3.utils.fromWei(buyInTier.investedAmount, 'ether'));

        if ((buy_In_Tier + parseFloat(amount)) > max_Alloca_Per_User) {
          return toast.info("You are investing more than your tier limit!", { position: toast.POSITION.TOP_CENTER })

        }
      }
      else {
        return toast.info("Amount must be greater than min tier's allocation", {
          position: toast.POSITION.TOP_CENTER,
        });
      }

      const provider = window.provider;

      const chainid = provider.chainId;
      //check for BSC Mainnet
      if (
        chainid === "0x38" ||
        chainid === 56 ||
        chainid === "0x61" ||
        chainid === 97
      ) {
        if (+userBalance < +avalue) {
          return toast.info(
            `Not enough ${pool_detail.crypto_type === "BUSD" ? "BUSD" : "BNB"
            } balance`,
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        }
        const address = window.addressselected;

        //loader start before getting data.
        settxloader(true);
        if (pool_detail.crypto_type === "BUSD") {
          await SimpleContract.methods
            .buyTokens(avalue)
            .send({ from: metamask.address })
            .on("transactionHash", (hash) => { })
            .on("receipt", (receipt) => {
              onReciept(receipt);
            })
            .on("error", (error) => {
              onError(error);
            });
        } else {
          const txstatus = await web3.eth.sendTransaction({
            to: pool_detail.address,
            from: address,
            value: avalue,
          });
          if (txstatus.status) {
            // loader stop after getting data.
            onReciept(txstatus);
          } else {
            onError();
          }
        }
      } else {
        //Clearing cache to get metamask connection pop up.
        await web3Modal.clearCachedProvider();
        toast.info("Please switch to Binance Smart Chain", {
          position: toast.POSITION.TOP_CENTER,
        });
      }

    } catch (err) {
      console.log(err);
      settxloader(false);
      return {
        connectedStatus: false,
        status: toast.error("Transaction reverted, try again.", {
          position: toast.POSITION.TOP_CENTER,
        }),
      };
    }
  };

  const onReciept = (txstatus) => {
    settxloader(false);
    var hash = `https://bscscan.com/tx/${txstatus.transactionHash}`;
    var label = "View your transaction";
    const CustomToastWithLink = () => (
      <div style={{ textAlign: "center" }}>
        Transaction confirmed! <br />
        <Router>
          <Link
            target={"_blank"}
            style={{ color: "#fff", textDecoration: "underline" }}
            to={{ pathname: hash }}
          >
            {label}
          </Link>
        </Router>
      </div>
    );
    toast.info(CustomToastWithLink, { position: toast.POSITION.TOP_CENTER });
  };
  const onError = () => {
    settxloader(false);
    return toast.error("Transaction Failed!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };


  //finally getting white list data and setting state accordingly to get confirm amount modal pop up.
  const checktierswhitelist = async (tier_value) => {
    if (!metamask.address) {
      return toast.info("Your wallet is not connected!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    //const totalTokenFxn = pool_detail.crypto_type === "BUSD" ? "totalBUSDReceivedInAllTier" : "totalBnbReceivedInAllTier";

    const SimpleContract = new web3.eth.Contract(
      pool_detail.crypto_type === "BUSD"
        ? BusdIDOabi
        : SeedifyFundsContractAbi,
      contractAddr
    )

    var investment = "";
    var investedamount = "";
    investment = await SimpleContract.methods.userDetails(metamask.address).call()
    investedamount = parseFloat(web3.utils.fromWei(investment.investedAmount, 'ether'));

    //Switch cases according to tiers.
    switch (tier_value.tier) {
      case 1:
        setwhichtier(1);
        setAmount(pool_detail.max_allocation_tierone - investedamount);
        setMinValue(pool_detail.min_allocation_tierone);
        setOpen(true);
        break;
      case 2:
        setwhichtier(2);
        setAmount(pool_detail.max_allocation_tiertwo - investedamount);
        setMinValue(pool_detail.min_allocation_tiertwo);
        setOpen(true);
        break;
      case 3:
        setwhichtier(3);
        setAmount(pool_detail.max_allocation_tierthree - investedamount);
        setMinValue(pool_detail.min_allocation_tierthree);
        setOpen(true);
        break;
      case 4:
        setwhichtier(4);
        setAmount(pool_detail.max_allocation_tierfour - investedamount);
        setMinValue(pool_detail.min_allocation_tierfour);
        setOpen(true);
        break;
      case 5:
        setwhichtier(5);
        setAmount(pool_detail.max_allocation_tierfive - investedamount);
        setMinValue(pool_detail.min_allocation_tierfive);
        setOpen(true);
        break;
      case 6:
        setwhichtier(6);
        setAmount(pool_detail.max_allocation_tiersix - investedamount);
        setMinValue(pool_detail.min_allocation_tiersix);
        setOpen(true);
        break;
      case 7:
        setwhichtier(7);
        setAmount(pool_detail.max_allocation_tierseven - investedamount);
        setMinValue(pool_detail.min_allocation_tierseven);
        setOpen(true);
        break;
      case 8:
        setwhichtier(8);
        setAmount(pool_detail.max_allocation_tiereight - investedamount);
        setMinValue(pool_detail.min_allocation_tiereight);
        setOpen(true);
        break;
      case 9:
        setwhichtier(9);
        setAmount(pool_detail.max_allocation_tiernine - investedamount);
        setMinValue(pool_detail.min_allocation_tiernine);
        setOpen(true);
        break;
      default:
        return toast.info("You are not whitelisted for this IGO", {
          position: toast.POSITION.TOP_CENTER,
        });
    }
  };

  if (pool_detail.start_date) {
    var closed = 0;
    var closesIn = 0;
    var startIn = 0;
    var filled = 0;
    var date = new Date();
    var now_utc = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );

    var start = pool_detail.start_date;
    var end = pool_detail.end_date;
    if (number1 > "99.98") {
      startIn = 0;
      closesIn = 0;
      closed = 0;
      filled = 1;
      y = 1;
    } else if (end < now_utc) {
      closed = 1;
      y = 1;
    } else if (now_utc < start) {
      startIn = 1;
      y = 1;
    } else if (end >= now_utc && now_utc >= start) {
      closesIn = 1;
      startIn = 0;
      y = 0;
    } else {
      startIn = 0;
      closesIn = 0;
      y = 1;
    }
  }

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const body = () => {

    return (
      <div className="paper">
        <div className="paper-inner">
          <div className="paper-head">
            <h2 className="paper_h2" id="simple-modal-title">
              Buy Token
            </h2>
            <span onClick={handleClose}>
              <i class="fa fa-times" aria-hidden="true"></i>
            </span>
          </div>
          <p className="amt">
            Enter amount in{" "}
            {pool_detail.crypto_type === "BUSD" ? "BUSD" : "BNB"} :{" "}
          </p>
          <input
            className="paper_input"
            type="number"
            min="0"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />{" "}
          <button
            className="paper_button"
            onClick={() => transactionMetamask()}
          >
            Confirm
          </button>
        </div>
      </div>
      //<br />
    );
  }


  const checkandApproveToken = async () => {
    const tierdata = await getDataAPI(`csv_get/${[id, metamask.address.toLowerCase()]}`)


    if (tierdata.data.tier > 0) {
      if (pool_detail.distribution_type === 'SOLANA_BASED') {
        const netWork = await axios.get(
          `https://snapshotapi.seedify.fund/api/v1/block/check/${metamask.address}`,
        );
        if (netWork.data.data.kycStatus && netWork.data.data.data.networks.length) {
          approveTokens();
        } else {
          return toast.info("Your solana wallet address is not added!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else {
        approveTokens();
      }
    }
    else {
      return toast.info("You are not whitelisted for this IGO", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

  }


  const approveTokens = async () => {
    const tokenContractInstance = new web3.eth.Contract(
      tokenABI,
      web3.utils.toChecksumAddress(
        CONTRACT_INSTANCE
      )
    );
    settxloader(true);
    await tokenContractInstance.methods
      .approve(contractAddr, web3.utils.toWei(totalTokenSupply).toString())
      .send({ from: metamask.address })
      .on("transactionHash", (hash) => {
        // onTransactionHash(hash);
        console.log(hash);
      })
      .on("receipt", (receipt) => {
        settxloader(false);
        setTokenAllowance(1);
      })
      .on("error", (error) => {
        onError(error);
      });
  };

  const checkTierAddress = async () => {
    await getDataAPI(`csv_get/${[id, metamask.address]}`).then((res) =>
      checktierswhitelist(res.data)
    );
  };
  const [startTime, setStartTime] = useState("");
  const [startTimeMobile, setStartTimeMobile] = useState("");

  //setting time counter.
    setInterval(function () {
      var date = new Date();
      var now_utc = Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
      );

      var start = pool_detail.start_date;
      var end = pool_detail.end_date;
      if (number1 > "99.98") {
        startIn = 0;
        closesIn = 0;
        closed = 0;
        filled = 1;
        y = 1;
      } else if (end < now_utc) {
        closed = 1;
        y = 1;
      } else if (now_utc < start) {
        startIn = 1;
        y = 1;
      } else if (end >= now_utc && now_utc >= start) {
        closesIn = 1;
        startIn = 0;
        y = 0;
        setApprovecheck(0)
      } else {
        startIn = 0;
        closesIn = 0;
        y = 1;
      }


      var closes_in_days = "";
      var closes_in_hours = "";
      var closes_in_minutes = "";
      var closes_seconds = "";
      var desktopTimer = "";
      var mobileTimer = "";
      var closes_in_sec = "";
      var approvetime = ""
      if (pool_detail.start_date && startIn) {
        start = pool_detail.start_date;
        closes_in_sec = (start - now_utc) / 1000;
        approvetime = closes_in_sec / 60


        closes_in_days = Math.floor(closes_in_sec / (3600 * 24));

        closes_in_sec -= closes_in_days * 86400;

        closes_in_hours = Math.floor(closes_in_sec / 3600) % 24;
        closes_in_sec -= closes_in_hours * 3600;

        closes_in_minutes = Math.floor(closes_in_sec / 60) % 60;
        closes_in_sec -= closes_in_minutes * 60;

        closes_seconds = Math.floor(closes_in_sec % 60);

        desktopTimer = `${closes_in_days} days: ${closes_in_hours} hours: ${closes_in_minutes} minutes: ${closes_seconds} seconds`;
        mobileTimer = `${closes_in_days} d: ${closes_in_hours} h: ${closes_in_minutes} m: ${closes_seconds} s`;

        setStartTime(desktopTimer);
        setStartTimeMobile(mobileTimer);
        if (approvetime <= 15 && approvetime > 0) {
          setApprovecheck(1)
        }
        else {
          setApprovecheck(0)
        }
      }

      if (pool_detail.end_date && closesIn) {
        end = pool_detail.end_date;
        closes_in_sec = (end - now_utc) / 1000;

        closes_in_days = Math.floor(closes_in_sec / (3600 * 24));

        closes_in_sec -= closes_in_days * 86400;

        closes_in_hours = Math.floor(closes_in_sec / 3600) % 24;
        closes_in_sec -= closes_in_hours * 3600;

        closes_in_minutes = Math.floor(closes_in_sec / 60) % 60;
        closes_in_sec -= closes_in_minutes * 60;

        closes_seconds = Math.floor(closes_in_sec % 60);

        desktopTimer = `${closes_in_days} days: ${closes_in_hours} hours: ${closes_in_minutes} minutes: ${closes_seconds} seconds`;
        mobileTimer = `${closes_in_days}d: ${closes_in_hours}h: ${closes_in_minutes}m: ${closes_seconds}s`;

        setStartTime(desktopTimer);
        setStartTimeMobile(mobileTimer);
        if (closes_in_days === 0 && closes_in_hours === 0 && closes_in_minutes === 0 && closes_seconds === 0) {
          y = 1;
        }
      }
    }, 1000);



  var allocation = number2 * pool_detail.up_pool_raise;
  var num = Math.ceil(number1 / 2);
  var full = "";
  if (num === 50) {
    full = "fullupload";
  }

  var progressBar = [];
  for (let i = 0; i < num; i++) {
    progressBar.push(i)
  }

  return (
    <div>
      <Header />
      <div
        className="loader"
        style={{
          color: "white",
          top: "50%",
          left: "0",
          right: "0",
          margin: "0 auto",
          zIndex: 50,
        }}
      >
        {/* {checktierloader && <img src={txprogress} alt="in progress..." className="transaction_progress_loader" />} */}
        {txloader && (
          <img
            src={txprogress}
            alt="transaction in progress..."
            className="transaction_progress_loader"
          />
        )}
        {txloader && <p>Transaction in progress...</p>}
      </div>
      <div className="pool_detail_banner">
        <div className="container_cust">
          <div className="inner_pool_detail_banner">
            <div className="left_ban">
              <div className="ti_tle">
                <img src={pool_detail.images} alt="" />
                <div className="socia_grd">
                  <div>
                    <h3>{pool_detail.title}</h3>

                    <p>{pool_detail.content}</p>
                  </div>
                  <div className="socia_l">
                    <ul>
                      {pool_detail.twitter_link ? (
                        <li className="nav-item ">
                          <a
                            className="nav-link"
                            href={pool_detail.twitter_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>
                              <i
                                className="fa fa-twitter"
                                aria-hidden="true"
                              ></i>
                            </span>{" "}
                          </a>
                        </li>
                      ) : (
                        ""
                      )}
                      {pool_detail.medium_link ? (
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href={pool_detail.medium_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>
                              <i
                                className="fa fa-medium"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </a>
                        </li>
                      ) : (
                        ""
                      )}
                      {pool_detail.telegram_link ? (
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href={pool_detail.telegram_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {" "}
                            <TelegramIcon />
                          </a>
                        </li>
                      ) : (
                        ""
                      )}
                      {pool_detail.browser_web_link ? (
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href={pool_detail.browser_web_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {" "}
                            <LanguageIcon />
                          </a>
                        </li>
                      ) : (
                        ""
                      )}
                      {pool_detail.youtube ? (
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href={pool_detail.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {" "}
                            <YouTubeIcon />
                          </a>
                        </li>
                      ) : (
                        ""
                      )}
                      {pool_detail.instagram ? (
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href={pool_detail.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {" "}
                            <InstagramIcon />
                          </a>
                        </li>
                      ) : (
                        ""
                      )}
                      {pool_detail.discord ? (
                        <li className="nav-item ">
                          <a
                            className="nav-link"
                            href={pool_detail.discord}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>
                              <i className="fa fa-discord" area-hidden="true"></i>
                            </span>{" "}
                          </a>
                        </li>
                      ) : (
                        ""
                      )}
                      {pool_detail.fblink ? (
                        <li className="nav-item ">
                          <a
                            className="nav-link"
                            href={pool_detail.fblink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>
                              <i className="fa fa-facebook-square" aria-hidden="true"></i>
                            </span>{" "}
                          </a>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="right_ban">
              <div className="detail_card_outer">
                <div className="detail_card">
                  <div className="tit_row">
                    <div className="tit_le2">
                      {/* <img src={bitcoin} alt="" /> */}
                      <h3>
                        <div className="pooldetail-title">
                          {/* Binance {pool_detail.crypto_type ==="BUSD"?"USD": ""} Coin{" "} */}
                        </div>
                        <span>
                          {" "}
                          1{" "}
                          {pool_detail.crypto_type === "BUSD"
                            ? "BUSD"
                            : "BNB"}{" "}
                          = {pool_detail.up_pool_raise} {pool_detail.symbol}{" "}
                        </span>
                      </h3>
                    </div>
                  </div>

                  <div className="allocation">
                    <div>
                      <p>Total Raised</p>
                      <div className="timer_desktop">
                        <h3 style={{ color: "white", fontSize: 18 }}>
                          {number2 ? number2.toFixed(2) : "0"}{" "}
                          {pool_detail.crypto_type === "BUSD" ? "BUSD" : "BNB"}
                        </h3>
                      </div>
                      <div className="timer_mobile">
                        <h3 style={{ color: "white", fontSize: 14 }}>
                          {number2 ? number2.toFixed(2) : "0"}{" "}
                          {pool_detail.crypto_type === "BUSD" ? "BUSD" : "BNB"}
                        </h3>
                      </div>
                    </div>
                    <div className="rts">
                      {startIn ? <p className="status-p">Start in</p> : ""}
                      <div className="timer_desktop">
                        {startIn === 1 ? (
                          <h3
                            style={{ color: "white", fontSize: 18 }}
                            id="poolonpagestart"
                          >
                            {startTime}
                          </h3>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="timer_mobile">
                        {startIn === 1 ? (
                          <h3
                            style={{ color: "white", fontSize: 14 }}
                            id="poolonpagestart"
                          >
                            {startTimeMobile}
                          </h3>
                        ) : (
                          ""
                        )}
                      </div>
                      {closesIn ? <p className="status-p">Ends in</p> : ""}
                      <div className="timer_desktop">
                        {closesIn === 1 ? (
                          <h3
                            style={{ color: "white", fontSize: 18 }}
                            id="poolonpagestarts"
                          >
                            {startTimeMobile}
                          </h3>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="timer_mobile">
                        {closesIn === 1 ? (
                          <h3
                            style={{ color: "white", fontSize: 14 }}
                            id="poolonpagestart"
                          >
                            {startTimeMobile}
                          </h3>
                        ) : (
                          ""
                        )}
                      </div>
                      {closed ? <p className="status-p">Status</p> : ""}
                      {closed ? <h3>Closed</h3> : ""}
                      {filled ? <h3>Filled</h3> : ""}
                    </div>
                  </div>

                  <div className="prog_bar">
                    <div className="prog_bar_grd">
                      <span className="prog _percent">
                        <p>Progress</p> {number1 ? number1.toFixed(2) : "0"}%
                      </span>
                      {
                        <span className="parti _nls">
                          {allocation ? allocation.toFixed(2) : "0"}/
                          {pool_detail.total_supply} {pool_detail.symbol}
                        </span>
                      }
                    </div>
                    {/* <div className="progress">
                    <div className="bar" style={{ width: `${number1}%` }}>
                      <p className="percent">{number1}</p>
                    </div>
                  </div> */}
                    <div className={`battery ${full}`}>
                      {num
                        ? progressBar.map((x) => (
                          <div className="bar active" data-power="10" key={x}></div>
                        ))
                        : ""}
                    </div>
                  </div>
                  <div className="buy-btnbtc">
                    <div className="buy-token">
                      {approvecheck && pool_detail.crypto_type === "BUSD" && +tokenAllowance === 0 ? (
                        <button
                          className="btnn_white"
                          onClick={() => checkandApproveToken()}
                        >
                          Approve
                        </button>
                      ) : ""}

                      {y === 0 && pool_detail.crypto_type === "BUSD" && +tokenAllowance === 0 ?
                        (<button
                          className="btnn_white"
                          onClick={() => checkandApproveToken()}
                        >
                          Approve
                        </button>
                        )
                        : ""
                      }

                      {y === 0 && pool_detail.crypto_type === "BUSD" && +tokenAllowance !== 0 ?
                        (<button
                          className="btnn_white"
                          onClick={() => checkTierAddress()}
                        >
                          Buy Tokens
                        </button>
                        )
                        : ""
                      }

                      {y === 0 && pool_detail.crypto_type === "BNB" ?
                        (<button
                          className="btnn_white"
                          onClick={() => checkTierAddress()}
                        >
                          Buy Tokens
                        </button>
                        )
                        : ""
                      }

                    </div>
                    <div className="prog_bar_grd">
                      <span className="parti">
                        <p>Limited</p> Participants {pool_detail.participants}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* Modal for transaction amount input. */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body()}
        </Modal>
      </div>
      <PoolInformation pool_detail={pool_detail} />
      <AboutProject pool_detail={pool_detail} />
      <Footer />
    </div>
  );
};

export default memo(PoolDetail);
