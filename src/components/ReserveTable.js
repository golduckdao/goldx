import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CircularProgress, IconButton, Box } from '@mui/material';

import ChevronRightSharpIcon from '@mui/icons-material/ChevronRightSharp';
import ChevronLeftSharpIcon from '@mui/icons-material/ChevronLeftSharp';
import { useMoralis } from 'react-moralis';
import { ethers } from 'ethers';
import buyTokenABI from "../assets/blockchain/buy_token_abi.json";
import BlueButton from './BlueButton';
import useStore from '../store/store';


export default function ReserveTable() {
  const buyTokenContractAddress = useStore(state => state.buyTokenContractAddress);
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [tablerows, setTablerows] = React.useState([]);
  const { isAuthenticated, account, Moralis, isWeb3Enabled} = useMoralis();
  const headers = [
    'Lock Date',
    'Reserved Tokens',
    'Unlock Date',
    ''
  ];
  // let tablerows = ['2022.06.01', '50,000,000', '2022,06,01 15:00', <Button sx={{ color: '#33AEC1' }}><b>Claim</b></Button>];

  React.useEffect(() => {
    async function fetchData() {
      if(isAuthenticated) {
        if(!isWeb3Enabled) await Moralis.enableWeb3();
        const provider = new ethers.providers.Web3Provider(Moralis.provider);
        const signer = provider.getSigner(account);
        const buyTokenContract = new ethers.Contract(
          buyTokenContractAddress,
          buyTokenABI,
          signer
        );
        let userTickets = await buyTokenContract.getUserAllLockTickets(account);
        let promiseArr = [];
        userTickets.forEach(ticket => promiseArr.push(buyTokenContract.userLockInfo(ticket)));
        let rows = (await Promise.all(promiseArr))
        .map(({
          unLockedTime,
          lockedAmount,
          lockedTime
        }, index) => ({
          unlockedTime: new Date(parseInt(unLockedTime.mul(1000).toString())),
          lockedAmount: ethers.utils.formatEther(lockedAmount.toString()),
          lockedTime: new Date(parseInt(lockedTime.mul(1000).toString())),
          action: <Button 
          sx={{ color: '#33AEC1' }}
          onClick={async () => await buyTokenContract.claim(userTickets[index])}
          >
            <b>Claim</b>
          </Button>
        }))
        .map(({unlockedTime, lockedAmount, lockedTime}) => [
          `${lockedTime.getUTCDate().toString()}/${lockedTime.getUTCMonth() + 1}/${lockedTime.getUTCFullYear()} - ${lockedTime.getUTCHours()}:${lockedTime.getUTCMinutes()}`,
          lockedAmount,
          `${unlockedTime.getUTCDate().toString()}/${unlockedTime.getUTCMonth() + 1}/${unlockedTime.getUTCFullYear()} - ${unlockedTime.getUTCHours()}:${unlockedTime.getUTCMinutes()}`,
        ]);

        setTablerows(rows);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [Moralis, isAuthenticated, isWeb3Enabled, account]);

  const handleMultiClaim = async () => {
    if(isAuthenticated) {
      if(!isWeb3Enabled) await Moralis.enableWeb3();
      const provider = new ethers.providers.Web3Provider(Moralis.provider);
      const signer = provider.getSigner(account);
      const buyTokenContract = new ethers.Contract(
        buyTokenContractAddress,
        buyTokenABI,
        signer
      );
      await buyTokenContract.multiClaim();
    }
  }

  return (
    <>
    <Box sx={{ display: {xs: 'none', sm: 'flex'}, justifyContent: 'space-between', alignItems: 'center'}}>
      <Typography>
        <b>Locked Records</b>
      </Typography>
      <Button sx={{ color: '#33AEC1'}} onClick={handleMultiClaim}>
        <b>
          Claim All Unlocked
        </b>
      </Button>
    </Box>
    <Box sx={{ display: {xs: 'flex', sm: 'none'}, justifyContent: 'center', alignItems: 'center', my: 2}}>
      <BlueButton sx={{ px: 5}} onClick={handleMultiClaim}>
        Claim All Unlocked
      </BlueButton>
    </Box>
    <TableContainer component={Paper} sx={{ background: 'none' }} elevation={0}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead sx={{ border: 'none' }}>
          <TableRow>
            {
              headers.map((header, index) =>
                <TableCell align={index === 0 ? "left" : "center"} key={header + index}>{header}</TableCell>
              )
            }
          </TableRow>
        </TableHead>
        {
          isLoading &&
          <TableBody>
            <TableRow>
              <TableCell colSpan={headers.length} align="center">
                <CircularProgress sx={{ color: "#fff" }} size={25} />
              </TableCell>
            </TableRow>
          </TableBody>
        }
        {
          (!tablerows || tablerows.length === 0) && !isLoading &&
          <TableBody>
            <TableRow>
              <TableCell colSpan={headers.length} align="center" sx={{ py: 0 }}>
                <Typography my={1}>No data to Show!</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        }
        {
          tablerows && tablerows.length > 0 && !isLoading &&
          <TableBody>
            {tablerows
              .slice(page * 4, page * 4 + 4)
              .map((row, index) => (
                <TableRow
                  key={"reserve-table" + index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {
                    row.map((cell, index) =>
                      index === 0 ?
                        <TableCell component="th" scope="row" key={cell + index} sx={{ py: 1, px: 1 }}>
                          <Typography variant="caption">
                            {cell}
                          </Typography>
                        </TableCell>
                        : index === tablerows.length - 1 ?
                          <TableCell align="center" key={cell + index} sx={{ py: 0 }}>{cell}</TableCell> :
                          <TableCell align="center" key={cell + index} sx={{ py: 0 }}>
                            <Typography variant="caption">
                              {cell}
                            </Typography>
                          </TableCell>
                    )
                  }
                </TableRow>
              ))}
          </TableBody>
        }
      </Table>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: {xs: 1, lg: 3} }}>
        <IconButton sx={{ background: '#131A36', mr: 1, borderRadius: 2 }}
        onClick={() => setPage(prev=> prev - 1)}
        disabled={page === 0}
        >
          <ChevronLeftSharpIcon />
        </IconButton>
        <Box sx={{ border: '1px solid #fff', px: 2, py: 1, borderRadius: 2 }}>
          {page+1}
        </Box>
        <IconButton sx={{ background: '#131A36', ml: 1, borderRadius: 2 }}
          onClick={() => setPage(prev=> prev + 1)}
          disabled={page >= tablerows.length % 4}
        >
          <ChevronRightSharpIcon />
        </IconButton>

      </Box>
    </TableContainer>
    </>
  );
}
