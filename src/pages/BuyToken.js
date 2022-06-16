import React, { useState } from 'react'
import { Typography, Box, Paper, Tabs, Tab } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import InnerBox from "../components/InnerBox";
import TabPanel from '../components/TabPanel';
import BlueButton from '../components/BlueButton';

const BuyToken = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  return (
    <>
    <Box sx={{
      display: {xs: 'none', sm: 'block'},
      ml: {sm: '200px'},
      background: '#0C0926',
      borderRadius: '30px 0px 0px 0px'
    }}>
      <Typography py={2} align="center">
        <b>SWAP tokens at discounted Price</b>
      </Typography>
      <Box sx={{
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Paper sx={{
          background: '#131A36',
          borderRadius: '16px',
          height: {sm: '350px', lg: '470px', xl: '600px'},
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
              <Tab label="Swap" sx={{ textTransform: 'none', '&.Mui-selected': {background: theme.palette.primary.light, color: theme.palette.text.primary}, borderRadius: '25px'}}/>
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
              <InnerBox paperSx={{p: {xs: 2, lg: 3}}}>
                <Paper sx={{ width: "100%", borderRadius: theme.spacing(2)}}>
                  <Typography>Enter BNB Amount</Typography>
                  
                  <Typography>To Receive</Typography>
                </Paper>
                <Typography align="left" my={1}>
                  Market Price: $0.008 
                </Typography>
                <Typography align="left" my={1}>
                  Discount: 10%
                </Typography>
                <Typography align="left" my={1}>
                  Min Tokens to Buy: 5000
                </Typography>
                <Typography align="left" my={1}>
                  Max Tokens to buy: 20000
                </Typography>
                <Typography align="left" my={1}>
                  *Unlock Date: 10th Jan, 2022
                </Typography>
                <Box sx={{ mt: 3}}>
                  <Typography variant='caption' align="left" >
                    *Your Discounted Tokens can be found under Reserved
                  </Typography>
                </Box>
                <BlueButton fullWidth sx={{mt: 2}}>Buy Now</BlueButton>

              </InnerBox>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <InnerBox>Reserved</InnerBox>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <InnerBox>Referrals</InnerBox>
            </TabPanel>
            
          </Box>
        </Paper>
      </Box>
    </Box>
    <Box sx={{ display: {xs: 'block', sm: 'none'}}}>
      <InnerBox />
    </Box>
    </>
  )
}

export default BuyToken