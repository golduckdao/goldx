import React, { useState } from 'react'
import Box from "@mui/material/Box";

import BuyLargeViewport from '../components/BuyLargeViewport';
import BuySmallViewport from '../components/BuySmallViewport';

const BuyToken = () => {
  return (
    <>
    <Box sx={{
      display: {xs: 'none', sm: 'block'},
      ml: {sm: '200px'},
      background: '#0C0926',
      borderRadius: '30px 0px 0px 0px'
    }}>
      <BuyLargeViewport/>
    </Box>
    <Box sx={{ display: {xs: 'block', sm: 'none'}}}>
      <BuySmallViewport />
    </Box>
    </>
  )
}

export default BuyToken