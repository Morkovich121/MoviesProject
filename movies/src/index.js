import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ThemeProvider } from "./theme-context";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={JSON.parse(localStorage.getItem('theme'))}>
      <App />
    </ThemeProvider>

  </React.StrictMode>
);