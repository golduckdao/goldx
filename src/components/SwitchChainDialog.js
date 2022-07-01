import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import _binance from "../assets/images/Binance_Logo.svg.png";
import _polygon from "../assets/images/polygon_logo.png";
import _eth from "../assets/images/eth_logo.png";
import { useChain } from 'react-moralis';
import useStore from '../store/store';

const SwitchChainDialog = ({open, onClose}) => {
  const {switchNetwork} = useChain();
  const {bsc, polygon, eth} = useStore(state =>  state);
  const handleChainSwitch = (id) => {
    switchNetwork(id);
    onClose();
  }
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography>
          Switch Chain
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography>
          GoldX is only avaible currently on the following chains:
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{my: 1}}
          startIcon={<img src={_eth} height={20} alt="Ethereum Logo" />}
          onClick={() => handleChainSwitch(eth.network)}
        >
          Ethereum Mainnet
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{my: 1}}
          startIcon={<img src={_binance} height={20} alt="BSC Logo" />}
          onClick={() => handleChainSwitch(bsc.network)}
        >
          Binance Smart Chain (BSC)
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{my: 1}}
          startIcon={<img src={_polygon} height={20} alt="Polygon Logo" />}
          onClick={() => handleChainSwitch(polygon.network)}
        >
          Polygon
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default SwitchChainDialog