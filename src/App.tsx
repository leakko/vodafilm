import React from 'react';
import { ThemeProvider } from 'styled-components';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Main from './components/main/Main';
import { GlobalStyle, theme } from './styles';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Header />
			<Main>
				<h1>My App</h1>
				<p>Welcome to my app!</p>
			</Main>
			<Footer />
		</ThemeProvider>
	);
}

export default App;
