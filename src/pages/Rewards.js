import React, { useState } from 'react'
import { Typography, Box, Tabs, Tab } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BlueButton from '../components/BlueButton';
import TabPanel from '../components/TabPanel';
import MyRewards from '../components/MyRewards';
import Overview from '../components/Overview';
import Settings from '../components/Settings';
import { useMoralis } from 'react-moralis';
import { ethers } from 'ethers';
import rewardPoolContractAbi from "../assets/blockchain/reward_pool_abi.json";

const Rewards = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const {isAuthenticated, isWeb3Enabled, Moralis, account} = useMoralis();
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClaimAll = async () => {
    if(isAuthenticated) {
      const provider = new ethers.providers.Web3Provider(Moralis.provider);
      const signer = provider.getSigner(account);

      // console.log("Signer", await signer.getAddress())
      // console.log("Totality", t)
      const rewardPoolContract = new ethers.Contract(
        "0x0F7eB0cE0803Ac8aA1799777797B3db90ecACcAF",
        rewardPoolContractAbi,
        signer
      );
      await rewardPoolContract.multipleRewardClaimByUser();
    } 
    // else if( !isWeb3Enabled) {const t = await Moralis.enableWeb3(); console.log("Awaiting", isWeb3Enabled)}
  }

  return (
    <>
    <Box sx={{
      display: {xs: 'none', sm: 'block'},
      ml: {sm: '200px'},
      px: 4,
      background: '#0C0926',
      borderRadius: '30px 0px 0px 0px'
    }}>
      <Box sx={{
        py: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography><b>Rewards Dashboard</b></Typography>
        <BlueButton onClick={handleClaimAll}>Claim All Rewards</BlueButton>
      </Box>
      <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: "100%",
      }}>
        <Box sx={{
          // display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center',
          width: "100%",
          // height: {sm: '400px', lg: '450px', xl: '634px'},
          background: '#131431',
          borderRadius: theme.spacing(4),
          mb:{sm: 15, lg: 11},
          p: 2
        }}>
          <Box sx={{ borderBottom: 1, borderColor: theme.palette.common.white, flexGrow:1 }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="My Rewards" sx={{textTransform: 'none', color: theme.palette.common.white, '&.Mui-selected': { color: theme.palette.rewardsTab}}}/>
              <Tab label="Overview" sx={{textTransform: 'none', color: theme.palette.common.white, '&.Mui-selected': { color: theme.palette.rewardsTab}}}/>
              <Tab label="Settings" sx={{textTransform: 'none', color: theme.palette.common.white, '&.Mui-selected': { color: theme.palette.rewardsTab}}}/>
            </Tabs>

          </Box>
          <TabPanel value={value} index={0} boxSx={{px: 0}}>
            <MyRewards />
          </TabPanel>
          <TabPanel value={value} index={1} boxSx={{px: 0}}>
            <Overview />
          </TabPanel>
          <TabPanel value={value} index={2} boxSx={{px: 0}}>
            <Settings />
          </TabPanel>


          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2}}>
            <Typography mr={2}>Total Rewards: </Typography>
            <Typography>59,000</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Typography mr={2}>Total Claimable: </Typography>
            <Typography>2,500</Typography>
          </Box>
        </Box>
      </Box>
      
    </Box>
    </>
  )
}

export default Rewards