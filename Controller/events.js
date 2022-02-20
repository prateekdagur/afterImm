const Event = require("../Model/eventModel");
const Web3 = require("web3");
const upcPool = require("../Model/upcPoolModel");
const Vesting = require("../Model/vestingModel");
// var fileSystem = require("fs");
// var fastcsv = require("fast-csv");
// const eventAbi = require("../BlockchainContractAbi/event_abi.js");
const nodeevents = {
  //Function to register the user.
  nodeEvent: async (req, res) => {
    const eventAbi = [{ "inputs": [{ "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "uint256", "name": "_maxCap", "type": "uint256" }, { "internalType": "uint256", "name": "_saleStart", "type": "uint256" }, { "internalType": "uint256", "name": "_saleEnd", "type": "uint256" }, { "internalType": "uint256", "name": "_noOfTiers", "type": "uint256" }, { "internalType": "address", "name": "_projectOwner", "type": "address" }, { "internalType": "address", "name": "_tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "_totalUsers", "type": "uint256" }, { "internalType": "uint8", "name": "_phaseNo", "type": "uint8" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": true, "internalType": "uint8", "name": "phase", "type": "uint8" }], "name": "UserInvestment", "type": "event" }, { "inputs": [], "name": "ERC20Interface", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "buyTokens", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "maxCap", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "noOfTiers", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "phaseNo", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "projectOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "saleEnd", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "saleStart", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "tierDetails", "outputs": [{ "internalType": "uint256", "name": "maxTierCap", "type": "uint256" }, { "internalType": "uint256", "name": "minUserCap", "type": "uint256" }, { "internalType": "uint256", "name": "maxUserCap", "type": "uint256" }, { "internalType": "uint256", "name": "amountRaised", "type": "uint256" }, { "internalType": "uint256", "name": "users", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "tokenAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalBUSDReceivedInAllTier", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalUsers", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "newSaleEnd", "type": "uint256" }], "name": "updateEndTime", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "newsaleStart", "type": "uint256" }], "name": "updateStartTime", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "_tier", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "_maxTierCap", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "_minUserCap", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "_maxUserCap", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "_tierUsers", "type": "uint256[]" }], "name": "updateTiers", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_users", "type": "address[]" }, { "internalType": "uint256[]", "name": "_tiers", "type": "uint256[]" }], "name": "updateUsers", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "userDetails", "outputs": [{ "internalType": "uint256", "name": "tier", "type": "uint256" }, { "internalType": "uint256", "name": "investedAmount", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
    try {
      var addr = req.params.address;
      //var addr = req.params.address.toLowerCase();
      var upcPoolData = await upcPool.findOne({ address: addr });
      const web3 = new Web3(
        new Web3.providers.HttpProvider(
          "https://bsc-dataseed.binance.org/",
        ),
      );

      const MyContract = new web3.eth.Contract(eventAbi, addr);
      var interval = 4500;
      var i;
      for (i = 0; i < 10; i++) {
        var fromBlockData = (i * interval) + upcPoolData.blockNumber;
        var toBlockData = fromBlockData + (interval - 1);

        const res = await MyContract.getPastEvents('UserInvestment', {
          fromBlock: fromBlockData,
          toBlock: toBlockData
        })

        for (i = 0; i < res.length; i++) {

          let user_addr = res[i].returnValues.user.toLowerCase()
          const evntcheck = await Event.find({ contract_addr: addr.toLowerCase(), user_address: user_addr })
          if (res[i].removed == false) {
            if (evntcheck.length > 0) {

              await Event.findOneAndUpdate(
                { contract_addr: addr.toLowerCase(), user_address: user_addr },
                { user_address: user_addr, amount: parseFloat(web3.utils.fromWei(res[i].returnValues.amount, 'ether')) }
              );
            } else {
              const newEvent = new Event({
                contract_addr: upcPoolData.address.toLowerCase(),
                user_address: user_addr,
                amount: parseFloat(web3.utils.fromWei(res[i].returnValues.amount, 'ether')),
              });
              await newEvent.save();
            }
          }

        }


      }


      // var s = 0;
      // var data = [];
      // const eventdata = await Event.find({ contract_addr: addr.toLowerCase() })
      // for (let j = 0; j < eventdata.length; j++) {
      //   let user_Address = eventdata[j].user_address
      //   let investedamount = eventdata[j].amount
      //   s = s + investedamount

      //   var x = { "User Address": user_Address, "Invested Amount": investedamount }
      //   if (investedamount > 0) {
      //     data.push(x)
      //   }

      // }

      // console.log("Real amount = ", s)

      // var ws = fileSystem.createWriteStream(`./senate-phase-1.csv`);
      // fastcsv
      //   .write(data, { headers: true })
      //   .on("finish", function () {
      //   })
      //   .pipe(ws);


      res.json({ msg: "IGO Detail is dumped!" })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getProfile: async (req, res) => {
    try {
      const data = req.query.page;
      const addr = data.split(',')[0].toLowerCase();

      //Reading ico
      const completed = await Event.find({ user_address: addr }).sort({ createdAt: -1 });
      const vesting = await Vesting.find().sort({ createdAt: -1 });
      var VESTING = []
      for (let i = 0; i < completed.length; i++) {
        var vestingdata = await Vesting.findOne({ contract_addr: completed[i].contract_addr });

        if (vestingdata) {
          var upcPoolData = await upcPool.findOne({ address: completed[i].contract_addr });
          VESTING.push(
            {
              "logo": upcPoolData.images,
              "title": upcPoolData.title,
              "phase": upcPoolData.idophase,
              "amount": completed[i].amount,
              "vesting_percentage": vestingdata.vesting_percentage,
              "return_of_investment": vestingdata.return_of_investment,
              "token_symbol": vestingdata.token_symbol,
              "vetsing_date": vestingdata.vetsing_date,
              "pool_type": upcPoolData.up_pool_access
            }
          )
        }

      }
      //pagination.
      const pageSize = parseInt(data.split(',')[1]);

      const totalcompleted = completed.length;
      const totalcompletedPage = Math.ceil(totalcompleted / pageSize);
      // const paginatedCompleted = await Event
      //   .find({ user_address: addr })
      //   .sort({ createdAt: -1 })
      //   .limit(pageSize);

      var userProfile = [];
      for (let i = 0; i < completed.length; i++) {
        var upcPoolData = await upcPool.findOne({ address: completed[i].contract_addr });

        userProfile.push({
          "title": upcPoolData.title,
          "logo_url": upcPoolData.images,
          "pool_access_type": upcPoolData.up_pool_access,
          "phase": upcPoolData.idophase,
          "crypto_type": upcPoolData.crypto_type,
          "pool_raise": upcPoolData.up_pool_raise,
          "symbol": upcPoolData.symbol,
          "amount": completed[i].amount,
          "pool_type": upcPoolData.up_pool_access
        })

      }

      res.json({
        totalcompletedPage: totalcompletedPage,
        paginatedcompleted_pool: userProfile,
        vesting: VESTING
      });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createVesting: async (req, res) => {
    try {
      var addr = req.body.addr;
      var upcPoolData = await upcPool.findOne({ address: addr.toLowerCase() });
      const vesting = new Vesting({
        vetsing_date: req.body.vetsing_date,
        contract_addr: addr,
        pool_type: upcPoolData.up_pool_access,
        vesting_percentage: req.body.vesting_percentage,
        return_of_investment: req.body.return_of_investment,
        token_symbol: upcPoolData.symbol,
      });

      await vesting.save();
      res.json({ msg: "IGO Detail is dumped!" })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addProfilecsv: async (req, res) => {
    try {
      //Here we are taking addresses from csv and storing in an arrayToInsert.
      const { data, addr } = req.body;
      var list = [];
      for (i = 0; i < data.length; i++) {
        const evntcheck = await Event.find({ contract_addr: addr.toLowerCase(), user_address: data[i][0].toLowerCase() })
        if (evntcheck.length > 0) {
          await Event.findOneAndUpdate(
            { contract_addr: addr.toLowerCase(), user_address:  data[i][0].toLowerCase() },
            { user_address:  data[i][0].toLowerCase(), amount: data[i][1] }
          );
        } else {
          const newEvent = new Event({
            contract_addr: addr.toLowerCase(),
            user_address: data[i][0].toLowerCase(),
            amount: data[i][1],
          });
          await newEvent.save();
        }
       
      }
      res.status(200).json({ msg: "CSV is uploaded!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

};
module.exports = nodeevents;
