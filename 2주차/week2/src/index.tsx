import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
