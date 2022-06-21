
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

import Appbar from "./components/Appbar";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import { Navigate, Route, Routes } from "react-router-dom";
import Rewards from "./pages/Rewards";
import BuyToken from "./pages/BuyToken";
import { useMoralis } from "react-moralis";

function App() {
  const {Moralis, isWeb3Enabled} = useMoralis();
  React.useEffect(() => {
    async function initialize() {
      await Moralis.enableWeb3();
    }
    initialize();
  }, [isWeb3Enabled])
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
