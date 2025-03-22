// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LiquidityPool {
    address public owner;
    address public stakingGameContract;

    event RewardTransferred(address indexed user, uint256 amount);
    event Deposited(address indexed sender, uint256 amount);
    event OwnershipTransferred(address oldOwner, address newOwner);
    event GameContractSet(address oldAddress, address newAddress);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }

    modifier onlyStakingGame() {
        require(msg.sender == stakingGameContract, "Only staking game can call");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        emit Deposited(msg.sender, msg.value);
    }

    function deposit() external payable {
        require(msg.value > 0, "Send ETH to deposit");
        emit Deposited(msg.sender, msg.value);
    }

    function setStakingGameContract(address _stakingGameContract) external onlyOwner {
        emit GameContractSet(stakingGameContract, _stakingGameContract);
        stakingGameContract = _stakingGameContract;
    }

    function transferReward(address payable user, uint256 amount) external onlyStakingGame {
        require(address(this).balance >= amount, "Insufficient reward pool balance");
        user.transfer(amount);
        emit RewardTransferred(user, amount);
    }

    function withdrawPoolFunds(address payable to, uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Not enough balance in pool");
        to.transfer(amount);
    }

    function getPoolBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
