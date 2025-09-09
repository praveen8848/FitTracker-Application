// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import './index.css';

// ✅ 1. Import the necessary Material-UI components
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

// ✅ 2. Define the dark theme we discussed
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    primary: {
      main: '#38bdf8',
    },
    secondary: {
      main: '#94a3b8',
    },
  },
  typography: {
    allVariants: {
      color: '#e2e8f0',
    },
    h3: {
      fontWeight: 800,
    },
    h5: {
      fontWeight: 800,
    },
  },
});

// NOTE: The `initializeAuth` dispatch in App.js is enough.
// You can safely remove the one that was here.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* ✅ 3. Wrap your App with the ThemeProvider and CssBaseline */}
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
);