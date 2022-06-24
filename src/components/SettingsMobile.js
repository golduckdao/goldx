import React from 'react'
import MobileTable from './MobileTable'

import { useMoralis } from 'react-moralis';
import rewardPoolContractAbi from "../assets/blockchain/reward_pool_abi.json";
import erc20Abi from "../assets/blockchain/erc20_abi.json";
import { BigNumber, ethers } from 'ethers';

const HEADERS = [
  'Name',
  'Min Balance Required',
  'Share %',
  'Claim Wait',
  'Buyback Wait',
  'Active'
];

const SettingsMobile = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [tablerows, setTablerows] = React.useState([]);
  // const [lastBuyBackTimestamp, setLastBuyBackTimestamp] = React.useState(BigNumber.from(0));
  const [buyBackWait, setBuyBackWait] = React.useState(BigNumber.from(0))
  const { isAuthenticated, account, Moralis } = useMoralis();




  // console.log("Signer", await signer.getAddress())

  React.useEffect(() => {
    async function fetchData() {
      let rows = [];
      // console.log("is Authenticating?", isAuthenticating);
      // console.log("is Authenticated?", isAuthenticated);

      // console.log("account?", account);
      if (isAuthenticated) {
        // console.log("is loading?", isLoading)
        const provider = new ethers.providers.Web3Provider(Moralis.provider);
        const signer = provider.getSigner(account);

        // console.log("Signer", await signer.getAddress())
        // console.log("Totality", t)
        const rewardPoolContract = new ethers.Contract(
          "0x0F7eB0cE0803Ac8aA1799777797B3db90ecACcAF",
          rewardPoolContractAbi,
          signer
        );

        // const l = await rewardPoolContract.lastBuyBackTimestamp();
        const b = await rewardPoolContract.buyBackWait();
        // setLastBuyBackTimestamp(l);
        setBuyBackWait(b);

        let promiseArr = [], results;

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

        let rewardInfoRows = (await Promise.all(promiseArr)).map(({
          minimumTokenBalanceForRewards,
          distributeShare,
          claimWait,
          isActive
        }) => ([
          parseFloat(ethers.utils.formatEther(minimumTokenBalanceForRewards.toString())).toFixed(2),
          distributeShare.toString(),
          parseFloat(claimWait.toString()) / (60 * 24),
          parseFloat(buyBackWait.div(BigNumber.from(60 * 60 * 24)).toString()).toFixed(2),
          isActive ? "Yes" : "No",

        ]));


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

  return (
    <MobileTable headers={HEADERS} rows={tablerows} isLoading={isLoading}/>
  )
}

export default SettingsMobile