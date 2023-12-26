'use strict'
const BigNumber = require('bignumber.js');
const _ = require("lodash");
const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

function createQueryString(params) {
    return Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&');
}

// Wait for a web3 tx `send()` call to be mined and return the receipt.
function waitForTxSuccess(tx) {
    return new Promise((accept, reject) => {
        try {
            tx.on('error', err => reject(err));
            tx.on('receipt', receipt => accept(receipt));
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}

function etherToWei(etherAmount) {
    return new BigNumber(etherAmount)
        .times('1e18')
        .integerValue()
        .toString(10);
}

function weiToEther(weiAmount) {
    return new BigNumber(weiAmount)
        .div('1e18')
        .toString(10);
}

//不是native token时，value写0或不写
async function estimateGas(web3, from, to, data, value) {
    let gasPrice = await web3.eth.getGasPrice()
    let nonce = await web3.eth.getTransactionCount(from, "latest")
    let val = value ? value : 0;
    let gas = await web3.eth.estimateGas({
        from: from,
        to: to,
        nonce: nonce,
        value: val,
        data: data
    });
    return {gasPrice, gas}
}

async function getGasPrice(web3) {
    let gasPrice = await web3.eth.getGasPrice();
    return gasPrice;
}

module.exports = {
    etherToWei,
    weiToEther,
    createQueryString,
    waitForTxSuccess,
    estimateGas,
    getGasPrice,
    NULL_ADDRESS
};
