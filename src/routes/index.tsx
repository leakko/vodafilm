import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Favorites from '../pages/Favorites';
const Home = React.lazy(() => import('../pages/Home'));
const Categories = React.lazy(() => import('../pages/Categories'));
const Detail = React.lazy(() => import('../pages/Detail'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'categories',
				element: <Categories />,
			},
			{
				path: 'detail',
				element: <Detail />,
			},
			{
				path: 'favorites',
				element: <Favorites />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
]);
