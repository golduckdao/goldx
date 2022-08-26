import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import ActionCard from '../components/ActionCard';
import logo from "../assets/images/logo-removebg.png";

const TOOLS = [
  {
    name: "dexCount",
    link: 'https://dexcount.com/',
    desc: 'Decentralized Discount Services on Launched Tokens',
    img: logo
  },
  {
    name: "Premium Domain NFT",
    link: 'https://opensea.io/Goldomains',
    desc: "Reselling .eth Premium Domains",
    img: logo
  },
  {
    name: "Mint your Own NFT",
    desc: "Under Development",
    desc: "Minting NFT Services (Coming Soon)",
    img: logo
  },
]

const Services = () => {
  return (
    <Box sx={{
      px: 4,
      pt: 4,
      ml: {sm: '200px'},
      background: {xs: 'none', sm: '#0C0926'},
      borderRadius: '30px 0px 0px 0px',
      height: {sm: '100vh'},
    }}>
      <Typography sx={{ display: {xs: 'none', sm: 'block'}}} mb={2}><b>Services</b></Typography>
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
              {
                item.desc  &&
                <Typography mt={1} color="text.secondary" variant='caption'>
                  {item.desc}
                </Typography>
              }
            </ActionCard>
          </Grid>
          )
        }
      </Grid>
    </Box>
  )
}

export default Services