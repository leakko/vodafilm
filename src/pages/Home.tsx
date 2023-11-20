import React from 'react';
import { useQuery } from '@tanstack/react-query';
import getMoviesCategories from '../queries/get-movies-categories';

const Home: React.FC = () => {
	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['movies'],
		queryFn: getMoviesCategories,
		refetchOnWindowFocus: false,
	});

	return (
		<section>
			{isLoading && <div>Loading...</div>}
			{isError && <div>Error: {error.toString()}</div>}
			{data && JSON.stringify(data)}
		</section>
	);
};

export default Home;
