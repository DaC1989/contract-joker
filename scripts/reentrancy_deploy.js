const hre = require("hardhat");

async function main() {
    await hre.run('compile');
    const Bank= await hre.ethers.getContractFactory("Bank");
    const bank = await Bank.deploy();
    await bank.deployed();

    console.log( `Bank deployed to ${bank.address}`);

    const Attack = await hre.ethers.getContractFactory("Attack");
    const attack = await Attack.deploy(bank.address);
    await attack.deployed();

    console.log( `Attack deployed to ${attack.address}`);
    // Bank deployed to 0x0165878A594ca255338adfa4d48449f69242Eb8F
    // Attack deployed to 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});