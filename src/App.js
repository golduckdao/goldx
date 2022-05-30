
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Typography, Box, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Appbar from "./components/Appbar";
import InnerBox from "./components/InnerBox";
import ResponsiveDrawer from "./components/ResponsiveDrawer";

function App() {
  const theme = useTheme()
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
            height: {sm: '350px', lg: '450px', xl: '600px'},
            width: {sm: '440px', lg: '550px', xl:'760px'},
            my: {sm: 12, lg: 9},
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <InnerBox />
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
