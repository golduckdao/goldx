import React from 'react';
import { Box, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const InnerBox = ({children}) => {
  const theme = useTheme()
  return (
    <Box sx={{
      display: 'flex',
      borderRadius: '16px',
      height: {xs: '366px', sm: '256px', lg: '376px', xl: '456px'},
      width: {xs: '356px', sm: '356px', lg: '386px', xl: '526px'},
      justifyContent: 'center',
      alignItems: 'center',
      background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.secondary.main})`
    }}>
      <Paper sx={{
        background: '#131A36',
        borderRadius: '16px',
        height: {xs: '360px', sm: '250px', lg: '370px', xl: '450px'},
        width: {xs: '350px', sm: '350px', lg: '380px', xl: '520px'},
      }}
      elevation={0}
      >
        {children}
      </Paper>
    </Box>
  )
}

export default InnerBox