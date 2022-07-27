import React, { useState } from 'react'
import { Typography, Box, Tabs, Tab, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BlueButton from '../components/BlueButton';
import TabPanel from '../components/TabPanel';
import MyRewards from '../components/MyRewards';
import Overview from '../components/Overview';
import Settings from '../components/Settings';
import { useMoralis } from 'react-moralis';
import { ethers } from 'ethers';

import useStore from '../store/store';

import rewardPoolContractAbi from "../assets/blockchain/reward_pool_abi.json";

import MobileTable from '../components/MobileTable';
import MyRewardsMobile from '../components/MyRewardsMobile';
import OverviewMobile from '../components/OverviewMobile';
import SettingsMobile from '../components/SettingsMobile';

const Rewards = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const {
    rewardPoolContractAddress,
    isAuthenticated
  } = useStore(state=>state);

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClaimAll = async () => {
    if(isAuthenticated) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);

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
        </Box>
      </Box>
      
    </Box>
    <Box sx={{
      display: {xs: 'block', sm: 'none'},
      background: 'none',
    }}>
      <Tabs value={value} onChange={handleChange} centered TabIndicatorProps={{style: { display: 'none'}}}>
        <Tab label="My Rewards" sx={{textTransform: 'none', fontWeight: 700, fontSize: theme.spacing(2), color: theme.palette.common.white, '&.Mui-selected': { color: theme.palette.rewardsTab}}}/>
        <Tab label="Overview" sx={{textTransform: 'none', fontWeight: 700, fontSize: theme.spacing(2), color: theme.palette.common.white, '&.Mui-selected': { color: theme.palette.rewardsTab}}}/>
        <Tab label="Settings" sx={{textTransform: 'none', fontWeight: 700, fontSize: theme.spacing(2), color: theme.palette.common.white, '&.Mui-selected': { color: theme.palette.rewardsTab}}}/>
      </Tabs>
      <Divider />
      <TabPanel value={value} index={0} boxSx={{px: 0}}>
        <MyRewardsMobile />
      </TabPanel>
      
      <TabPanel value={value} index={1} boxSx={{px: 0}}>
        <OverviewMobile />
      </TabPanel>
      
      <TabPanel value={value} index={2} boxSx={{px: 0}}>
        <SettingsMobile />
      </TabPanel>
    </Box>
    </>
  )
}

export default Rewards