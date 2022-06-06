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

export default function Appbar() {
  const theme = useTheme();
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

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
            <b>Token Balance: 10,94,000</b>
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
                isAuthenticated ? `Disconnect ${user.get("ethAddress").slice(0,5)}...` : 'Connect Wallet'
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
