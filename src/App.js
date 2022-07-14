
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

import Appbar from "./components/Appbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Rewards from "./pages/Rewards";
import BuyToken from "./pages/BuyToken";
import { ethers } from 'ethers';
import useStore from "./store/store";

function App() {
  const {switchBsc, switchPolygon, switchEth, bsc, polygon, eth, toggleChainDialog} = useStore(state => state);
  React.useEffect(() => {
    async function initialize() {
      if(window.ethereum)
      {
        window.ethereum.send('eth_requestAccounts');
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        let chain = await (await provider.getNetwork()).chainId;
        if( chain === polygon.network) switchPolygon()
        else if( chain === bsc.network) switchBsc()
        else if( chain === eth.network) switchEth()
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
        // window.location.reload()
        console.log("chain ID changed to:", chainId)
        // chainId
        // 0x13881 -> polygon testnet
        // 0x61 -> BSC testnet
        // 0x1 -> ETH Mainnet
        // 0x4 -> ETH Rinkeby Testnet
        if( chainId === polygon.network) switchPolygon()
        else if( chainId === bsc.network) switchBsc()
        else if( chainId === eth.network) switchEth()
        else toggleChainDialog();
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
        
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
      
    </div>
  );
}

export default App;
