import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import { useTheme } from '@mui/material/styles';

import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

import swap from "../assets/images/swap.svg";
import rewards from "../assets/images/rewards.svg";
import services from "../assets/images/services.svg";
import extensions from "../assets/images/extensions.svg";
import docs from "../assets/images/docs.svg";
import { useLocation, useNavigate } from 'react-router-dom';
import { useMoralis } from 'react-moralis';
import { textAlign } from '@mui/system';
import { useMediaQuery } from '@mui/material';

const LINKS= [
  {
    name: 'Buy Tokens',
    img: swap,
    link: '/buy'
  },
  {
    name: 'Rewards',
    img: rewards,
    link: '/rewards'
  },
  {
    name: 'Services',
    img: services,
    link: '/services'
  },
  {
    name: 'Extensions',
    img: extensions,
    link: 'extensions'
  },
  {
    name: 'Docs',
    img: docs,
    link: '/docs'
  }
];

const drawerWidth = 200;

export default function ResponsiveDrawer(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { window, mobileOpen, handleDrawerToggle, login, toggleChainSwitch } = props;
  
  const theme = useTheme();

  const {isAuthenticated, logout, user} = useMoralis();
  const view = useMediaQuery(theme.breakpoints.down('sm'));

  const drawer =  (
    <div>
      {/* <Divider /> */}
      <List>
        {LINKS.map((link, index) => (
          <ListItem key={link.name+"drawer"} disablePadding>
            <ListItemButton sx={{
            borderRadius: theme.spacing(2),
            mx: 1,
            ":hover":{
              background: `${theme.palette.primary.light}20`
            },
            background: location.pathname === link.link ? `${theme.palette.primary.dark}50` : 'none',
            display: 'flex',
            justifyContent: view ? 'center' : 'flex-start',
            alignItems: 'center'
            }}
            onClick={() => {navigate(link.link); handleDrawerToggle();}}
            >
              <ListItemIcon align="center" sx={{ pl: index<2 ? 0: 1}}>
                <img src={link.img} alt={link.name+" image"}/>
              </ListItemIcon>
              <Typography>{link.name}</Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ mt: {xs: 3},background: 'none' , flexShrink: { sm: 0 } }}
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        anchor="top"
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: "100%",
            borderRadius: '0px 0px 60px 60px',
            py: 3,
            background: '#141042'
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1}}>
          <Button variant="contained" 
            sx={{
              border: '1px solid #172C47',
              borderRadius: theme.spacing(2),
              py:2,
              px: 2,
              textTransform: 'none',
            }}
            startIcon={<AccountBalanceWalletOutlinedIcon sx={{color: '#39D0D8CC'}}/>}
            onClick={ isAuthenticated ? () => logout() : () => login()}
          >
            {
              isAuthenticated ? `Disconnect 0x...${user.get("ethAddress").slice(user.get("ethAddress").length-5,user.get("ethAddress").length)}` : 'Connect Wallet'
            }
          </Button>
        </Box>
        <ButtonBase onClick={toggleChainSwitch}>
          <Typography variant='subtitle' color="text.secondary">
            Switch to Network
          </Typography>
        </ButtonBase>
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          border: 'none',
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            border: 'none',
            mt: 15,
            background: 'none',
            boxSizing: 'border-box',
            width: drawerWidth
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
