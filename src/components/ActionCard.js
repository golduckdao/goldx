import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

export default function ActionCard({children, img, alt, noImg, link}) {
  return (
    <Card sx={{
      maxWidth: 240,
      height: 240, 
      borderRadius: 2,
      background: '#1A2662',
      boxShadow: '5px 0px 8px rgba(78, 0, 118, 0.8), -5px 0px 8px rgba(0, 68, 101, 0.8)'
    }}>
      <CardActionArea sx={{ height: '100%'}}
        href={link}
        rel="no-referrer"
        target="_blank"
      >
        { !noImg &&
        <CardMedia
          component="img"
          height="140"
          image={img}
          alt={alt}
        />
        }
        <CardContent>
          {children}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
