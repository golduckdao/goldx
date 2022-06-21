import React, { useState } from 'react'
import { Typography, Box, Paper, Tabs, Tab, Grid, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import InnerBox from "./InnerBox";
import BlueButton from './BlueButton';
import { useMoralis } from 'react-moralis';
import { ethers } from 'ethers';
import buyTokenABI from "../assets/blockchain/buy_token_abi.json";
import { debounce } from 'lodash';

const Contribute = ({setDiscountRate}) => {
  const theme = useTheme();
  const { isAuthenticated, isWeb3Enabled, user, Moralis} = useMoralis();
  const [minDeposit, setMinDeposit] = useState(0);
  const [maxDeposit, setMaxDeposit] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [currentSale, setCurrentSale] = useState(0);
  const [instantValue, setInstantValue] = useState(0);
  const [lockedValue, setLockedValue] = useState(0);
  const [value, setValue] = useState(0);

  const handleInput = debounce(async (e) => {
    let t = parseFloat(e.target.value) || 0, amount, discount;
    if(!isWeb3Enabled) await Moralis.enableWeb3();
    const provider = new ethers.providers.Web3Provider(Moralis.provider);
    const buyTokenContract = new ethers.Contract(
      "0x936c31F6316262632A677815aCe93FDf2f8143b3",
      buyTokenABI,
      provider
    );
    if(currentSale) {
      [amount, discount] = (await buyTokenContract.getAmountOutForBasePrice(ethers.utils.parseEther(t.toString())));
    } else {
      [amount, discount] = (await buyTokenContract.getAmountOutForMarketPrice(ethers.utils.parseEther(t.toString())));
    }
    let sum = parseFloat(ethers.utils.formatEther(amount.toString())) + parseFloat(ethers.utils.formatEther(discount.toString()));
    setInstantValue(parseFloat(ethers.utils.formatEther(amount.toString())));
    setLockedValue(parseFloat(ethers.utils.formatEther(discount.toString())));
    setValue(sum);
  }, 2000);

  React.useEffect(() => {
    async function fetchData(){
      if(isAuthenticated) {
        if(!isWeb3Enabled) await Moralis.enableWeb3();
        const provider = new ethers.providers.Web3Provider(Moralis.provider);
        const buyTokenContract = new ethers.Contract(
          "0x936c31F6316262632A677815aCe93FDf2f8143b3",
          buyTokenABI,
          provider
        );
        const mind = ethers.utils.formatEther((await buyTokenContract.minimumDeposit()).toString());
        const maxd = ethers.utils.formatEther((await buyTokenContract.maximumDeposit()).toString());
        const currD = parseFloat((await buyTokenContract.currentDiscount()).toString());
        const currentSale = parseInt((await buyTokenContract.currentSale()).toString());

        console.log("Data", mind, maxd, currD);
        setMinDeposit(mind);
        setMaxDeposit(maxd);
        setDiscount(currD);
        setCurrentSale(currentSale);
        // setCurrentSale(1);
        setDiscountRate(currD)
      }
    };
    fetchData()
  }, [isAuthenticated, isWeb3Enabled])
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
          <TextField fullWidth variant='outlined' onChange={handleInput} placeholder={"0.000"}/>
          </Grid>
          <Grid item xs={2} align="center">
            <ArrowRightAltIcon/>
          </Grid>
          <Grid item xs={5} align="center">
            <TextField fullWidth variant='outlined' disabled value={value}/>
          </Grid>
        </Grid>
      </Paper>
      <Typography align="left" variant="subtitle2" mt={4}>
        Min Tokens to Buy: {minDeposit}
      </Typography>
      <Typography align="left" variant="subtitle2">
        Max Tokens to buy: {maxDeposit}
      </Typography>
      <Typography align="left" variant="subtitle2">
        Discount: {discount === 0 ? 'N/A' : `${discount} %`}
      </Typography>
      <Typography align="left" variant="subtitle2">
        Tokens to Receive Instantly: {instantValue}
      </Typography>
      <Typography align="left" variant="subtitle2">
        Your locked tokens: {lockedValue}
      </Typography>
      <Box sx={{ mt: 1}}>
        <Typography variant='caption' align="left" >
          *Any Locked Tokens can be found under Reserved Tab
        </Typography>
      </Box>
      <BlueButton fullWidth sx={{mt: 2}}>Buy Now</BlueButton>

    </InnerBox>
  )
}

export default Contribute