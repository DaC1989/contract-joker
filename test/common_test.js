const { Web3 } = require('web3');
const { CurrentConfig } = require( '../config/rpc');

const web3 = new Web3(CurrentConfig.rpc.polygonMumbai);


