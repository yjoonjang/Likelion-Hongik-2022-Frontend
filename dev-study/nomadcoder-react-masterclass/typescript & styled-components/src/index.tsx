import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { theme } from './theme';

const container: any = document.getElementById('root');
const root = createRoot(container);

root.render(
	<>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</>,
);
