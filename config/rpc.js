const { alchemySepoliaHttps} = require('../secrets.json');

// Example Configuration
exports.CurrentConfig = {
  rpc: {
    local: 'http://localhost:8545',
    mainnet: 'https://eth-mainnet.g.alchemy.com/v2/c-CDaw1Y7wQXYzF26ghoozSQJkzLluCF',
    alchemySepoliaHttps: alchemySepoliaHttps,
  },
}
