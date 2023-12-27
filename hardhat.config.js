require("@nomicfoundation/hardhat-toolbox");
const { alchemySepoliaHttps, acc1, acc2 } = require('./secrets.json');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork:"local",
  networks: {
    local: {
      url: 'http://127.0.0.1:8545/'
    },
    sepolia: {
      url: `${alchemySepoliaHttps}`,
      accounts: [acc1.privateKey, acc2.privateKey]
    }
  }
};
