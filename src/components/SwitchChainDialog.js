import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Button,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import _binance from "../assets/images/Binance_Logo.svg.png";
import _polygon from "../assets/images/polygon_logo.png";
import _eth from "../assets/images/eth_logo.png";
import _metis from "../assets/images/metis_logo.png";

import useStore from '../store/store';

const SwitchChainDialog = ({open, onClose}) => {
  const {bsc, polygon, eth, metis, allowedNetworks, current} = useStore(state =>  state);
  const [chainImg, setChainImg] = React.useState({
    name: "Ethereum Mainnet",
    img: _eth
  });

  React.useEffect(() => {
    async function fetchChain() {
      console.log("Current Chain", current);
      if(window.ethereum && allowedNetworks.includes(await window.ethereum.request({ method: 'eth_chainId' }))) {
        if(current === 'bsc') setChainImg({name: 'Binance Smart Chain', img: _binance})
        else if(current === 'polygon') setChainImg({name: 'Polygon', img: _polygon})
        else if(current === 'metis') setChainImg({name: 'Metis Andromeda', img: _metis})
      }
    }
    fetchChain();
  }, [current]);


  const handleChainSwitch = async (id) => {
    // implement logic for switching chains
    if(window.ethereum) {
      try {
        // check if the chain to connect to is installed
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: id }], // chainId must be in hexadecimal numbers
        });
      } catch (error) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: id,
                },
              ],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
        console.error(error);
      }
    } else {
      alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    } 
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
        <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', my: 1}}>
          <Typography mr={1}>You are on</Typography>
          <img src={chainImg.img} alt={chainImg.name} height={25}/>
          <Typography ml={1}>{chainImg.name}.</Typography>
        </Box>
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
        <Button
          variant="contained"
          fullWidth
          sx={{my: 1}}
          startIcon={<img src={_metis} height={20} alt="Polygon Logo" />}
          onClick={() => handleChainSwitch(metis.network)}
        >
          Metis Andromeda
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default SwitchChainDialog