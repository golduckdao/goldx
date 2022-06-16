import React, { useState } from 'react'
import { Typography, Box, Paper, Tabs, Tab, Grid, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import InnerBox from "../components/InnerBox";
import BlueButton from '../components/BlueButton';

const Swap = () => {
  const theme = useTheme();
  return (
    <InnerBox paperSx={{p: {xs: 2, lg: 3}}}>
      <Paper sx={{ width: "100%", borderRadius: theme.spacing(2), p: 2}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="subtitle2">Enter BNB Amount</Typography>
          <Typography variant="subtitle2">To Receive</Typography>
        </Box>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={5} align="center">
          <TextField fullWidth variant='outlined' />
          </Grid>
          <Grid item xs={2} align="center">
            <ArrowRightAltIcon/>
          </Grid>
          <Grid item xs={5} align="center">
            <TextField fullWidth variant='outlined' />
          </Grid>
        </Grid>
      </Paper>
      <Typography align="left" mt={2} variant="subtitle2">
        Market Price: $0.008 
      </Typography>
      <Typography align="left" variant="subtitle2">
        Discount: 10%
      </Typography>
      <Typography align="left" variant="subtitle2">
        Min Tokens to Buy: 5000
      </Typography>
      <Typography align="left" variant="subtitle2">
        Max Tokens to buy: 20000
      </Typography>
      <Typography align="left" variant="subtitle2">
        *Unlock Date: 10th Jan, 2022
      </Typography>
      <Box sx={{ mt: 1}}>
        <Typography variant='caption' align="left" >
          *Your Discounted Tokens can be found under Reserved
        </Typography>
      </Box>
      <BlueButton fullWidth sx={{mt: 2}}>Buy Now</BlueButton>

    </InnerBox>
  )
}

export default Swap