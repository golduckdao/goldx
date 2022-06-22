import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';



import swap from "../assets/images/swap.svg";
import rewards from "../assets/images/rewards.svg";
import services from "../assets/images/services.svg";
import extensions from "../assets/images/extensions.svg";
import docs from "../assets/images/docs.svg";
import { useLocation, useNavigate } from 'react-router-dom';

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
  const { window, mobileOpen, handleDrawerToggle } = props;
  
  const theme = useTheme();

  


  const drawer = (
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
            background: location.pathname === link.link ? theme.palette.primary.main : 'none'
            
            }}
            onClick={() => navigate(link.link)}
            >
              <ListItemIcon align="center" sx={{ pl: index<2 ? 0: 1}}>
                <img src={link.img} alt={link.name+" image"}/>
              </ListItemIcon>
              <ListItemText primary={link.name}/>
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
      aria-label="mailbox folders"
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
