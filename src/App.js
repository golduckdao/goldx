
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Appbar from "./components/Appbar";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import { Navigate, Route, Routes } from "react-router-dom";
import Swap from "./pages/Swap";
import Rewards from "./pages/Rewards";

function App() {
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
        <Route path="/" element={<Navigate to="/swap" replace />}/>
        <Route path="/swap" element={<Swap />} />
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
      
    </div>
  );
}

export default App;
