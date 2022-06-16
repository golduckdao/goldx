import React, { useState } from 'react'
import { Typography, Box, Paper, Tabs, Tab, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import InnerBox from "../components/InnerBox";
import TabPanel from '../components/TabPanel';
import Swap from '../components/Swap';
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
        {
          value === 0 && <b>SWAP tokens at discounted Price</b>
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
          height: {sm: '450px', lg: '470px', xl: '600px'},
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
              <Swap />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <InnerBox paperSx={{width: {xs: 440, sm: 400, lg: 460, xl: 600 }, p:2}}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Typography>
                    <b>Lock Records</b>
                  </Typography>
                  <Button sx={{ color: '#33AEC1'}}>
                    Claim All Unlocked
                  </Button>
                </Box>

              </InnerBox>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <InnerBox paperSx={{p:2, pt: 4}}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Typography>
                    <b>Total Invited</b>                    
                  </Typography>
                  <Typography>9 Users</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 5}}>
                  <Typography>
                    <b>Total Earned</b>                    
                  </Typography>
                  <Typography>5000</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Typography>
                    <b>Amount Earned</b>                    
                  </Typography>
                  <Typography>2.5 BNB</Typography>
                </Box>

                <Typography align='left' mt={5}>
                  <b>Your Referral Link:</b>
                </Typography>
                <Typography align="left" mb={2}>
                  https://www.xyz/eovnpeonzvklknvlkd
                </Typography>

                <BlueButton fullWidth>
                  Copy to Clipboard
                </BlueButton>

              </InnerBox>
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