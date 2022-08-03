import React from 'react'
import Box from "@mui/material/Box";
import { Typography } from '@mui/material';

const Extensions = () => {
  return (
    <>
    <Box sx={{
      display: {xs: 'none', sm: 'block'},
      ml: {sm: '200px'},
      background: '#0C0926',
      borderRadius: '30px 0px 0px 0px',
      p:4
    }}>
      <Typography><b>Extensions</b></Typography>

      <Typography variant="h2" align="center" my={28}>Coming Soon!</Typography>
    </Box>
    <Box sx={{ display: {xs: 'block', sm: 'none'}}}>
      <Typography variant="h1" align="center">Coming Soon!</Typography>
    </Box>
    </>
  )
}

export default Extensions