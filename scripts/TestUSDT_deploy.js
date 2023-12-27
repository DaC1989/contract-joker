const hre = require("hardhat");

async function main() {
    await hre.run('compile');
    const signers = await hre.ethers.getSigners();
    //提供TestUSDT测试代币
    const ERC20 = await hre.ethers.getContractFactory("TestUSDT");
    const erc20 = await ERC20.deploy("TestUSDT", "TestUSDT" );
    await erc20.deployed();
    console.log("TestUSDT deployed to:", erc20.address);//0x47Ae10936Ab114596f287961c7810BC74159c949
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});