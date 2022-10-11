import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import InnerBox from "../components/InnerBox";
import BlueButton from "../components/BlueButton";

import buyTokenABI from "../assets/blockchain/buy_token_abi.json";
import { ethers } from "ethers";
import CopyToClipboard from "react-copy-to-clipboard";
import useStore from "../store/store";

const Referral = () => {
  const { buyTokenContractAddress, isAuthenticated, current, provider } = useStore();
  const [isReferral, setIsReferral] = useState(true);
  const [chainTokenEarned, setChainTokenEarned] = useState(0);
  const [nativeTokenEarned, setNativeTokenEarned] = useState(0);
  const [totalReferrals, setTotalReferrals] = useState(0);
  const [account, setAccount] = useState("");
  const [referralShare, setReferralShare] = useState(0);

  useEffect(() => {
    async function fetchData() {
      if (isAuthenticated) {
        const signer = provider.getSigner(0);
        setAccount(await signer.getAddress());

        const buyTokenContract = new ethers.Contract(
          buyTokenContractAddress,
          buyTokenABI,
          provider
        );
        const refShare = await buyTokenContract.referralShare();
        setReferralShare(refShare.toString());
        setIsReferral(await buyTokenContract.isReferral());
        const { bnbEarned, tokenEarned, totalReferrals } =
          await buyTokenContract.referralCommission(await signer.getAddress());
        setChainTokenEarned(ethers.utils.formatEther(bnbEarned.toString()));
        setNativeTokenEarned(ethers.utils.formatEther(tokenEarned.toString()));
        setTotalReferrals(totalReferrals.toString());
      }
    }
    fetchData();
  }, [isAuthenticated]);
  return (
    <InnerBox paperSx={{ p: 2, pt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>
          <b>Total Invited</b>
        </Typography>
        <Typography>{totalReferrals} Users</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 5,
        }}
      >
        <Typography>
          <b>Tokens Earned</b>
        </Typography>
        <Typography>{nativeTokenEarned}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>
          <b>Amount Earned</b>
        </Typography>
        <Typography>
          {chainTokenEarned}{" "}
          {current === "bsc"
            ? "BNB"
            : current === "polygon"
            ? "MATIC"
            : current === "metis"
            ? "METIS"
            : "ETH"}
        </Typography>
      </Box>

      <Typography align="left" mt={5}>
        <b>Your Referral Link:</b>
      </Typography>
      <Typography align="left" mb={2} noWrap>
        {isReferral && isAuthenticated
          ? `https://goldx.golduck.org/buy/${account}`
          : "N/A"}
      </Typography>
      <CopyToClipboard
        text={
          isReferral && isAuthenticated
            ? `https://goldx.golduck.org/buy/${account}`
            : "N/A"
        }
      >
        <BlueButton fullWidth>Copy to Clipboard</BlueButton>
      </CopyToClipboard>
      <Typography my={1} mx={1} fontSize={12} fontWeight={600}>
        {`*Invite your friends and get ${referralShare}% ${
          current === "bsc"
            ? "BNB"
            : current === "polygon"
            ? "MATIC"
            : current === "metis"
            ? "METIS"
            : "ETH"
        } contributed, +${referralShare}% of the tokens purchased sent to your wallet instantly`}
      </Typography>
    </InnerBox>
  );
};

export default Referral;
