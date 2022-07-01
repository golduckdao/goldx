import React from 'react'

import Box from "@mui/material/Box";

import { useMoralis } from 'react-moralis';

import rewardPoolContractAbi from "../assets/blockchain/reward_pool_abi.json";
import erc20Abi from "../assets/blockchain/erc20_abi.json";
import { ethers } from 'ethers';

import CustomTable from './CustomTable'
import BlueButton from '../components/BlueButton';
import useStore from '../store/store';

const HEADERS = [
  'Name',
  'No. of Holders',
  'Total Holder Supply',
  'Total Generated',
  'Total Distributed',
  'Total Claimable',
]

const Overview = () => {
  const rewardPoolContractAddress = useStore(state=>state.rewardPoolContractAddress);
  const [isLoading, setIsLoading] = React.useState(true);
  const [tablerows, setTablerows] = React.useState([]);
  const { isAuthenticated, account, Moralis } = useMoralis();


  

  // console.log("Signer", await signer.getAddress())

  React.useEffect(() => {
    async function fetchData() {

      // console.log("is Authenticating?", isAuthenticating);
      // console.log("is Authenticated?", isAuthenticated);

      // console.log("account?", account);
      if (isAuthenticated) {
        let rows = [];
        // console.log("is loading?", isLoading)
        const provider = new ethers.providers.Web3Provider(Moralis.provider);
        const signer = provider.getSigner(account);

        // console.log("Signer", await signer.getAddress())
        // console.log("Totality", t)
        const rewardPoolContract = new ethers.Contract(
          rewardPoolContractAddress,
          rewardPoolContractAbi,
          signer
        );

        let promiseArr = [];

        for (let i = 0; i < 10; i++) {
          promiseArr.push(rewardPoolContract.rewardAssetAt(i))
        }
        const tokenAddresses = await Promise.all(promiseArr);

        promiseArr = [];
        for (let i = 0; i < 10; i++) {
          if (tokenAddresses[i] !== "0x0000000000000000000000000000000000000000") {
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
          promiseArr.push(rewardPoolContract.getNumberOfTokenHolders(tokenAddresses[i]))
        }

        const noOfHolders = (await Promise.all(promiseArr)).map(each => each.toString());
        

        promiseArr = [];

        for (let i = 0; i < totalTokens; i++) {
          promiseArr.push(rewardPoolContract.getTotalRewardsDistributed(tokenAddresses[i]));
        }

        const totalDistributed = (await Promise.all(promiseArr)).map(each => parseFloat(ethers.utils.formatEther(each.toString())).toFixed(16));

        promiseArr = [];
        for (let i = 0; i < totalTokens; i++) {
          promiseArr.push(rewardPoolContract.rewardInfo(tokenAddresses[i]))
        }

        let totalGenerated = (await Promise.all(promiseArr)).map(({totalRewardsDistributed}) => parseFloat(ethers.utils.formatEther(totalRewardsDistributed.toString())).toFixed(16));

        promiseArr = [];
        for (let i = 0; i < totalTokens; i++) {
          promiseArr.push(rewardPoolContract.totalHolderSupply(tokenAddresses[i]))
        }

        const totalHolderSupply = (await Promise.all(promiseArr)).map(each => ethers.utils.formatEther(each.toString()));

        for (let i = 0; i < totalTokens; i++) {
          rows.push([tokenNames[i], noOfHolders[i], totalHolderSupply[i], totalGenerated[i], totalDistributed[i],  totalGenerated[i] - totalDistributed[i] ])
        }
        
        setTablerows(rows)
        setIsLoading(prev => false)

      }
    }

    fetchData()

  }, [isAuthenticated, rewardPoolContractAddress, account]);

  const handleUpdateBalance = async () => {
    if(isAuthenticated){

      const provider = new ethers.providers.Web3Provider(Moralis.provider);
      const signer = provider.getSigner(account);
      const rewardPoolContract = new ethers.Contract(
        rewardPoolContractAddress,
        rewardPoolContractAbi,
        signer
      );
      await rewardPoolContract.updateBalance();
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <BlueButton onClick={handleUpdateBalance}>Update Balance</BlueButton>
      </Box>
      <CustomTable headers={HEADERS} isLoading={isLoading} tablerows={tablerows} ikey={"overview"}/>
    </>
  )
}

export default Overview