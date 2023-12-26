const hre = require("hardhat");

async function main() {
    await hre.run('compile');
    const signers = await hre.ethers.getSigners();
    //提供ERC20测试代币
    const ERC20 = await hre.ethers.getContractFactory("TestERC20");
    const erc20 = await ERC20.deploy("WETH", "WETH" );
    await erc20.deployed();
    console.log("erc20 deployed to:", erc20.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});