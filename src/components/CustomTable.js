import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';




export default function CustomTable({headers, tablerows, isLoading, ikey=""}) {
  if(!headers || headers.length === 0)
  return (
    <Paper sx={{
      py: 3,
      height: {sm: '400px', lg: '450px', xl: '634px'},
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Typography variant="h5">No data to Show!</Typography>
    </Paper>
  )
  else
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              headers.map((header, index) => 
              <TableCell align={index === 0 ? "left" : "center"} key={header+index}>{header}</TableCell>
              )
            }
          </TableRow>
        </TableHead>
        {
          isLoading &&
          <TableBody>
            <TableRow>
              <TableCell colSpan={headers.length} align="center">
              <Paper sx={{
                py: 3,
                height: {sm: '400px', lg: '450px', xl: '634px'},
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <CircularProgress color='secondary'/>
              </Paper>
              </TableCell>
            </TableRow>
          </TableBody>
        }
        {
          (!tablerows || tablerows.length === 0) && !isLoading &&
          <TableBody>
            <TableRow>
              <TableCell colSpan={headers.length} align="center">
              <Paper sx={{
                py: 3,
                height: {sm: '400px', lg: '450px', xl: '634px'},
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Typography variant="h5">No data to Show!</Typography>
              </Paper>
              </TableCell>
            </TableRow>
          </TableBody>
        }
        {
          tablerows && tablerows.length > 0 && !isLoading &&
          <TableBody>
            {tablerows.map((row, index) => (
              <TableRow
                key={ikey+index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {
                  row.map((cell, index) =>
                  index === 0 ?
                  <TableCell component="th" scope="row" key={cell+index}>
                    {cell}
                  </TableCell>
                  :
                  <TableCell align="center" key={cell+index}>{cell}</TableCell>
                  )
                }
              </TableRow>
            ))}
          </TableBody>
        }
        
      </Table>
    </TableContainer>
  );
}
