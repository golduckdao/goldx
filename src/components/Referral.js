import React, { useState } from 'react'
import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import InnerBox from "../components/InnerBox";
import BlueButton from '../components/BlueButton';

const Referral = () => {
  const theme = useTheme();
  return (
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
  )
}

export default Referral