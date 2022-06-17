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

import binance from "../assets/images/Binance_Logo.svg.png";
import polygon from "../assets/images/polygon_logo.png";

const SwitchChainDialog = ({open, onClose}) => {
  
  return (
    <Dialog open={open} onClose={onClose}>
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
          Select the Chain to Switch to:
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{my: 1}}
          startIcon={<img src={binance} height={20} alt="BSC Logo" />}
        >
          Binance Smart Chain (BSC)
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{my: 1}}
          startIcon={<img src={polygon} height={20} alt="Polygon Logo" />}
        >
          Polygon
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default SwitchChainDialog