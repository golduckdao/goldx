import React from "react";
import { Box, Paper, Typography, Grid, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { debounce } from "lodash";
import useStore from "../store/store";
import airdropAbi from "../assets/blockchain/airdrop_abi.json";
import oldTokenAbi from "../assets/blockchain/old_token_abi.json";
import InnerBox from "../components/InnerBox";
import { BigNumber, ethers } from "ethers";
import BlueButton from "../components/BlueButton";
import { formatEther } from "ethers/lib/utils";
const Airdrop = () => {
  const { airdropContractAddress, isAuthenticated, provider } = useStore();
  const theme = useTheme();
  const [valueToReceive, setValueToReceive] = React.useState(0);
  const [valueToDeposit, setValueToDeposit] = React.useState(0);
  const [approved, setApproved] = React.useState(false);
  const handleInput = debounce(async (e) => {
    if (airdropContractAddress) {
      let t = parseFloat(e.target.value) || 0;
      setValueToDeposit(t);
      if (isAuthenticated) {
        const airdropContract = new ethers.Contract(
          airdropContractAddress,
          airdropAbi,
          provider
        );
        const value = await airdropContract.getAmountOut(
          BigNumber.from(t).mul(1e9)
        );
        setValueToReceive(value.toString());
      }
    }
  }, 2000);

  const handleApprove = async () => {
    if (valueToReceive > 0 && isAuthenticated) {
      const signer = await provider.getSigner();
      const airdropContract = new ethers.Contract(
        airdropContractAddress,
        airdropAbi,
        provider
      );
      const oldTokenAddress = await airdropContract.oldToken();
      const oldTokenContract = new ethers.Contract(
        oldTokenAddress,
        oldTokenAbi,
        signer
      );

      const value = await airdropContract.getAmountOut(
        BigNumber.from(valueToReceive).mul(1e9)
      );
      const tx = await oldTokenContract.approve(airdropContractAddress, value);
      const receipt = await tx.wait();
      if (receipt.status === 1) setApproved(true);
      else setApproved(false);
    }
  };

  const handleClaim = async () => {
    if (isAuthenticated) {
      const signer = await provider.getSigner();
      const airdropContract = new ethers.Contract(
        airdropContractAddress,
        airdropAbi,
        signer
      );

      console.log(
        "Claiming for ",
        BigNumber.from(valueToDeposit).mul(1e9).toString()
      );
      await airdropContract.claimTokens(
        BigNumber.from(valueToDeposit).mul(1e9)
      );
    }
  };

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          mt: 10,
        }}
      >
        <Box
          sx={{
            background: "#131A36",
            borderRadius: "16px",
            height: { sm: "480px", lg: "470px", xl: "600px" },
            width: { sm: "440px", lg: "550px", xl: "860px" },
            my: { sm: 10, lg: 6 },
            zIndex: 1,
            position: "absolute",
            display: { sm: "none", md: "block" },
          }}
        />
        <InnerBox boxSx={{ zIndex: 1000 }} paperSx={{ p: 1, pt: 3 }}>
          <Paper sx={{ width: "100%", borderRadius: theme.spacing(2), p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle2">Enter Golden Duck</Typography>
              <Typography variant="subtitle2">To Receive</Typography>
            </Box>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={5} align="center">
                <TextField
                  fullWidth
                  variant="outlined"
                  onChange={handleInput}
                  placeholder={"0.000"}
                />
              </Grid>
              <Grid item xs={2} align="center">
                <ArrowRightAltIcon />
              </Grid>
              <Grid item xs={5} align="center">
                <TextField
                  fullWidth
                  variant="outlined"
                  disabled
                  value={formatEther(valueToReceive)}
                />
              </Grid>
            </Grid>
          </Paper>
          <Typography ml={1} mt={3} align="left" variant="subtitle2" noWrap>
            Golden Duck tokens to Deposit: {valueToDeposit}
          </Typography>
          <Typography ml={1} mt={1} align="left" variant="subtitle2" noWrap>
            GolduckDAO tokens to receive: {formatEther(valueToReceive)}
          </Typography>
          <BlueButton
            fullWidth
            sx={{ mt: 4 }}
            disabled={approved}
            onClick={() => handleApprove()}
          >
            Approve
          </BlueButton>
          <BlueButton
            fullWidth
            sx={{ mt: 2 }}
            disabled={!approved}
            onClick={() => handleClaim()}
          >
            Claim Golduck Dao
          </BlueButton>
          <Typography align="left" variant="caption" noWrap>
            *Airdrop works only on BSC and ETH chains
          </Typography>
        </InnerBox>
      </Box>
    </Box>
  );
};

export default Airdrop;
