import React, { Suspense } from 'react';
import { Outlet } from 'react-router';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import styled from 'styled-components';

const StyledMain = styled.main`
	max-width: 1000px;
	margin: 25px auto;
`;

const Layout: React.FC = () => {
	return (
		<>
			<Header />
			<StyledMain>
				<Suspense fallback={<div>Loading...</div>}>
					<Outlet />
				</Suspense>
			</StyledMain>
			<Footer />
		</>
	);
};

export default Layout;
