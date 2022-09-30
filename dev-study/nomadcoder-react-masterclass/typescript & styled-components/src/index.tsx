import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { theme } from './theme';

const container: any = document.getElementById('root');
const root = createRoot(container);
const queryClient = new QueryClient();

root.render(
	<>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</QueryClientProvider>
	</>,
);
