import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import ActionCard from '../components/ActionCard';

import logo from "../assets/images/logo.jpg";

const TOOLS = [
  {
    name: "Redeem Tokens",
    desc: "Burn Tokens for Treasury Assets",
    img: logo
  },
  {
    name: "Referral Management",
    desc: "Manage Referral Related Options",
    img: logo
  },
  {
    name: "Airdrop",
    desc: "Participate in Airdrops to win new tokens",
    img: logo
  },
  {
    name: "Vote",
    desc: "Vote for Proposals on Snapshots",
    link: "https://snapshot.org/#/golduckdao.eth",
    img: logo
  }
]

const Tools = () => {
  return (
    <Box sx={{
      p: 4,
      ml: {sm: '200px'},
      background: {xs: 'none', sm: '#0C0926'},
      borderRadius: '30px 0px 0px 0px',
      height: {sm: '100vh'},
      position: 'relative'
    }}>
      <Typography sx={{ display: {xs: 'none', sm: 'block'}}} mb={2}><b>Tools</b></Typography>
      <Grid container spacing={5} justifyContent="left" alignItems="center">
        {
          TOOLS.map((item, idx) =>
          <Grid item xs={12} sm={6} md={3} key={"tools"+idx} align="center">
            <ActionCard img={item.img} alt={item.name}     
            link={item.link}
            >
              <Typography variant="h6">
                {item.name}
              </Typography>
              <Typography mt={1} color="text.secondary" variant="caption">
                {item.desc}
              </Typography>
            </ActionCard>
          </Grid>
          )
        }
      </Grid>

    </Box>
  )
}

export default Tools