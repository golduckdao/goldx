
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Typography, Box, Paper, Tabs, Tab } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Appbar from "./components/Appbar";
import InnerBox from "./components/InnerBox";
import ResponsiveDrawer from "./components/ResponsiveDrawer";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function App() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  return (
    <div className="App"
    css={css`
    min-height: 100vh;
    width: 100%;
    background-color: #131A36;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    `}>
      <Appbar />
      <ResponsiveDrawer />
      <Box sx={{
        display: {xs: 'none', sm: 'block'},
        ml: {sm: '200px'},
        background: '#0C0926',
      }}>
        <Typography ml={2} mx={2}>
          <b>SWAP tokens at discounted Price</b>
        </Typography>
        <Box sx={{
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Paper sx={{
            background: '#131A36',
            borderRadius: '16px',
            height: {sm: '350px', lg: '470px', xl: '600px'},
            width: {sm: '440px', lg: '550px', xl:'760px'},
            my: {sm: 12, lg: 8},
          }}>
            <Box sx={{
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'flex-end',
              pr:3,
              mt: 1
            }}>
              <Tabs value={value} onChange={(e, v) => setValue(v)}
              sx={{
                background: 'rgba(12, 11, 41, 0.6)',
                borderRadius: '25px'
              }}
              TabIndicatorProps={{ 
                style: {
                    display: "none",
                },
              }}
              >
                <Tab label="Swap" sx={{ textTransform: 'none', '&.Mui-selected': {background: theme.palette.primary.light, color: theme.palette.text.primary}, borderRadius: '25px'}}/>
                <Tab label="Reserved" sx={{ textTransform: 'none', '&.Mui-selected': {background: theme.palette.primary.light, color: theme.palette.text.primary}, borderRadius: '25px'}}/>
                <Tab label="Referrals" sx={{ textTransform: 'none', '&.Mui-selected': {background: theme.palette.primary.light, color: theme.palette.text.primary}, borderRadius: '25px'}}/>
              </Tabs>
            </Box>
            <Box sx={{
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'flex-end',

            }}>
              <TabPanel value={value} index={0}>
                <InnerBox />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <InnerBox />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <InnerBox />
              </TabPanel>
              
            </Box>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ display: {xs: 'block', sm: 'none'}}}>
        <InnerBox />
      </Box>
    </div>
  );
}

export default App;
