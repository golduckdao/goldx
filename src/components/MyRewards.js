import React from 'react'

import { useMoralis } from 'react-moralis';

import CustomTable from './CustomTable'

import rewardPoolContractAbi from "../assets/blockchain/reward_pool_abi.json";
import erc20Abi from "../assets/blockchain/erc20_abi.json";
import { ethers } from 'ethers';

const HEADERS = [
  'Name',
  'Min Balance Required',
  'Total Rewarded',
  'Claimable',
  'Next Claim',
  'Action'
]

const MyRewards = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const { isAuthenticated, isAuthenticating, user, account, Moralis} = useMoralis();
  const t = useMoralis();

  // console.log("Signer", await signer.getAddress())

  React.useEffect(() => {
    async function fetchData(){
      
    // console.log("is Authenticating?", isAuthenticating);
    // console.log("is Authenticated?", isAuthenticated);

    // console.log("account?", account);
    if(isAuthenticated) {
      console.log("is loading?", isLoading)
      const provider = await Moralis.enableWeb3();
      const signer = provider.getSigner(account);
  
      console.log("Signer", await signer.getAddress())   
      console.log("Totality", t)
      const rewardPoolContract = new ethers.Contract(
        "0x0F7eB0cE0803Ac8aA1799777797B3db90ecACcAF",
        rewardPoolContractAbi,
        signer
      );
      let promiseArr = [];
      console.log("Starting promise");

      for(let i = 0 ; i< 10 ; i++ ) {
        // promiseArr.push( async () => {
          console.log("Pushing promise",i);
          const poolAssetAddress = await rewardPoolContract.rewardAssetAt(i);
          console.log("Reward Pool Asset", poolAssetAddress, i)
          const erc20Contract = new ethers.Contract(
            poolAssetAddress,
            erc20Abi,
            provider
          )
          console.log("Reward Pool Asset name", await  erc20Contract.name(), i);
        // })
      }
      // Promise.allSettled(promiseArr).then( (results) => 
      // {setIsLoading(prev => false); console.log("All settled")});
      setIsLoading(prev => false)

    }



    }

    fetchData()

  }, [isAuthenticated])

  return (
    <CustomTable headers={HEADERS} isLoading={isLoading}/>
  )
}

export default MyRewards