import React, { Suspense } from 'react';
import { Outlet } from 'react-router';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Main from '../main/Main';

const Layout: React.FC = () => {
	return (
		<>
			<Header />
			<Main>
				<Suspense fallback={<div>Loading...</div>}>
					<Outlet />
				</Suspense>
			</Main>
			<Footer />
		</>
	);
};

export default Layout;
