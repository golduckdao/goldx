import React from 'react';
import { Box, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const InnerBox = ({children, boxSx, paperSx}) => {
  const theme = useTheme()
  return (
    <Box sx={{
      display: 'flex',
      borderRadius: theme.spacing(2),
      height: {
        xs: paperSx && paperSx.height ? paperSx.height.xs + 6 : '386px',
        sm: paperSx && paperSx.height ? paperSx.height.lg + 6 : '396px',
        xl: paperSx && paperSx.height ? paperSx.height.xl + 6 : '462px'
      },
      width: {
        xs: paperSx && paperSx.width ? paperSx.width.xs + 6 : '356px',
        sm: paperSx && paperSx.width ? paperSx.width.sm + 6 : '356px',
        lg: paperSx && paperSx.width ? paperSx.width.lg + 6 : '386px',
        xl: paperSx && paperSx.width ? paperSx.width.xl + 6 : '526px'
      },
      justifyContent: 'center',
      alignItems: 'center',
      background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.secondary.main})`,
      ...boxSx
    }}>
      <Paper sx={{
        background: '#1A2662',
        borderRadius: theme.spacing(2),
        height: {xs: '385px', sm: '395px', xl: '460px'},
        width: {xs: '350px', sm: '350px', lg: '380px', xl: '520px'},
        ...paperSx
      }}
      elevation={0}
      >
        {children}
      </Paper>
    </Box>
  )
}

export default InnerBox