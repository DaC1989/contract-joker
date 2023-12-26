// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Bank {
    //地址=>余额
    mapping(address => uint) balance;
    //充值
    function deposit() public payable{
        console.log("deposit");
        balance[msg.sender] += msg.value;
    }

    //提款msg.sender的全部ether
    function withdraw() public {
        console.log("withdraw", balance[msg.sender]);
        console.log("withdraw msg.sender", msg.sender);
        console.log("withdraw address(this).balance", address(this).balance);
        require(balance[msg.sender] > 0 ether, "Insufficient funds.  Cannot withdraw");
        //这里具有重入攻击的风险
        console.log("withdraw", "begin");
        (bool success,) = msg.sender.call{value: balance[msg.sender]}("");
        require(success);
        balance[msg.sender] = 0;
    }

    //获取本合约的余额
    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    //获取本合约的具体地址余额
    function getBalanceWithAddress(address client) public view returns(uint){
        return balance[client];
    }

}
