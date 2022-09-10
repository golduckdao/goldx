import React from "react";
import { Box, Typography } from "@mui/material";
import InnerBox from "../components/InnerBox";
const Airdrop = () => {
  return (
    <Box
      sx={{
        p: 4,
        ml: { sm: "200px" },
        background: { xs: "none", sm: "#0C0926" },
        borderRadius: "30px 0px 0px 0px",
        height: { sm: "100vh" },
        position: "relative",
      }}
    >
      <Typography
        sx={{ display: { xs: "none", sm: "block" } }}
        mb={2}
        align="center"
        variant="h3"
      >
        Airdrop
      </Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <InnerBox>

      </InnerBox>

      </Box>
    </Box>
  );
};

export default Airdrop;
