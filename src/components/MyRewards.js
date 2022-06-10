import React from 'react'

import { useMoralis } from 'react-moralis';

import CustomTable from './CustomTable';
import BlueButton from './BlueButton';

import rewardPoolContractAbi from "../assets/blockchain/reward_pool_abi.json";
import erc20Abi from "../assets/blockchain/erc20_abi.json";
import { ethers } from 'ethers';

const HEADERS = [
  'Name',
  // 'Min Balance Required',
  'Current Status',
  'Total Rewarded',
  'Claimable',
  'Next Claim',
  'Action'
]

const MyRewards = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [tablerows, setTablerows] = React.useState([]);
  const { isAuthenticated, isAuthenticating, user, account, Moralis } = useMoralis();
  const t = useMoralis();

  let rows = [];

  // console.log("Signer", await signer.getAddress())

  React.useEffect(() => {
    async function fetchData() {

      // console.log("is Authenticating?", isAuthenticating);
      // console.log("is Authenticated?", isAuthenticated);

      // console.log("account?", account);
      if (isAuthenticated) {
        // console.log("is loading?", isLoading)
        const provider = await Moralis.enableWeb3();
        const signer = provider.getSigner(account);

        // console.log("Signer", await signer.getAddress())
        // console.log("Totality", t)
        const rewardPoolContract = new ethers.Contract(
          "0x0F7eB0cE0803Ac8aA1799777797B3db90ecACcAF",
          rewardPoolContractAbi,
          signer
        );

        let promiseArr = [], results;

        for (let i = 0; i < 10; i++) {
          promiseArr.push(rewardPoolContract.rewardAssetAt(i))
        }
        const tokenAddresses = await Promise.all(promiseArr);

        promiseArr = [];
        for (let i = 0; i < 10; i++) {
          if(tokenAddresses[i] !== "0x0000000000000000000000000000000000000000"){
            const erc20Contract = new ethers.Contract(
              tokenAddresses[i],
              erc20Abi,
              signer
            );
            promiseArr.push(erc20Contract.name())
          }
        }
        const tokenNames = await Promise.all(promiseArr);

        const totalTokens = tokenNames.length;

        promiseArr = [];

        for (let i = 0; i < totalTokens; i++) {
          promiseArr.push(rewardPoolContract.rewardInfo(tokenAddresses[i]))
        }

        const currentStatus = (await Promise.all(promiseArr)).map(({minimumTokenBalanceForRewards}) => (ethers.utils.formatEther(minimumTokenBalanceForRewards.toString())));

        promiseArr = [];

        for (let i = 0; i < totalTokens; i++) {
          promiseArr.push(rewardPoolContract.withdrawnRewardOf(tokenAddresses[i], account))
        }

        const totalRewarded = (await Promise.all(promiseArr)).map(each => ethers.utils.formatEther(each.toString()));

        promiseArr = [];

        for (let i = 0; i < totalTokens; i++) {
          promiseArr.push(rewardPoolContract.withdrawableRewardOf(tokenAddresses[i], account))
        }

        const claimable = (await Promise.all(promiseArr)).map(each => ethers.utils.formatEther(each.toString()));

        promiseArr = [];

        for (let i = 0; i < totalTokens; i++) {
          promiseArr.push(rewardPoolContract.getAccountRewardsInfo(tokenAddresses[i], account))
        }

        const nextClaim = (await Promise.all(promiseArr)).map(({nextClaimTime}) => nextClaimTime.toString());

        
        for(let i = 0 ; i < totalTokens ; i++){
          rows.push([tokenNames[i], currentStatus[i], totalRewarded[i], claimable[i], nextClaim[i], <BlueButton onClick={() => rewardPoolContract.singleRewardClaimByUser(tokenAddresses[i])}>Claim</BlueButton>])
        }

        setTablerows(rows)
        setIsLoading(prev => false)

      }



    }

    fetchData()

  }, [isAuthenticated])

  return (
    <CustomTable headers={HEADERS} isLoading={isLoading} tablerows={tablerows}/>
  )
}

export default MyRewards