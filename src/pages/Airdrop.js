import React from "react";
import { Box,Paper, Typography, Grid, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { debounce } from 'lodash';
import useStore from '../store/store';
import airdropAbi from "../assets/blockchain/airdrop_abi.json";
import InnerBox from "../components/InnerBox";
import{ BigNumber, ethers } from "ethers";
import BlueButton from "../components/BlueButton";
const Airdrop = () => {
  const {airdropContractAddress, current} = useStore(state => state);
  const theme = useTheme();
  const [valueToReceive, setValueToReceive] = React.useState(0);
  const handleInput = debounce(async (e) => {
    if(airdropContractAddress) {
      let t = parseFloat(e.target.value) || 0;
      if(window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const airdropContract = new ethers.Contract(
          airdropContractAddress,
          airdropAbi,
          provider
        );
        const value = await airdropContract.getAmountOut(BigNumber.from(t).mul(1e9));
        setValueToReceive(value.toString());
    }
    }
  }, 2000);


  return (
    <Box
      sx={{
        p: 4,
        ml: { sm: "200px" },
        background: { xs: "none", sm: "#0C0926" },
        borderRadius: "30px 0px 0px 0px",
        height: { sm: "100vh" },
        position: "relative",
      }}
    >
      <Typography
        sx={{ display: { xs: "none", sm: "block" } }}
        mb={2}
        align="center"
        variant="h3"
      >
        Airdrop
      </Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
        mt: 10
      }}>
        <Box sx={{
           background: '#131A36',
           borderRadius: '16px',
           height: {sm: '480px', lg: '470px', xl: '600px'},
           width: {sm: '440px', lg: '550px', xl:'860px'},
           my: {sm: 10, lg: 6},
           zIndex: 1,
           position: "absolute",
           display:{sm: 'none', md: 'block'}
        }}/>
      <InnerBox boxSx={{ zIndex: 1000}} paperSx={{p: 1, pt: 3}}>
      <Paper sx={{ width: "100%", borderRadius: theme.spacing(2), p: 2}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="subtitle2">Enter Golden Duck</Typography>
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
            <TextField fullWidth variant='outlined' disabled value={valueToReceive}/>
          </Grid>
        </Grid>
      </Paper>
      <Typography ml={1} mt={3} align="left" variant="subtitle2" noWrap>
        Golden Duck tokens to Deposit: 5000
      </Typography>
      <Typography ml={1} mt={1} align="left" variant="subtitle2" noWrap>
        GoldenDAO tokens to receive: 0
      </Typography>
      <BlueButton fullWidth sx={{mt:4}}>Approve</BlueButton>
      <BlueButton fullWidth sx={{mt:2}}>Claim Golden Duck Dao</BlueButton>
      </InnerBox>

      </Box>
    </Box>
  );
};

export default Airdrop;
