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
import { CircularProgress, IconButton, TableFooter, Box } from '@mui/material';

import ChevronRightSharpIcon from '@mui/icons-material/ChevronRightSharp';
import ChevronLeftSharpIcon from '@mui/icons-material/ChevronLeftSharp';


export default function ReserveTable() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const headers = [
    'Date',
    'Reserve Tokens',
    'Unlock Date',
    ''
  ];
  let tablerows = ['2022.06.01', '50,000,000', '2022,06,01 15:00', <Button sx={{ color: '#33AEC1' }}><b>Claim</b></Button>];
  return (
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
                <Typography variant="h5">No data to Show!</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        }
        {
          tablerows && tablerows.length > 0 && !isLoading &&
          <TableBody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              .slice(page * 4, page * 4 + 4)
              .map((row, index) => (
                <TableRow
                  key={"reserve-table" + index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {
                    tablerows.map((cell, index) =>
                      index === 0 ?
                        <TableCell component="th" scope="row" key={cell + index} sx={{ py: 0 }}>
                          <Typography variant="caption">
                            {row + cell}
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
          disabled={page >= 10%4}
        >
          <ChevronRightSharpIcon />
        </IconButton>

      </Box>
    </TableContainer>
  );
}
