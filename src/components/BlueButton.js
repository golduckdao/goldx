import React from 'react';

import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const BlueButton = ({children, sx, ...other}) => {
  const theme = useTheme();
  return (
    <Button variant="contained" sx={{
      textTransform: 'none',
      background: 'linear-gradient(91.44deg, #004465 0%, #1A2662 100%)',
      borderRadius: theme.spacing(8),
      px: 5,
      ...sx
    }}
    {...other}
    >
      {children}
    </Button>
  )
}

export default BlueButton