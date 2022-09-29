import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme'; 

const rootElement = document.getElementById('root');
if(!rootElement) throw new Error('Faliled to find the root element');
const root = ReactDOM.createRoot(rootElement);
root.render(
<>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
</>
);
