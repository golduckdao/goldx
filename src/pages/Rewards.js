import React, { useState } from 'react'
import { Typography, Box, Paper, Tabs, Tab, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BlueButton from '../components/BlueButton';
import TabPanel from '../components/TabPanel';
import CustomTable from '../components/CustomTable';

const Rewards = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <BlueButton>Claim All Rewards</BlueButton>
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
            <CustomTable />
          </TabPanel>
          <TabPanel value={value} index={1} boxSx={{px: 0}}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2}}>
              <BlueButton>Update Balance</BlueButton>
            </Box>
            <CustomTable />
          </TabPanel>
          <TabPanel value={value} index={2} boxSx={{px: 0}}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2}}>
              <BlueButton>Buy Rewards</BlueButton>
            </Box>
            <CustomTable />
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