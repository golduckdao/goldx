import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { useTheme } from '@mui/material/styles';


import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

import logo from "../assets/images/Logo.svg";
import { ButtonBase } from '@mui/material';
import { useMoralis } from 'react-moralis';

import rewardPoolContractAbi from "../assets/blockchain/reward_pool_abi.json";
import erc20Abi from "../assets/blockchain/erc20_abi.json";
import { ethers } from 'ethers';

export default function Appbar() {
  const theme = useTheme();
  const [balance, setBalance] = React.useState(-1);
  const { authenticate, isAuthenticated, isWeb3Enabled, user, account, logout, Moralis } = useMoralis();
  console.log("Is Auth?", isAuthenticated)

  React.useEffect(() => {
    async function fetchBalance() {
      if(isAuthenticated) {
        console.log("Executing")
        try{
          if(!isWeb3Enabled) await Moralis.enableWeb3();
        } catch(e) {
          console.log("Moralis Error", e)
        }
        
        const provider = new ethers.providers.Web3Provider(Moralis.provider);
        const signer = provider.getSigner(account);

        // console.log("Signer", await signer.getAddress())
        // console.log("Totality", t)
        const rewardPoolContract = new ethers.Contract(
          "0x0F7eB0cE0803Ac8aA1799777797B3db90ecACcAF",
          rewardPoolContractAbi,
          signer
        );

        const nativeAsset = await rewardPoolContract.nativeAsset();
        const nativeAssetContract = new ethers.Contract(
          nativeAsset,
          erc20Abi,
          signer
        );
        const nativeAssetBalance = await nativeAssetContract.balanceOf(account);
        setBalance(nativeAssetBalance.toString());
      }
    }
    fetchBalance();
  }, [isAuthenticated, isWeb3Enabled])

  const login = async () => {
    if (!isAuthenticated) {

      await authenticate({signingMessage: "Welcome to the GoldX Portal"})
        .then(function (user) {
          if(user) console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{background: {xs: theme.palette.primary.dark, sm: `none`}}} elevation={0}>
        <Toolbar sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src={logo} alt="GOLDZ" height={theme.spacing(5)}/>
          </IconButton>
          <Typography variant="h7">
            {
              isAuthenticated ?  <b>Token Balance: {balance}</b> : <b>Please Connect your Wallet</b>
            }
            
          </Typography>
          <Box sx={{ display: {xs: 'none', sm: 'block'}}}>
            <ButtonBase>
              <Typography variant='subtitle' color="text.secondary">
                Switch to Network
              </Typography>
            </ButtonBase>
            <Button variant="contained" sx={{
              ml: 2,
              border: '1px solid #172C47',
              borderRadius: theme.spacing(2),
              px: 3,
              textTransform: 'none'
            }}
            startIcon={<AccountBalanceWalletOutlinedIcon sx={{color: '#39D0D8CC'}}/>}
            onClick={ isAuthenticated ? () => logout() : () => login()}
            >
              {
                isAuthenticated ? `Disconnect 0x...${user.get("ethAddress").slice(user.get("ethAddress").length-5,user.get("ethAddress").length)}` : 'Connect Wallet'
              }
            </Button>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            // onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
