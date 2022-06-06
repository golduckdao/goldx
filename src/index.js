import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './assets/theme/theme';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { MoralisProvider } from 'react-moralis';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MoralisProvider serverUrl='https://zpipz9oqmifd.usemoralis.com:2053/server' appId='mdGUs8xeSoJDbGPEFRwhplAgfNVYT8zo4d3g3Aup'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </MoralisProvider>
  </React.StrictMode>
);
