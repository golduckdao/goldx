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

import rewardPoolContractAbi from "../assets/blockchain/reward_pool_abi.json";
import erc20Abi from "../assets/blockchain/erc20_abi.json";
import { ethers } from 'ethers';
import SwitchChainDialog from './SwitchChainDialog';
import ResponsiveDrawer from './ResponsiveDrawer';
import useStore from '../store/store';



export default function Appbar() {
  const {
    rewardPoolContractAddress,
    openSwitchChainDialog,
    toggleChainDialog,
    isAuthenticated, 
    logout,
    login
  } = useStore(state=>state);
  const theme = useTheme();
  const [balance, setBalance] = React.useState(0);
  const [switchChainDialog, setSwitchChainDialog] = React.useState(false);
  const [account, setAccount] = React.useState('');
  
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const {chainId} = useChain();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  React.useEffect(() => {
    async function fetchBalance() {
      // console.log("Chain ID from App Bar", chainId);
      if(isAuthenticated && window.ethereum) {
        // try{
        //   if(!isWeb3Enabled) await Moralis.enableWeb3();
        // } catch(e) {
        //   console.log("Moralis Error", e)
        // }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(0);

        // console.log("Signer", await signer.getAddress())
        // console.log("Totality", t)
        const rewardPoolContract = new ethers.Contract(
          rewardPoolContractAddress,
          rewardPoolContractAbi,
          signer
        );

        const nativeAsset = await rewardPoolContract.nativeAsset();
        const nativeAssetContract = new ethers.Contract(
          nativeAsset,
          erc20Abi,
          signer
        );
        const nativeAssetBalance = await nativeAssetContract.balanceOf(await signer.getAddress);
        setBalance(ethers.utils.formatEther(nativeAssetBalance.toString()));
      }
    }
    fetchBalance();
  }, [isAuthenticated])

  const loginHandle = async () => {
    if (!isAuthenticated && window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      await signer.signMessage("Welcome to the GoldX Portal");
      login();
      setAccount(await signer.getAddress());
    }
  }

  return (
    <>
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
            <ButtonBase onClick={() => toggleChainDialog()}>
              <Typography variant='subtitle' color="text.secondary">
                Switch to Network
              </Typography>
              {}
            </ButtonBase>
            <Button variant="contained" sx={{
              ml: 2,
              border: '1px solid #172C47',
              borderRadius: theme.spacing(2),
              px: 3,
              textTransform: 'none'
            }}
            startIcon={<AccountBalanceWalletOutlinedIcon sx={{color: '#39D0D8CC'}}/>}
            onClick={ isAuthenticated ? () => logout() : () => loginHandle()}
            >
              {
                isAuthenticated ? `Disconnect 0x...${account.slice(account.length-5,account.length)}` : 'Connect Wallet'
              }
            </Button>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SwitchChainDialog open={openSwitchChainDialog} onClose={toggleChainDialog}/>
    </Box>
    <ResponsiveDrawer
      mobileOpen={mobileOpen}
      handleDrawerToggle={handleDrawerToggle}
      login={loginHandle}
      toggleChainSwitch={toggleChainDialog}
    />
    </>
  );
}
