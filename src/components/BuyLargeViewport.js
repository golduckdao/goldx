import React, { useState } from 'react'
import { Typography, Box, Paper, Tabs, Tab } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";

import InnerBox from "./InnerBox";
import TabPanel from './TabPanel';
import Referral from './Referral';
import ReserveTable from './ReserveTable';
import Contribute from './Contribute';

const BuyLargeViewport = () => {
  const theme = useTheme();
  const {user} = useParams();
  const [value, setValue] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);
  return (
    <>
    <Typography py={2} align="center">
      {
        value === 0 && <b>SWAP tokens at {discountRate}% Discounted Price</b>
      }
      {
        value === 1 && <b>Reserved Tokens</b>
      }
      {
        value === 2 && <b>Your Referrals</b>
      }
      
    </Typography>
    <Box sx={{
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Paper sx={{
        background: '#131A36',
        borderRadius: '16px',
        height: {sm: '480px', lg: '470px', xl: '600px'},
        width: {sm: '440px', lg: '550px', xl:'760px'},
        my: {sm: 10, lg: 6},
      }}>
        <Box sx={{
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          pr:3,
          mt: 1
        }}>
          <Tabs value={value} onChange={(e, v) => setValue(v)}
          sx={{
            background: 'rgba(12, 11, 41, 0.6)',
            borderRadius: '25px'
          }}
          TabIndicatorProps={{ 
            style: {
                display: "none",
            },
          }}
          >
            <Tab label="Contribute" sx={{ textTransform: 'none', '&.Mui-selected': {background: theme.palette.primary.light, color: theme.palette.text.primary}, borderRadius: '25px'}}/>
            <Tab label="Reserved" sx={{ textTransform: 'none', '&.Mui-selected': {background: theme.palette.primary.light, color: theme.palette.text.primary}, borderRadius: '25px'}}/>
            <Tab label="Referrals" sx={{ textTransform: 'none', '&.Mui-selected': {background: theme.palette.primary.light, color: theme.palette.text.primary}, borderRadius: '25px'}}/>
          </Tabs>
        </Box>
        <Box sx={{
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',

        }}>
          <TabPanel value={value} index={0}>
            <Contribute setDiscountRate={(rate) => setDiscountRate(rate)} address={user}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <InnerBox paperSx={{width: {xs: 440, sm: 400, lg: 500, xl: 600 }, p:2}}>
              <ReserveTable />
            </InnerBox>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Referral />
          </TabPanel>
          
        </Box>
      </Paper>
    </Box>
    </>
  )
}

export default BuyLargeViewport