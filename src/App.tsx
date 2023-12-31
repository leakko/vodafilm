import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import queryClient from './clients/query-client';
import { FavoritesProvider } from './providers/FavoritesProvider';
import { router } from './routes';
import { GlobalStyle, theme } from './styles';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<FavoritesProvider>
					<GlobalStyle />
					<RouterProvider router={router} />
				</FavoritesProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
