const {ethers} = require("hardhat");

describe("reentrancy_attack", function () {

    async function deploy() {
        const [owner, otherAccount] = await ethers.getSigners();
        console.log(owner.address, otherAccount.address);
        const Bank = await ethers.getContractFactory("Bank");
        const bank = await Bank.deploy();
        console.log("bank deployed to ", bank.address);

        const Attack = await ethers.getContractFactory("Attack");
        const attack = await Attack.deploy(bank.address);
        console.log("attack deployed to ", attack.address);

    }

    it("test", async function () {
        await deploy();
    }).timeout(60000);

});