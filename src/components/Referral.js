import React, { useState, useEffect } from 'react'
import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import InnerBox from "../components/InnerBox";
import BlueButton from '../components/BlueButton';
import { useMoralis } from 'react-moralis';

import buyTokenABI from "../assets/blockchain/buy_token_abi.json";
import { ethers } from 'ethers';
import CopyToClipboard from 'react-copy-to-clipboard';
import useStore from '../store/store';

const Referral = () => {
  const buyTokenContractAddress = useStore(state => state.buyTokenContractAddress)
  const [isReferral, setIsReferral] = useState(true);
  const [chainTokenEarned, setChainTokenEarned] = useState(0);
  const [nativeTokenEarned, setNativeTokenEarned] = useState(0);
  const [totalReferrals, setTotalReferrals] = useState(0);
  
  const {isAuthenticated, isWeb3Enabled, account, Moralis} = useMoralis();

  useEffect(() => {
    async function fetchData() {
      if(isAuthenticated) {
        if(!isWeb3Enabled) await Moralis.enableWeb3();
        const provider = new ethers.providers.Web3Provider(Moralis.provider);

        const buyTokenContract = new ethers.Contract(
          buyTokenContractAddress,
          buyTokenABI,
          provider
        );
        setIsReferral(await buyTokenContract.isReferral());
        const {bnbEarned, tokenEarned, totalReferrals} = await buyTokenContract.referralCommission(account);
        setChainTokenEarned(ethers.utils.formatEther(bnbEarned.toString()));
        setNativeTokenEarned(ethers.utils.formatEther(tokenEarned.toString()));
        setTotalReferrals(totalReferrals.toString());
      }
    };
    fetchData();
  }, []);
  return (
    <InnerBox paperSx={{p:2, pt: 4}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography>
          <b>Total Invited</b>                    
        </Typography>
        <Typography>{totalReferrals} Users</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 5}}>
        <Typography>
          <b>Total Earned</b>                    
        </Typography>
        <Typography>{nativeTokenEarned}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography>
          <b>Amount Earned</b>                    
        </Typography>
        <Typography>{chainTokenEarned} BNB</Typography>
      </Box>

      <Typography align='left' mt={5}>
        <b>Your Referral Link:</b>
      </Typography>
      <Typography align="left" mb={2} noWrap>
        {
          isReferral ? `https://goldentoken.com/buy/${account}`: 'N/A'
        }
        
      </Typography>
      <CopyToClipboard text={isReferral ? `https://goldentoken.com/buy/${account}`: 'N/A'}>
        <BlueButton fullWidth>
          Copy to Clipboard
        </BlueButton>
      </CopyToClipboard>

    </InnerBox>
  )
}

export default Referral