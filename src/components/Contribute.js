import React, { useState } from 'react'
import { Typography, Box, Paper, Grid, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import InnerBox from "./InnerBox";
import BlueButton from './BlueButton';
import { ethers } from 'ethers';
import buyTokenABI from "../assets/blockchain/buy_token_abi.json";
import { debounce } from 'lodash';
import useStore from '../store/store';

const Contribute = ({setDiscountRate, address}) => {
  const {
    buyTokenContractAddress,
    isAuthenticated,
    current
  } = useStore(state => state);
  const theme = useTheme();

  const [isReferral, setIsReferral] = useState(true);
  const [minDeposit, setMinDeposit] = useState(0);
  const [maxDeposit, setMaxDeposit] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [currentSale, setCurrentSale] = useState(0);
  const [instantValue, setInstantValue] = useState(0);
  const [lockedValue, setLockedValue] = useState(0);
  const [value, setValue] = useState(0);

  const handleInput = debounce(async (e) => {
    let t = parseFloat(e.target.value) || 0, amount, discount;
    if(window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const buyTokenContract = new ethers.Contract(
        buyTokenContractAddress,
        buyTokenABI,
        provider
      );
      if(currentSale) {
        [amount, discount] = (await buyTokenContract.getAmountOutForMarketPrice(ethers.utils.parseEther(t.toString())));
      } else {
        [amount, discount] = (await buyTokenContract.getAmountOutForBasePrice(ethers.utils.parseEther(t.toString())));
      }

      setIsReferral(await buyTokenContract.isReferral());
      setInstantValue(parseFloat(ethers.utils.formatEther(amount.toString())));
      setLockedValue(parseFloat(ethers.utils.formatEther(discount.toString())));
      setValue(t);
    }
  }, 2000);

  const handleBuy = async () => {
    if(isAuthenticated) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const buyTokenContract = new ethers.Contract(
        buyTokenContractAddress,
        buyTokenABI,
        signer
      );
      console.log("Starting")
      if(isReferral && address) {
        console.log("Referred")
        await buyTokenContract.buy(address, {value: value.toString()});
      } else {
        console.log("Unreferred/False", value.toString(), ethers.constants.AddressZero)
        await buyTokenContract.buy(ethers.constants.AddressZero, {value: value.toString()});
      }
      
    }
  }

  React.useEffect(() => {
    async function fetchData(){
      if(isAuthenticated && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const buyTokenContract = new ethers.Contract(
          buyTokenContractAddress,
          buyTokenABI,
          provider
        );
        const mind = ethers.utils.formatEther((await buyTokenContract.minimumDeposit()).toString());
        const maxd = ethers.utils.formatEther((await buyTokenContract.maximumDeposit()).toString());
        const currD = parseFloat((await buyTokenContract.currentDiscount()).toString());
        const currentSale = parseInt((await buyTokenContract.currentSale()).toString());

        // console.log("Data", mind, maxd, currD);
        setMinDeposit(mind);
        setMaxDeposit(maxd);
        setDiscount(currD);
        setCurrentSale(currentSale);
        setDiscountRate(currD);
      }
    };
    fetchData()
  }, [isAuthenticated, buyTokenContractAddress])
  return (
    <InnerBox paperSx={{p: {xs: 2, lg: 3}}}>
      <Paper sx={{ width: "100%", borderRadius: theme.spacing(2), p: 2}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="subtitle2">Enter {
            current=== 'bsc' ? 'BNB' : current === 'polygon' ? 'MATIC' : current === 'metis' ? 'METIS' : 'ETH'
          } Amount</Typography>
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
            <TextField fullWidth variant='outlined' disabled value={instantValue + lockedValue}/>
          </Grid>
        </Grid>
      </Paper>
      <Typography align="left" variant="subtitle2" mt={4}>
        Min Deposit: {minDeposit}
      </Typography>
      <Typography align="left" variant="subtitle2">
        Max Deposit: {maxDeposit}
      </Typography>
      <Typography align="left" variant="subtitle2">
        Discount: {discount === 0 ? 'N/A' : `${discount} %`}
      </Typography>
      <Typography align="left" variant="subtitle2" noWrap>
        Tokens to Receive Instantly: {instantValue}
      </Typography>
      <Typography align="left" variant="subtitle2" noWrap>
        Bonus tokens: {lockedValue}
      </Typography>
      <Box sx={{ mt: 1}}>
        <Typography variant='caption' align="left" >
          *Any Bonus Tokens can be found under Reserved Tab
        </Typography>
      </Box>
      <BlueButton fullWidth sx={{mt: 2}} onClick={handleBuy}>Buy Now</BlueButton>

    </InnerBox>
  )
}

export default Contribute