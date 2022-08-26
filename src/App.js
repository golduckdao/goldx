
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

import Appbar from "./components/Appbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Rewards from "./pages/Rewards";
import BuyToken from "./pages/BuyToken";
import { ethers } from 'ethers';
import useStore from "./store/store";
import Tools from "./pages/Tools";
import Services from "./pages/Services";
import { Typography } from "@mui/material";

function App() {
  const {switchBsc, switchPolygon, switchEth, switchMetis, bsc, polygon, eth, metis, toggleChainDialog} = useStore(state => state);
  React.useEffect(() => {
    async function initialize() {
      if(window.ethereum)
      {
        window.ethereum.send('eth_requestAccounts');
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        let chain = `0x${await (await provider.getNetwork()).chainId.toString(16)}`;
        console.log("Chain ID", chain)
        if( chain === polygon.network) switchPolygon()
        else if( chain === bsc.network) switchBsc()
        else if( chain === eth.network) switchEth()
        else if( chain === metis.network) switchMetis()
        else toggleChainDialog();
      }
    }
    initialize();
  }, []);

  React.useEffect(() => {
    if(window.ethereum)
    {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.provider.on('chainChanged', (chainId) => {
        window.location.reload()
        // console.log("chain ID changed to:", chainId)
        // chainId
        // 0x13881 -> polygon testnet
        // 0x61 -> BSC testnet
        // 0x1 -> ETH Mainnet
        // // 0x4 -> ETH Rinkeby Testnet
        // if( chainId === polygon.network) switchPolygon()
        // else if( chainId === bsc.network) switchBsc()
        // else if( chainId === eth.network) switchEth()
        // else if( chainId === metis.network) switchMetis()
        // else toggleChainDialog();
      });
      provider.provider.on('accountsChanged', () => window.reload());
      return () => {
        provider.provider.removeAllListeners('chainChanged');
        provider.provider.removeAllListeners('accountsChanged');
      }

    }
    
  }, []);
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
      <Appbar/>
      {/* <ResponsiveDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/> */}
      <Routes>
        <Route path="/" element={<Navigate to="/buy" replace />}/>
        <Route path="/buy" >
          <Route index element={<BuyToken />} />
          <Route path=":user" element={<BuyToken />} />
        </Route>
        <Route path="/tools" element={<Tools />}/>
        <Route path="/services" element={<Services />} />
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
      <Typography fontSize={12} color="text.secondary" sx={{ml: {sm: '200px'}, p: 1}}>
      Disclaimer: GolduckDAO is not a registered broker, analyst or investment. By purchasing GolduckDAO, you agree that you are not purchasing a security or investment and you agree to hold the team harmless and not liable for any losses or taxes you may incur. Although GolduckDAO is an EXPERIMENTAL digital token for social experiment and not a digital currency, always make sure that you are in compliance with your local laws and regulations before you make any purchase.
      </Typography>
    </div>
  );
}

export default App;
