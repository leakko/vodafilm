import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { router } from './routes';
import { GlobalStyle, theme } from './styles';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<RouterProvider router={router} />
		</ThemeProvider>
	);
}

export default App;
