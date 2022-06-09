import React from 'react'

import Box from "@mui/material/Box";

import CustomTable from './CustomTable'
import BlueButton from '../components/BlueButton';

const HEADERS = [
  'Name',
  'No. of Holders',
  'Total Distributed',
  'Total Claimable',
  'Last Claim',
  'Next Claim'
]

const Overview = () => {
  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2}}>
      <BlueButton>Update Balance</BlueButton>
    </Box>
    <CustomTable headers={HEADERS}/>
    </>
  )
}

export default Overview