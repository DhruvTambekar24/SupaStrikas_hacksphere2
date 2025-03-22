pragma solidity ^0.8.20;

import "./LiquidityPool.sol";

contract EthStakingGame {
    uint256 public constant TASK_PERIOD = 7 days;
    uint256 public constant REWARD_PERCENT = 5;
    address public owner;
    address payable public liquidityPoolAddress; // <-- store as address

    struct StakeInfo {
        address user;
        uint256 amount;
        uint256 stakeStartTime;
        bool claimed;
    }

    mapping(address => StakeInfo) public stakes;
    mapping(address => bool) public gameCompleted;
    mapping(address => bool) public gameRewardClaimed;

    event Staked(address indexed user, uint256 amount, uint256 time);
    event Claimed(address indexed user, uint256 stakeAmount, uint256 reward, uint256 time);
    event BurnedForFailure(address indexed user, uint256 amountLost, uint256 time);
    event GameRewardClaimed(address indexed user, uint256 amount, uint256 time);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }

    constructor(address payable _liquidityPool) {
        owner = msg.sender;
        liquidityPoolAddress = _liquidityPool;  // store the address only
    }

    function stake() external payable {
        require(msg.value > 0, "Send ETH to stake");
        require(stakes[msg.sender].amount == 0, "Already staked");

        stakes[msg.sender] = StakeInfo({
            user: msg.sender,
            amount: msg.value,
            stakeStartTime: block.timestamp,
            claimed: false
        });

        emit Staked(msg.sender, msg.value, block.timestamp);
    }

    function claim() external {
        StakeInfo storage stakeInfo = stakes[msg.sender];
        require(stakeInfo.amount > 0, "No active stake");
        require(!stakeInfo.claimed, "Already claimed");

        uint256 timePassed = block.timestamp - stakeInfo.stakeStartTime;
        require(timePassed <= TASK_PERIOD, "Task period expired");

        uint256 reward = (stakeInfo.amount * REWARD_PERCENT) / 100;
        stakeInfo.claimed = true;

        payable(msg.sender).transfer(stakeInfo.amount);
        LiquidityPool(liquidityPoolAddress).transferReward(payable(msg.sender), reward); // <--- cast here

        emit Claimed(msg.sender, stakeInfo.amount, reward, block.timestamp);
    }

    function burnForFailure(address user) external onlyOwner {
        StakeInfo storage stakeInfo = stakes[user];
        require(stakeInfo.amount > 0, "No active stake");
        require(!stakeInfo.claimed, "Already claimed");
        require(block.timestamp > stakeInfo.stakeStartTime + TASK_PERIOD, "Still within period");

        uint256 lostAmount = stakeInfo.amount;
        stakeInfo.amount = 0;
        stakeInfo.claimed = true;

        emit BurnedForFailure(user, lostAmount, block.timestamp);
    }

    function setGameCompleted(address user) external onlyOwner {
        gameCompleted[user] = true;
    }

    function claimGameReward() external {
        // require(gameCompleted[msg.sender], "Game not completed");
        // require(!gameRewardClaimed[msg.sender], "Game reward already claimed");
        uint256 gameReward = 0.01 ether;
        // gameRewardClaimed[msg.sender] = true;
        LiquidityPool(liquidityPoolAddress).transferReward(payable(msg.sender), gameReward);

        emit GameRewardClaimed(msg.sender, gameReward, block.timestamp);
    }

    function getStakeInfo(address user) external view returns (StakeInfo memory) {
        return stakes[user];
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable {}
}
