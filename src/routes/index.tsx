import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Favorites from '../pages/Favorites';
const Home = React.lazy(() => import('../pages/Home'));
const Category = React.lazy(() => import('../pages/Category'));
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
				path: 'category',
				element: <Category />,
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
