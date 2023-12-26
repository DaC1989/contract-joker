require("@nomicfoundation/hardhat-toolbox");
const { alchemyApiKey, privateKey, aTestPrivateKey } = require('./secrets.json');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork:"local",
  networks: {
    local: {
      url: 'http://127.0.0.1:8545/',
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${alchemyApiKey}`,
      accounts: [privateKey, aTestPrivateKey],
    },
  },
};
