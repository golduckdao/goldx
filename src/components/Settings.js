import React from 'react'

import Box from "@mui/material/Box";

import CustomTable from './CustomTable'
import BlueButton from '../components/BlueButton';

const HEADERS = [
  'Name',
  'Min Balance Required',
  'Share %',
  'Claim Wait',
  'Buyback Wait',
  'Active'
]

const Settings = () => {
  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2}}>
      <BlueButton>Buy Rewards</BlueButton>
    </Box>
    <CustomTable headers={HEADERS}/>
    </>
  )
}

export default Settings