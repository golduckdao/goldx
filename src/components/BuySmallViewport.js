import React, {useState} from 'react';
import { Box, Tabs, Tab } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";

import InnerBox from "../components/InnerBox";
import TabPanel from '../components/TabPanel';
import Referral from '../components/Referral';
import ReserveTable from '../components/ReserveTable';
import Contribute from '../components/Contribute';

const BuySmallViewport = () => {
  const theme = useTheme();
  const {user} = useParams();
  const [value, setValue] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);
  return (
    <>
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
        borderRadius: '25px',
        mt: 4
      }}
      TabIndicatorProps={{ 
        style: {
            display: "none",
        },
      }}
      >
        <Tab label="Contribute" sx={{ textTransform: 'none', '&.Mui-selected': {background: theme.palette.primary.light, color: theme.palette.text.primary}, borderRadius: '25px'}}/>
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
        <Contribute setDiscountRate={(rate) => setDiscountRate(rate)} address={user}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <InnerBox>
          <ReserveTable />
        </InnerBox>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Referral />
      </TabPanel>
      
    </Box>
    </>
  )
}

export default BuySmallViewport