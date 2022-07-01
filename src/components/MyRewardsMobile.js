import React from 'react';
import MobileTable from './MobileTable';
import { useMoralis } from 'react-moralis';
import rewardPoolContractAbi from "../assets/blockchain/reward_pool_abi.json";
import erc20Abi from "../assets/blockchain/erc20_abi.json";
import { ethers } from 'ethers';
import { Box } from '@mui/material';
import BlueButton from '../components/BlueButton';
import useStore from '../store/store';

const HEADERS = [
  'Name',
  // 'Min Balance Required',
  'Current Status',
  'Total Rewarded',
  'Claimable',
  'Next Claim',
]

const MyRewardsMobile = () => {
  const rewardPoolContractAddress = useStore(state => state.rewardPoolContractAddress);
  const [isLoading, setIsLoading] = React.useState(true);
  const [tablerows, setTablerows] = React.useState([]);
  const { isAuthenticated, account, Moralis, isWeb3Enabled } = useMoralis();

  React.useEffect(() => {
    async function fetchData() {
      let rows = [];
      // console.log("is Authenticating?", isAuthenticating);
      // console.log("is Authenticated?", isAuthenticated);

      // console.log("account?", account);
      if (isAuthenticated) {
        if(!isWeb3Enabled) await Moralis.enableWeb3();
        
        console.log(isWeb3Enabled)
        const provider = new ethers.providers.Web3Provider(Moralis.provider);
        const signer = provider.getSigner(account);

        // console.log("Signer", await signer.getAddress())
        // console.log("Totality", t)
        const rewardPoolContract = new ethers.Contract(
          rewardPoolContractAddress,
          rewardPoolContractAbi,
          signer
        );

        const nativeAsset = await rewardPoolContract.nativeAsset();
        const nativeAssetContract = new ethers.Contract(
          nativeAsset,
          erc20Abi,
          signer
        );
        const nativeAssetBalance = await nativeAssetContract.balanceOf(account);


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

        const minTokenBalReqd = (await Promise.all(promiseArr)).map(({minimumTokenBalanceForRewards}) => minimumTokenBalanceForRewards);

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

        const nextClaim = (await Promise.all(promiseArr)).map(({nextClaimTime}) => nextClaimTime.mul(1000).toString());

        for(let i = 0 ; i < totalTokens ; i++){
          let d = nextClaim[i] === '0' ? 'N/A' : new Date(parseInt(nextClaim[i]));

          console.log("Next Claim for token", i, d);

          rows.push([
            tokenNames[i],
            nativeAssetBalance.gte(minTokenBalReqd[i]) ? "Eligible" : "Not Eligible", totalRewarded[i], claimable[i],
            nextClaim[i] === '0' ? d : `${d.getUTCDate()}/${d.getUTCMonth() + 1}/${d.getUTCFullYear()} - ${d.getUTCHours()}:${d.getUTCMinutes()}` ,
            // <BlueButton onClick={() => rewardPoolContract.singleRewardClaimByUser(tokenAddresses[i])}>
            //   Claim
            // </BlueButton>
          ]);
        }
        setTablerows(rows)
        setIsLoading(false)

      }



    }

    fetchData()

  }, [isAuthenticated, rewardPoolContractAddress]);

  const handleClaimAll = async () => {
    if(isAuthenticated) {
      const provider = new ethers.providers.Web3Provider(Moralis.provider);
      const signer = provider.getSigner(account);

      // console.log("Signer", await signer.getAddress())
      // console.log("Totality", t)
      const rewardPoolContract = new ethers.Contract(
        rewardPoolContractAddress,
        rewardPoolContractAbi,
        signer
      );
      await rewardPoolContract.multipleRewardClaimByUser();
    } 
    // else if( !isWeb3Enabled) {const t = await Moralis.enableWeb3(); console.log("Awaiting", isWeb3Enabled)}
  }

  return (
    <>
    <MobileTable headers={HEADERS} rows={tablerows} isLoading={isLoading}/>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 3}}>
      <BlueButton onClick={handleClaimAll}>Claim All Rewards</BlueButton>
    </Box>
    </>
  )
}

export default MyRewardsMobile