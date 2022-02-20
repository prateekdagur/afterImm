const whlist1 = require("../Model/whitelist1");
const whlist2 = require("../Model/whitelist2");
const whlist3 = require("../Model/whitelist3");
const whlist4 = require("../Model/whitelist4");
const whlist5 = require("../Model/whitelist5");
const whlist6 = require("../Model/whitelist6");
const whlist7 = require("../Model/whitelist7");
const whlist8 = require("../Model/whitelist8");
const whlist9 = require("../Model/whitelist9");
const upcModel = require("../Model/upcPoolModel");
const csvFileModel = require("../Model/csvFileModel");
const configModel = require("../Model/configModel");

const Web3 = require("web3");
const SeedifyFundsContractAbi = require("../BlockchainContractAbi/contract_abi.js");
const rpcUrl = process.env.BSC_NET;
//http provider for web3.
const web3 = new Web3(
    new Web3.providers.HttpProvider(
        rpcUrl
    ),
);
//address of token sender
const FROM_ADDRESS = process.env.FROM_ADDRESS;
//private key of token sender
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const fetchBlockchainWhitelistCtrl = {
    //Function to upload the address of white list one on blockchain.
    addWhitelist1: async (req, res) => {
        try {
            pool_id = req.params.id;
            const contract_address = await upcModel.findOne({
                _id: pool_id,
            });
            //Getting contract address of the pool.
            const contractAddr = contract_address.address.toUpperCase();
            const SimpleContract = new web3.eth.Contract(
                SeedifyFundsContractAbi,
                contractAddr,
            );
            const addresses = await whlist1.find({
                addr_status: "0",
                id: req.params.id,
            });

            if (addresses.length === 0) {
                return res.status(400).json({
                    msg: "No address is remaining to be uploaded on blockchain",
                });
            }
            var num = Math.ceil(addresses.length / 100);
            for (let i = 0; i < num; i++) {
                const address = await whlist1.find({
                    addr_status: "0",
                    id: req.params.id,
                }).limit(100);
                var address_array = [];
                var tier_array = [];
                for (let j = 0; j < address.length; j++) {
                    address_array[j] = address[j].white_list1;
                    tier_array[j] = 1
                }

                //Giving address parameter in smart contract function.
                const result = await SimpleContract.methods.updateUsers(
                    address_array, tier_array
                );
                //encoding address in ABI
                const encodedResult = result.encodeABI();
                const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
                const config = await configModel.find();
                
                //Signing transaction to upload address on blockchain.
                const signedTx = await web3.eth.accounts.signTransaction(
                    {
                        nonce: accountNonce,
                        data: encodedResult,
                        from: FROM_ADDRESS,
                        gasPrice:  config[0].gasPrice,
                        gas: config[0].gas,
                        to: contractAddr,
                    },
                    PRIVATE_KEY,
                    false,
                );
                //sending signed transaction.
                const transaction = await web3.eth.sendSignedTransaction(
                    signedTx.rawTransaction,
                );

                if (transaction.status) {
                    //Updating status of the address which has been uploaded on blockchain successfully.
                    for (let k = 0; k < address_array.length; k++) {
                        const states = await whlist1.findOneAndUpdate(
                            { white_list1: address_array[k], id: req.params.id },
                            { addr_status: "1" },
                        );
                    }

                    var csvObject = []
                    for (let i = 0; i < address_array.length; i++) {
                        var oneRow = {
                            user_address: address_array[i].toLowerCase(),
                            tier: 1,
                            ido_id: pool_id
                        }
                        csvObject.push(oneRow);
                    }

                    csvFileModel.insertMany(csvObject);

                }
            }

            res.json({ msg: "addresses are uploaded on blockchain successfully!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //Function to upload the address of white list two on blockchain.
    addWhitelist2: async (req, res) => {
        try {
            pool_id = req.params.id;
            const contract_address = await upcModel.findOne({
                _id: pool_id,
            });
            //Getting contract address of the pool.
            const contractAddr = contract_address.address.toUpperCase();
            const SimpleContract = new web3.eth.Contract(
                SeedifyFundsContractAbi,
                contractAddr,
            );
            const addresses = await whlist2.find({
                addr_status: "0",
                id: req.params.id,
            });
            if (!addresses.length) {
                return res.status(200).json({
                    msg: "No address is remaining to be uploaded on blockchain",
                });
            }
            var num = Math.ceil(addresses.length / 100);
            for (let i = 0; i < num; i++) {
                const address = await whlist2.find({
                    addr_status: "0",
                    id: req.params.id,
                }).limit(100);
                var address_array = [];
                var tier_array = [];

                for (let j = 0; j < address.length; j++) {
                    address_array[j] = address[j].white_list2;
                    tier_array[j] = 2
                }

                //Giving address parameter in smart contract function.
                const result = await SimpleContract.methods.updateUsers(
                    address_array, tier_array
                );

                //encoding address in ABI
                const encodedResult = result.encodeABI();

                const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
                const config = await configModel.find();
                
                //Signing transaction to upload address on blockchain.
                const signedTx = await web3.eth.accounts.signTransaction(
                    {
                        nonce: accountNonce,
                        data: encodedResult,
                        from: FROM_ADDRESS,
                        gasPrice: config[0].gasPrice,
                        gas: config[0].gas,
                        to: contractAddr,
                    },
                    PRIVATE_KEY,
                    false,
                );
                //sending signed transaction.
                const transaction = await web3.eth.sendSignedTransaction(
                    signedTx.rawTransaction,
                );
                if (transaction.status) {
                    //Updating status of the address which has been uploaded on blockchain successfully.
                    for (let k = 0; k < address_array.length; k++) {
                        const states = await whlist2.findOneAndUpdate(
                            { white_list2: address_array[k], id: req.params.id },
                            { addr_status: "1" },
                        );

                    }

                    var csvObject = []
                    for (let i = 0; i < address_array.length; i++) {
                        var oneRow = {
                            user_address: address_array[i].toLowerCase(),
                            tier: 2,
                            ido_id: pool_id
                        }
                        csvObject.push(oneRow);
                    }

                    csvFileModel.insertMany(csvObject);
                }
            }

            res.json({ msg: "addresses are uploaded on blockchan successfully!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //Function to upload the address of white list three on blockchain.
    addWhitelist3: async (req, res) => {
        try {
            pool_id = req.params.id;
            const contract_address = await upcModel.findOne({
                _id: pool_id,
            });
            //Getting contract address of the pool.
            const contractAddr = contract_address.address.toUpperCase();
            const SimpleContract = new web3.eth.Contract(
                SeedifyFundsContractAbi,
                contractAddr,
            );
            const addresses = await whlist3.find({
                addr_status: "0",
                id: req.params.id,
            });

            if (!addresses.length) {
                return res.status(200).json({
                    msg: "No address is remaining to be uploaded on blockchain",
                });
            }
            var num = Math.ceil(addresses.length / 100);
            for (let i = 0; i < num; i++) {
                const address = await whlist3.find({
                    addr_status: "0",
                    id: req.params.id,
                }).limit(100);
                var address_array = [];
                var tier_array = [];
                for (let j = 0; j < address.length; j++) {
                    address_array[j] = address[j].white_list3;
                    tier_array[j] = 3
                }

                //Giving address parameter in smart contract function.
                const result = await SimpleContract.methods.updateUsers(
                    address_array, tier_array
                );

                //encoding address in ABI
                const encodedResult = result.encodeABI();

                const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
                const config = await configModel.find();
                
                //Signing transaction to upload address on blockchain.
                const signedTx = await web3.eth.accounts.signTransaction(
                    {
                        nonce: accountNonce,
                        data: encodedResult,
                        from: FROM_ADDRESS,
                        gasPrice: config[0].gasPrice,
                        gas: config[0].gas,
                        to: contractAddr,
                    },
                    PRIVATE_KEY,
                    false,
                );
                //sending signed transaction.
                const transaction = await web3.eth.sendSignedTransaction(
                    signedTx.rawTransaction,
                );
                if (transaction.status) {
                    //Updating status of the address which has been uploaded on blockchain successfully.
                    for (let k = 0; k < address_array.length; k++) {
                        const states = await whlist3.findOneAndUpdate(
                            { white_list3: address_array[k], id: req.params.id },
                            { addr_status: "1" },
                        );

                    }

                    var csvObject = []
                    for (let i = 0; i < address_array.length; i++) {
                        var oneRow = {
                            user_address: address_array[i].toLowerCase(),
                            tier: 3,
                            ido_id: pool_id
                        }
                        csvObject.push(oneRow);
                    }
                    csvFileModel.insertMany(csvObject);
                }
            }

            res.json({ msg: "addresses are uploaded on blockchan successfully!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //Function to upload the address of white list Four on blockchain.
    addWhitelist4: async (req, res) => {
        try {
            pool_id = req.params.id;
            const contract_address = await upcModel.findOne({
                _id: pool_id,
            });

            //Getting contract address of the pool.
            const contractAddr = contract_address.address.toUpperCase();
            const SimpleContract = new web3.eth.Contract(
                SeedifyFundsContractAbi,
                contractAddr,
            );
            const addresses = await whlist4.find({
                addr_status: "0",
                id: req.params.id,
            });


            if (!addresses.length) {
                return res.status(200).json({
                    msg: "No address is remaining to be uploaded on blockchain",
                });
            }
            var num = Math.ceil(addresses.length / 100);
            for (let i = 0; i < num; i++) {
                const address = await whlist4.find({
                    addr_status: "0",
                    id: req.params.id,
                }).limit(100);
                var address_array = [];
                var tier_array = [];

                for (let j = 0; j < address.length; j++) {
                    address_array[j] = address[j].white_list4;
                    tier_array[j] = 4
                }

                //Giving address parameter in smart contract function.
                const result = await SimpleContract.methods.updateUsers(
                    address_array, tier_array
                );

                //encoding address in ABI
                const encodedResult = result.encodeABI();

                const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
                const config = await configModel.find();
                
                //Signing transaction to upload address on blockchain.
                const signedTx = await web3.eth.accounts.signTransaction(
                    {
                        nonce: accountNonce,
                        data: encodedResult,
                        from: FROM_ADDRESS,
                        gasPrice: config[0].gasPrice,
                        gas:  config[0].gas,
                        to: contractAddr,
                    },
                    PRIVATE_KEY,
                    false,
                );
                //sending signed transaction.
                const transaction = await web3.eth.sendSignedTransaction(
                    signedTx.rawTransaction,
                );
                if (transaction.status) {
                    //Updating status of the address which has been uploaded on blockchain successfully.
                    for (let k = 0; k < address_array.length; k++) {
                        const states = await whlist4.findOneAndUpdate(
                            { white_list4: address_array[k], id: req.params.id },
                            { addr_status: "1" },
                        );

                    }

                    var csvObject = []
                    for (let i = 0; i < address_array.length; i++) {
                        var oneRow = {
                            user_address: address_array[i].toLowerCase(),
                            tier: 4,
                            ido_id: pool_id
                        }
                        csvObject.push(oneRow);
                    }
                    csvFileModel.insertMany(csvObject);
                }
            }

            res.json({ msg: "addresses are uploaded on blockchan successfully!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //Function to upload the address of white list Five on blockchain.
    addWhitelist5: async (req, res) => {
        try {
            pool_id = req.params.id;
            const contract_address = await upcModel.findOne({
                _id: pool_id,
            });
            //Getting contract address of the pool.
            const contractAddr = contract_address.address.toUpperCase();
            const SimpleContract = new web3.eth.Contract(
                SeedifyFundsContractAbi,
                contractAddr,
            );
            const addresses = await whlist5.find({
                addr_status: "0",
                id: req.params.id,
            });

            if (!addresses.length) {
                return res.status(200).json({
                    msg: "No address is remaining to be uploaded on blockchain",
                });
            }
            var num = Math.ceil(addresses.length / 100);
            for (let i = 0; i < num; i++) {
                const address = await whlist5.find({
                    addr_status: "0",
                    id: req.params.id,
                }).limit(100);
                var address_array = [];
                var tier_array = [];
                for (let j = 0; j < address.length; j++) {
                    address_array[j] = address[j].white_list5;
                    tier_array[j] = 5
                }


                //Giving address parameter in smart contract function.
                const result = await SimpleContract.methods.updateUsers(
                    address_array, tier_array
                );

                //encoding address in ABI
                const encodedResult = result.encodeABI();

                const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
                const config = await configModel.find();
               
                //Signing transaction to upload address on blockchain.
                const signedTx = await web3.eth.accounts.signTransaction(
                    {
                        nonce: accountNonce,
                        data: encodedResult,
                        from: FROM_ADDRESS,
                        gasPrice:  config[0].gasPrice,
                        gas: config[0].gas,
                        to: contractAddr,
                    },
                    PRIVATE_KEY,
                    false,
                );
                //sending signed transaction.
                const transaction = await web3.eth.sendSignedTransaction(
                    signedTx.rawTransaction,
                );
                if (transaction.status) {
                    //Updating status of the address which has been uploaded on blockchain successfully.
                    for (let k = 0; k < address_array.length; k++) {
                        const states = await whlist5.findOneAndUpdate(
                            { white_list5: address_array[k], id: req.params.id },
                            { addr_status: "1" },
                        );

                    }

                    var csvObject = []
                    for (let i = 0; i < address_array.length; i++) {
                        var oneRow = {
                            user_address: address_array[i].toLowerCase(),
                            tier: 5,
                            ido_id: pool_id
                        }
                        csvObject.push(oneRow);
                    }
                    csvFileModel.insertMany(csvObject);
                }
            }

            res.json({ msg: "addresses are uploaded on blockchan successfully!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //Function to upload the address of white list six on blockchain.
    addWhitelist6: async (req, res) => {
        try {
            pool_id = req.params.id;
            const contract_address = await upcModel.findOne({
                _id: pool_id,
            });
            //Getting contract address of the pool.
            const contractAddr = contract_address.address.toUpperCase();
            const SimpleContract = new web3.eth.Contract(
                SeedifyFundsContractAbi,
                contractAddr,
            );
            const addresses = await whlist6.find({
                addr_status: "0",
                id: req.params.id,
            });

            if (!addresses.length) {
                return res.status(200).json({
                    msg: "No address is remaining to be uploaded on blockchain",
                });
            }
            var num = Math.ceil(addresses.length / 100);
            for (let i = 0; i < num; i++) {
                const address = await whlist6.find({
                    addr_status: "0",
                    id: req.params.id,
                }).limit(100);
                var address_array = [];
                var tier_array = [];

                for (let j = 0; j < address.length; j++) {
                    address_array[j] = address[j].white_list6;
                    tier_array[j] = 6
                }

                //Giving address parameter in smart contract function.
                const result = await SimpleContract.methods.updateUsers(
                    address_array, tier_array
                );
                //encoding address in ABI
                const encodedResult = result.encodeABI();

                const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
                const config = await configModel.find();
                
                //Signing transaction to upload address on blockchain.
                const signedTx = await web3.eth.accounts.signTransaction(
                    {
                        nonce: accountNonce,
                        data: encodedResult,
                        from: FROM_ADDRESS,
                        gasPrice: config[0].gasPrice,
                        gas:  config[0].gas,
                        to: contractAddr,
                    },
                    PRIVATE_KEY,
                    false,
                );
                //sending signed transaction.
                const transaction = await web3.eth.sendSignedTransaction(
                    signedTx.rawTransaction,
                );
                if (transaction.status) {
                    //Updating status of the address which has been uploaded on blockchain successfully.
                    for (let k = 0; k < address_array.length; k++) {
                        const states = await whlist6.findOneAndUpdate(
                            { white_list6: address_array[k], id: req.params.id },
                            { addr_status: "1" },
                        );

                    }
                    var csvObject = []
                    for (let i = 0; i < address_array.length; i++) {
                        var oneRow = {
                            user_address: address_array[i].toLowerCase(),
                            tier: 6,
                            ido_id: pool_id
                        }
                        csvObject.push(oneRow);
                    }
                    csvFileModel.insertMany(csvObject);
                }
            }

            res.json({ msg: "addresses are uploaded on blockchan successfully!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //Function to upload the address of white list six on blockchain.
    addWhitelist7: async (req, res) => {
        try {
            pool_id = req.params.id;
            const contract_address = await upcModel.findOne({
                _id: pool_id,
            });
            //Getting contract address of the pool.
            const contractAddr = contract_address.address.toUpperCase();
            const SimpleContract = new web3.eth.Contract(
                SeedifyFundsContractAbi,
                contractAddr,
            );
            const addresses = await whlist7.find({
                addr_status: "0",
                id: req.params.id,
            });

            if (!addresses.length) {
                return res.status(200).json({
                    msg: "No address is remaining to be uploaded on blockchain",
                });
            }
            var num = Math.ceil(addresses.length / 100);
            for (let i = 0; i < num; i++) {
                const address = await whlist7.find({
                    addr_status: "0",
                    id: req.params.id,
                }).limit(100);
                var address_array = [];
                var tier_array = [];
                for (let j = 0; j < address.length; j++) {
                    address_array[j] = address[j].white_list7;
                    tier_array[j] = 7
                }
                //Giving address parameter in smart contract function.
                const result = await SimpleContract.methods.updateUsers(
                    address_array, tier_array
                );

                //encoding address in ABI
                const encodedResult = result.encodeABI();

                const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
                const config = await configModel.find();
                
                //Signing transaction to upload address on blockchain.
                const signedTx = await web3.eth.accounts.signTransaction(
                    {
                        nonce: accountNonce,
                        data: encodedResult,
                        from: FROM_ADDRESS,
                        gasPrice: config[0].gasPrice,
                        gas: config[0].gas,
                        to: contractAddr,
                    },
                    PRIVATE_KEY,
                    false,
                );
                //sending signed transaction.
                const transaction = await web3.eth.sendSignedTransaction(
                    signedTx.rawTransaction,
                );
                if (transaction.status) {
                    //Updating status of the address which has been uploaded on blockchain successfully.
                    for (let k = 0; k < address_array.length; k++) {
                        const states = await whlist7.findOneAndUpdate(
                            { white_list7: address_array[k], id: req.params.id },
                            { addr_status: "1" },
                        );

                    }

                    var csvObject = []
                    for (let i = 0; i < address_array.length; i++) {
                        var oneRow = {
                            user_address: address_array[i].toLowerCase(),
                            tier: 7,
                            ido_id: pool_id
                        }
                        csvObject.push(oneRow);
                    }
                    csvFileModel.insertMany(csvObject);
                }
            }

            res.json({ msg: "addresses are uploaded on blockchan successfully!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //Function to upload the address of white list six on blockchain.
    addWhitelist8: async (req, res) => {
        try {
            const config = await configModel.find();
            
            pool_id = req.params.id;
            const contract_address = await upcModel.findOne({
                _id: pool_id,
            });
            //Getting contract address of the pool.
            const contractAddr = contract_address.address.toUpperCase();
            const SimpleContract = new web3.eth.Contract(
                SeedifyFundsContractAbi,
                contractAddr,
            );
            const addresses = await whlist8.find({
                addr_status: "0",
                id: req.params.id,
            });

            if (!addresses.length) {
                return res.status(200).json({
                    msg: "No address is remaining to be uploaded on blockchain",
                });
            }
            var num = Math.ceil(addresses.length / 100);
            for (let i = 0; i < num; i++) {
                const address = await whlist8.find({
                    addr_status: "0",
                    id: req.params.id,
                }).limit(100);
                var address_array = [];
                var tier_array = [];
                for (let j = 0; j < address.length; j++) {
                    address_array[j] = address[j].white_list8;
                    tier_array[j] = 8
                }

                //Giving address parameter in smart contract function.
                const result = await SimpleContract.methods.updateUsers(
                    address_array, tier_array
                );

                //encoding address in ABI
                const encodedResult = result.encodeABI();

                const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
                //Signing transaction to upload address on blockchain.
                const signedTx = await web3.eth.accounts.signTransaction(
                    {
                        nonce: accountNonce,
                        data: encodedResult,
                        from: FROM_ADDRESS,
                        gasPrice: config[0].gasPrice,
                        gas: config[0].gas,
                        to: contractAddr,
                    },
                    PRIVATE_KEY,
                    false,
                );
                //sending signed transaction.
                const transaction = await web3.eth.sendSignedTransaction(
                    signedTx.rawTransaction,
                );
                if (transaction.status) {
                    //Updating status of the address which has been uploaded on blockchain successfully.
                    for (let k = 0; k < address_array.length; k++) {
                        const states = await whlist8.findOneAndUpdate(
                            { white_list8: address_array[k], id: req.params.id },
                            { addr_status: "1" },
                        );

                    }
                    var csvObject = []
                    for (let i = 0; i < address_array.length; i++) {
                        var oneRow = {
                            user_address: address_array[i].toLowerCase(),
                            tier: 8,
                            ido_id: pool_id
                        }
                        csvObject.push(oneRow);
                    }
                    csvFileModel.insertMany(csvObject);
                }
            }

            res.json({ msg: "addresses are uploaded on blockchan successfully!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //Function to upload the address of white list six on blockchain.
    addWhitelist9: async (req, res) => {
        try {
            const config = await configModel.find();
            pool_id = req.params.id;
            const contract_address = await upcModel.findOne({
                _id: pool_id,
            });
            //Getting contract address of the pool.
            const contractAddr = contract_address.address.toUpperCase();
            const SimpleContract = new web3.eth.Contract(
                SeedifyFundsContractAbi,
                contractAddr,
            );
            const addresses = await whlist9.find({
                addr_status: "0",
                id: req.params.id,
            });

            if (!addresses.length) {
                return res.status(200).json({
                    msg: "No address is remaining to be uploaded on blockchain",
                });
            }
            var num = Math.ceil(addresses.length / 100);
            for (let i = 0; i < num; i++) {
                const address = await whlist9.find({
                    addr_status: "0",
                    id: req.params.id,
                }).limit(100);
                var address_array = [];
                var tier_array = [];
                for (let j = 0; j < address.length; j++) {
                    address_array[j] = address[j].white_list9;
                    tier_array[j] = 9
                }
                //Giving address parameter in smart contract function.
                const result = await SimpleContract.methods.updateUsers(
                    address_array, tier_array
                );
                //encoding address in ABI
                const encodedResult = result.encodeABI();

                const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
                //Signing transaction to upload address on blockchain.
                const signedTx = await web3.eth.accounts.signTransaction(
                    {
                        nonce: accountNonce,
                        data: encodedResult,
                        from: FROM_ADDRESS,
                        gasPrice: config[0].gasPrice,
                        gas:  config[0].gas,
                        to: contractAddr,
                    },
                    PRIVATE_KEY,
                    false,
                );
                //sending signed transaction.
                const transaction = await web3.eth.sendSignedTransaction(
                    signedTx.rawTransaction,
                );
                if (transaction.status) {
                    //Updating status of the address which has been uploaded on blockchain successfully.
                    for (let k = 0; k < address_array.length; k++) {
                        const states = await whlist9.findOneAndUpdate(
                            { white_list9: address_array[k], id: req.params.id },
                            { addr_status: "1" },
                        );

                    }
                    var csvObject = []
                    for (let i = 0; i < address_array.length; i++) {
                        var oneRow = {
                            user_address: address_array[i].toLowerCase(),
                            tier: 9,
                            ido_id: pool_id
                        }
                        csvObject.push(oneRow);
                    }
                    csvFileModel.insertMany(csvObject);
                }
            }

            res.json({ msg: "addresses are uploaded on blockchan successfully!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    downloadAllocation: async (req, res) => {
        try {
            pool_id = req.params.id;
            const contract_address = await upcModel.findOne({
                _id: pool_id,
            });
            //Getting contract address of the pool.
            const contractAddr = contract_address.address.toUpperCase();
            const SimpleContract = new web3.eth.Contract(
                SeedifyFundsContractAbi,
                contractAddr,
            );
            const addresss = await csvFileModel.find({ ido_id: pool_id })
            if (!addresss.length) {
                return res.status(200).json({
                    msg: "Not any address on blockchain for this IGO",
                });
            }

            var csvObject = []
            for (let i = 0; i < addresss.length; i++) {
                const result = await SimpleContract.methods.userDetails(addresss[i].user_address).call();
                if (result) {
                    var oneRow = {
                        "IGO Name": contract_address.title,
                        "From Address": addresss[i].user_address,
                        "Tier": result.tier,
                        "Invested Amount": result.investedAmount / 10 ** 18
                    }
                    csvObject.push(oneRow);
                }
            }
            res.json({ csv: csvObject });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //Function to update tiers on blockchain.
    updateTiers: async (req, res) => {
        try {
            const config = await configModel.find();
            
            const id = req.body.id;
            const { tiers, maxtiercap, minusercap, maxusercap, numberOfUsers } = req.body.data;

            const tier_array = tiers.split(',');
            const maxtiercap_array = maxtiercap.split(',')
            const minusercap_array = minusercap.split(',');
            const maxusercap_array = maxusercap.split(',');
            const numberOfUsers_array = numberOfUsers.split(',')


            var tierlength = tier_array.length

            if (maxtiercap_array.length !== tierlength && minusercap_array.length !== tierlength && maxusercap_array.length !== tierlength && numberOfUsers_array.length !== tierlength) {
                return res.status(400).json({ msg: "Enter the same number of term in each field" })
            }

            for (let i = 0; i < tier_array.length; i++) {
                maxtiercap_array[i] = web3.utils.toBN(Web3.utils.toWei(maxtiercap_array[i], 'ether'));
                minusercap_array[i] = web3.utils.toBN(Web3.utils.toWei(minusercap_array[i], 'ether'));
                maxusercap_array[i] = web3.utils.toBN(Web3.utils.toWei(maxusercap_array[i], 'ether'));
            }

            const contract_address = await upcModel.findOne({
                _id: id,
            });
            if (!contract_address.address) {
                return res.status(400).json({ msg: "No contract address for this IGO" })
            }

            //Getting contract address of the pool.
            const contractAddr = contract_address.address.toUpperCase();
            const SimpleContract = new web3.eth.Contract(
                SeedifyFundsContractAbi,
                contractAddr,
            );


            //Giving array parameters in smart contract function.
            const result = await SimpleContract.methods.updateTiers(
                tier_array, maxtiercap_array, minusercap_array, maxusercap_array, numberOfUsers_array
            );
            //encoding address in ABI
            const encodedResult = result.encodeABI();
            const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
            //Signing transaction to upload address on blockchain.
            const signedTx = await web3.eth.accounts.signTransaction(
                {
                    nonce: accountNonce,
                    data: encodedResult,
                    from: FROM_ADDRESS,
                    gasPrice: config[0].gasPrice,
                    gas:  config[0].gas,
                    to: contractAddr,
                },
                PRIVATE_KEY,
                false,
            );
            //sending signed transaction.
            const transaction = await web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
            );

            if (transaction.status) {
                res.json({ msg: "tiers are updated on blockchain!" });
            }


        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    //Function to fetch contract details from blockchain.
    contractDetails: async (req, res) => {
        try {

            const id = req.params.id;
            const contract_address = await upcModel.findOne({
                _id: id,
            });
            if (!contract_address.address) {
                return res.status(400).json({ msg: "No contract address for this IGO" })
            }

            //Getting contract address of the pool.
            const contractAddr = contract_address.address.toUpperCase();
            const SimpleContract = new web3.eth.Contract(
                SeedifyFundsContractAbi,
                contractAddr,
            );

            //Fetch detail from blockchain
            const contractName = await SimpleContract.methods.name().call()
            const projectOwner = await SimpleContract.methods.projectOwner().call()
            const maxCap = await SimpleContract.methods.maxCap().call()
            const saleStart = await SimpleContract.methods.saleStart().call()
            const saleEnd = await SimpleContract.methods.saleEnd().call()
            const totalUsers = await SimpleContract.methods.totalUsers().call()
            const totalbusd = await SimpleContract.methods.totalBUSDReceivedInAllTier().call()
            const paused = await SimpleContract.methods.paused().call()            

            //Fetch tier details from blockchain
            const tierone = await SimpleContract.methods.tierDetails(1).call()
            const tiertwo = await SimpleContract.methods.tierDetails(2).call()
            const tierthree = await SimpleContract.methods.tierDetails(3).call()
            const tierfour = await SimpleContract.methods.tierDetails(4).call()
            const tierfive = await SimpleContract.methods.tierDetails(5).call()
            const tiersix = await SimpleContract.methods.tierDetails(6).call()
            const tierseven = await SimpleContract.methods.tierDetails(7).call()
            const tiereight = await SimpleContract.methods.tierDetails(8).call()
            const tiernine = await SimpleContract.methods.tierDetails(9).call()

            res.json({ contractName, maxCap, projectOwner, saleStart, saleEnd, totalUsers, totalbusd, tierone, tiertwo, tierthree, tierfour, tierfive, tiersix, tierseven, tiereight, tiernine, paused });


        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //Function to update sale time of contract on blockchain.
    updateSaleStart: async (req, res) => {
        try {
            const config = await configModel.find();
           
            const { id, startSale } = req.body;

         
            const contract_address = await upcModel.findOne({
                _id: id,
            });
            if (!contract_address.address) {
                return res.status(400).json({ msg: "No contract address for this IGO" })
            }
           
            //Getting contract address of the pool.
            const contractAddr = contract_address.address.toUpperCase();
            const SimpleContract = new web3.eth.Contract(
                SeedifyFundsContractAbi,
                contractAddr,
            );


            //function to update saleStart time on blockchain.
            const result = await SimpleContract.methods.updateStartTime(startSale);
            //encoding address in ABI
            const encodedResult = result.encodeABI();
            const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
            //Signing transaction to upload address on blockchain.
            const signedTx = await web3.eth.accounts.signTransaction(
                {
                    nonce: accountNonce,
                    data: encodedResult,
                    from: FROM_ADDRESS,
                    gasPrice: config[0].gasPrice,
                    gas: config[0].gas,
                    to: contractAddr,
                },
                PRIVATE_KEY,
                false,
            );
            
            //sending signed transaction.
            const transaction = await web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
            );
            
           
            if (transaction.status) {
                res.json({ msg: "SaleStart is updated on blockchain!" });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    //Function to update sale time of contract on blockchain.
    updateSaleEnd: async (req, res) => {
        try {
            const config = await configModel.find();
           
            const { id, endSale } = req.body;
            const contract_address = await upcModel.findOne({
                _id: id,
            });
            if (!contract_address.address) {
                return res.status(400).json({ msg: "No contract address for this IGO" })
            }

            //Getting contract address of the pool.
            const contractAddr = contract_address.address.toUpperCase();
            const SimpleContract = new web3.eth.Contract(
                SeedifyFundsContractAbi,
                contractAddr,
            );

            //function to update saleEnd time on blockchain.
            const result = await SimpleContract.methods.updateEndTime(endSale);

            //encoding address in ABI
            const encodedResult = result.encodeABI();
            const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
            //Signing transaction to upload address on blockchain.
            const signedTx = await web3.eth.accounts.signTransaction(
                {
                    nonce: accountNonce,
                    data: encodedResult,
                    from: FROM_ADDRESS,
                    gasPrice: config[0].gasPrice,
                    gas: config[0].gas,
                    to: contractAddr,
                },
                PRIVATE_KEY,
                false,
            );
            //sending signed transaction.
            const transaction = await web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
            );

            if (transaction.status) {
                res.json({ msg: "SaleEnd is updated on blockchain!" });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

     //Function to update paused on blockchain.
     updateSalePaused: async (req, res) => {
        try {
            const config = await configModel.find();
           
            const { id } = req.body;
            const contract_address = await upcModel.findOne({
                _id: id,
            });
            if (!contract_address.address) {
                return res.status(400).json({ msg: "No contract address for this IGO" })
            }

            //Getting contract address of the pool.
            const contractAddr = contract_address.address.toUpperCase();
            const SimpleContract = new web3.eth.Contract(
                SeedifyFundsContractAbi,
                contractAddr,
            );

            //function to update saleEnd time on blockchain.
            const result = await SimpleContract.methods.pause();

            //encoding address in ABI
            const encodedResult = result.encodeABI();
            const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
            //Signing transaction to upload address on blockchain.
            const signedTx = await web3.eth.accounts.signTransaction(
                {
                    nonce: accountNonce,
                    data: encodedResult,
                    from: FROM_ADDRESS,
                    gasPrice: config[0].gasPrice,
                    gas: config[0].gas,
                    to: contractAddr,
                },
                PRIVATE_KEY,
                false,
            );
            //sending signed transaction.
            const transaction = await web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
            );

            if (transaction.status) {
                res.json({ msg: "Contract is paused" });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

     //Function to update unpaused on blockchain.
     updateSaleUnPaused: async (req, res) => {
        try {
            const config = await configModel.find();
           
            const { id } = req.body;
            const contract_address = await upcModel.findOne({
                _id: id,
            });
            if (!contract_address.address) {
                return res.status(400).json({ msg: "No contract address for this IGO" })
            }

            //Getting contract address of the pool.
            const contractAddr = contract_address.address.toUpperCase();
            const SimpleContract = new web3.eth.Contract(
                SeedifyFundsContractAbi,
                contractAddr,
            );

            //function to update saleEnd time on blockchain.
            const result = await SimpleContract.methods.unpause();

            //encoding address in ABI
            const encodedResult = result.encodeABI();
            const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
            //Signing transaction to upload address on blockchain.
            const signedTx = await web3.eth.accounts.signTransaction(
                {
                    nonce: accountNonce,
                    data: encodedResult,
                    from: FROM_ADDRESS,
                    gasPrice: config[0].gasPrice,
                    gas: config[0].gas,
                    to: contractAddr,
                },
                PRIVATE_KEY,
                false,
            );
            //sending signed transaction.
            const transaction = await web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
            );

            if (transaction.status) {
                res.json({ msg: "Contract is unpaused" });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
     //Function to update sale time of contract on blockchain.
     update_MaxCap: async (req, res) => {
        try {
            const config = await configModel.find();
           
            const { id, maxCap } = req.body;
            const max_cap = web3.utils.toWei(`${maxCap}`, 'ether');
            const contract_address = await upcModel.findOne({
                _id: id,
            });
            if (!contract_address.address) {
                return res.status(400).json({ msg: "No contract address for this IGO" })
            }

            //Getting contract address of the pool.
            const contractAddr = contract_address.address.toUpperCase();
            const SimpleContract = new web3.eth.Contract(
                SeedifyFundsContractAbi,
                contractAddr,
            );

            //function to update saleEnd time on blockchain.
            const result = await SimpleContract.methods.updateMaxCap(max_cap);

            //encoding address in ABI
            const encodedResult = result.encodeABI();
            const accountNonce = web3.eth.getTransactionCount(FROM_ADDRESS)
            //Signing transaction to upload address on blockchain.
            const signedTx = await web3.eth.accounts.signTransaction(
                {
                    nonce: accountNonce,
                    data: encodedResult,
                    from: FROM_ADDRESS,
                    gasPrice: config[0].gasPrice,
                    gas: config[0].gas,
                    to: contractAddr,
                },
                PRIVATE_KEY,
                false,
            );
            //sending signed transaction.
            const transaction = await web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
            );

            if (transaction.status) {
                res.json({ msg: "MaxCap is updated on blockchain!" });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },


     //Function to get config data 
     getConfig: async (req, res) => {
        try {
            const config = await configModel.find();
            res.json(config);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //Function to update config data.
    updateConfig: async (req, res) => {
		try {
			const config_id = req.body.id;
			
			//Updating values
			const config_update = await configModel.updateOne(
				{ _id: config_id },
				{
					gas: req.body.gas,
					gasPrice: req.body.gasPrice,
				},
			);
			if (config_update) {
				return res
					.status(201)
					.json({ msg: "config is updated successfully!" });
			}
			res.json({
				msg: "Oops, there is some error! config has not updated yet!",
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},






};

module.exports = fetchBlockchainWhitelistCtrl;

