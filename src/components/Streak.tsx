import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import ETHABI from './ETHABI.json';

// Extend Window interface
declare global {
  interface Window {
    ethereum?: any;
  }
}

const STAKING_CONTRACT_ADDRESS = '0x6e4e84e0f879c7c637ceb4a87262e6f105ffb25a';

interface StakeInfo {
  stakedAmount: bigint;
  rewards: bigint;
  lastStakeTime: bigint;
}

const Streak = () => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [stakeInfo, setStakeInfo] = useState<StakeInfo>({
    stakedAmount: BigInt(0),
    rewards: BigInt(0),
    lastStakeTime: BigInt(0),
  });
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setLoading(true);
        
        // Check if ethereum is already defined
        if (window.ethereum && window.ethereum.isMetaMask) {
          const providerInstance = new ethers.BrowserProvider(window.ethereum);
          const signerInstance = await providerInstance.getSigner();
          const userAccount = await signerInstance.getAddress();
  
          const stakingContract = new ethers.Contract(
            STAKING_CONTRACT_ADDRESS,
            ETHABI,
            signerInstance
          );
  
          setProvider(providerInstance);
          setSigner(signerInstance);
          setContract(stakingContract);
          setAccount(userAccount);
  
          toast.success('Wallet connected!');
        } else {
          toast.error('MetaMask is not available');
        }
      } catch (error) {
        console.error('Wallet connection failed:', error);
        toast.error('Wallet connection failed');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Please install MetaMask');
    }
  };
  const [isStaked, setIsStaked] = useState(false);

  const fetchStakeInfo = async () => {
    if (contract && account) {
      try {
        const info = await contract.getStakeInfo(account);
        console.log('Stake info:', info); // Log the response for debugging

        // Map the response to the StakeInfo interface
        const stakeInfoData: StakeInfo = {
          stakedAmount: info[1], // Staked amount in wei
          rewards: BigInt(0), // Assuming rewards are not part of this response
          lastStakeTime: info[2], // Last stake time in seconds
        };

        setStakeInfo(stakeInfoData);
      } catch (error) {
        console.error('Failed to fetch stake info:', error);
        toast.error('Failed to fetch stake info');
      }
    }
  };

  const stakeETH = async () => {
    if (!stakeAmount || isNaN(Number(stakeAmount)) || Number(stakeAmount) <= 0) {
      toast.error('Please enter a valid stake amount');
      return;
    }

    if (!contract) {
      toast.error('Contract not loaded');
      return;
    }

    try {
      setLoading(true);
      const tx = await contract.stake({ value: ethers.parseEther(stakeAmount) });
      await tx.wait();
      toast.success('Stake successful!');
      setStakeAmount('');
      fetchStakeInfo();
      setIsStaked(true);
      // setTimeout(fetchStakeInfo, 2000); // slight delay ensures chain state sync
    } catch (error) {
      toast.error('Stake transaction failed');
    } finally {
      setLoading(false);
    }
  };

  const claimReward = async () => {
    if (!contract) {
      toast.error('Contract not loaded');
      return;
    }

    try {
      setLoading(true);
      const tx = await contract.claim();
      await tx.wait();
      toast.success('Rewards claimed!');
      setTimeout(fetchStakeInfo, 2000);
    } catch (error) {
      toast.error('Claim transaction failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStakeInfo();
  }, [contract, account]);

  const formatWeiToEth = (value: bigint | null) => {
    if (value === null) return "0"; // Return "0" if the value is null
    return ethers.formatEther(value);
  };
  useEffect(() => {
    fetchStakeInfo();
  }, [contract, account]);

  return (
    <div className="flex flex-col items-center mt-24 gap-4 mx-auto p-4 max-w-md border rounded shadow text-black">
      <h1 className='text-xl font-extrabold'><span className='text-yellow-500'>Stake</span> to <span className='text-green-500'>Learn</span> 🚀</h1>
      <h1 className="text-xl font-bold text-purple-600">Streak Dashboard</h1>

      {loading && (
        <div className="flex items-center gap-2 text-blue-500">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
          <span>Processing...</span>
        </div>
      )}

      {!account && (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      )}

      {account && (
        <>
          <div className="w-full p-3 border rounded bg-gray-50">
            <p><strong>Connected:</strong> {`${account.slice(0, 6)}...${account.slice(-4)}`}</p>
            <p><strong>Staked Amount:</strong> {formatWeiToEth(stakeInfo.stakedAmount)} ETH</p>
            <p><strong>Rewards:</strong> {formatWeiToEth(stakeInfo.rewards)} ETH</p>
            <p><strong>Last Stake Time:</strong> {new Date(Number(stakeInfo.lastStakeTime) * 1000).toLocaleString()}</p>
          </div>

          {!isStaked && (
            <div className="w-full mt-4">
              <input
                type="number"
                placeholder="Enter ETH to stake"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="w-full px-4 py-2 border rounded mb-2"
              />
              <button
                onClick={stakeETH}
                className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                disabled={loading}
              >
                Stake ETH
              </button>
            </div>
          )}

          {/* {isStaked && ( */}
            <button
              onClick={claimReward}
              className="w-full px-4 py-2 mt-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              disabled={loading}
            >
              Claim Rewards
            </button>
          {/* )} */}
        </>
      )}
    </div>
  );
};
export default Streak;