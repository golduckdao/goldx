import React from 'react'
import Box from "@mui/material/Box";

import MobileTable from './MobileTable';
import BlueButton from '../components/BlueButton';

import rewardPoolContractAbi from "../assets/blockchain/reward_pool_abi.json";
import erc20Abi from "../assets/blockchain/erc20_abi.json";
import { BigNumber, ethers } from 'ethers';
import useStore from '../store/store';

const HEADERS = [
  'Name',
  'Min Balance Required',
  'Share %',
  'Claim Wait (Days)',
  'Archived',
  'Active'
];

const SettingsMobile = () => {
  const {rewardPoolContractAddress, isAuthenticated} = useStore(state=>state);
  const [isLoading, setIsLoading] = React.useState(true);
  const [tablerows, setTablerows] = React.useState([]);
  const [lastBuyBackTimestamp, setLastBuyBackTimestamp] = React.useState(BigNumber.from(0));
  const [buyBackWait, setBuyBackWait] = React.useState(BigNumber.from(0))




  // console.log("Signer", await signer.getAddress())

  React.useEffect(() => {
    async function fetchData() {
      let rows = [];
      // console.log("is Authenticating?", isAuthenticating);
      // console.log("is Authenticated?", isAuthenticated);

      // console.log("account?", account);
      if (isAuthenticated) {
        // console.log("is loading?", isLoading)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(0);

        // console.log("Signer", await signer.getAddress())
        // console.log("Totality", t)
        const rewardPoolContract = new ethers.Contract(
          rewardPoolContractAddress,
          rewardPoolContractAbi,
          signer
        );

        const l = await rewardPoolContract.lastBuyBackTimestamp();
        const b = await rewardPoolContract.buyBackWait();
        setLastBuyBackTimestamp(l);
        setBuyBackWait(b);

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
          promiseArr.push(rewardPoolContract.rewardInfo(tokenAddresses[i]))
        }

        let rewardInfoRows = (await Promise.all(promiseArr));

        console.log("Rewards Info Fetched", rewardInfoRows);

        rewardInfoRows = rewardInfoRows.map(({
          minimumTokenBalanceForRewards,
          distributeShare,
          claimWait,
          isActive,
          isRemoved
        }) => ([
          parseFloat(ethers.utils.formatEther(minimumTokenBalanceForRewards.toString())).toFixed(2),
          distributeShare.toString(),
          parseFloat(claimWait.div(60*60*24).toString()),
          // parseFloat(buyBackWait.div(BigNumber.from(60 * 60 * 24)).toString()).toFixed(2),
          isRemoved ? "Yes" : "No",
          isActive ? "Yes" : "No",

        ]));
        console.log("Rewards Info Processed", rewardInfoRows);


        for (let i = 0; i < tokenNames.length; i++) {
          // if(rewardInfoRows[i][3]) {
          //   rewardInfoRows[i][3] = await rewardPoolContract.generateBuyBackForOpen()
          // } else {
          //   rewardInfoRows[i][3] = false;
          // }
          rows.push([
            tokenNames[i],
            ...rewardInfoRows[i]
          ])
        }
        // console.log("Rows", rows);

        setTablerows(rows)
        setIsLoading(false)

      }



    }

    fetchData()

  }, [isAuthenticated]);

  const handleGenerateRewards = async () => {
    if(isAuthenticated) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const rewardPoolContract = new ethers.Contract(
        rewardPoolContractAddress,
        rewardPoolContractAbi,
        signer
      );
      await rewardPoolContract.generateBuyBackForOpen();
    }
  }
  return (
    <>
    <MobileTable headers={HEADERS} rows={tablerows} isLoading={isLoading}/>
    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
      <BlueButton disabled={parseFloat(lastBuyBackTimestamp.add(buyBackWait).mul(1000).toString()) > Date.now()} onClick={handleGenerateRewards}>Generate Rewards</BlueButton>
    </Box>
    </>
  )
}

export default SettingsMobile