/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import Appbar from "./components/Appbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Rewards from "./pages/Rewards";
import BuyToken from "./pages/BuyToken";
import useStore from "./store/store";
import Tools from "./pages/Tools";
import Services from "./pages/Services";
import { Typography } from "@mui/material";
import Airdrop from "./pages/Airdrop";
import { providerOptions } from "./utils";

function App() {
  const {
    switchBsc,
    switchPolygon,
    switchEth,
    switchMetis,
    bsc,
    polygon,
    eth,
    metis,
    toggleChainDialog,
    isAuthenticated,
    provider,
  } = useStore();
  React.useEffect(() => {
    async function initialize() {
      if (isAuthenticated) {
        console.log("Provider", provider)
        let chain = `0x${await (
          await provider.getNetwork()
        ).chainId.toString(16)}`;
        console.log("Chain ID", chain);
        if (chain === polygon.network) switchPolygon();
        else if (chain === bsc.network) switchBsc();
        else if (chain === eth.network) switchEth();
        else if (chain === metis.network) switchMetis();
        else toggleChainDialog();
      }
    }
    initialize();
  }, [isAuthenticated]);

  React.useEffect(() => {
    async function initialize() {
      if (isAuthenticated) {
        try {
          provider.provider.on("chainChanged", (chainId) => {
            window.location.reload();
          });
          provider.provider.on("accountsChanged", () =>
            window.location.reload()
          );
          return () => {
            provider.provider.removeAllListeners("chainChanged");
            provider.provider.removeAllListeners("accountsChanged");
          };
        } catch (error) {
          console.log("Error occured while initializing", error);
        }
      }
    }
    initialize();
  }, [isAuthenticated]);
  return (
    <div
      className="App"
      css={css`
        min-height: 100vh;
        width: 100%;
        background-color: #131a36;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      `}
    >
      <Appbar />
      {/* <ResponsiveDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/> */}
      <Routes>
        <Route path="/" element={<Navigate to="/buy" replace />} />
        <Route path="/buy">
          <Route index element={<BuyToken />} />
          <Route path=":user" element={<BuyToken />} />
        </Route>
        <Route path="/tools" element={<Tools />} />
        <Route path="/services" element={<Services />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/airdrop" element={<Airdrop />} />
      </Routes>
      <Typography
        fontSize={12}
        color="text.secondary"
        sx={{ ml: { sm: "200px" }, p: 1 }}
      >
        Disclaimer: GolduckDAO is not a registered broker, analyst or
        investment. By purchasing GolduckDAO, you agree that you are not
        purchasing a security or investment and you agree to hold the team
        harmless and not liable for any losses or taxes you may incur. Although
        GolduckDAO is an EXPERIMENTAL digital token for social experiment and
        not a digital currency, always make sure that you are in compliance with
        your local laws and regulations before you make any purchase.
      </Typography>
    </div>
  );
}

export default App;
