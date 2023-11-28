import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from '../components/card/Card';
import CardsList from '../components/cards-list/CardsList';
import getPopulars from '../queries/get-populars';

const Home: React.FC = () => {
	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['populars', 'movies'],
		queryFn: () => getPopulars(true),
		refetchOnWindowFocus: false,
	});

	const movies = useMemo(() => {
		const getImgUrl = (endpoint: string) => `https://image.tmdb.org/t/p/w200${endpoint}`;
		return data?.data.results.map((movie) => ({ ...movie, poster_path: getImgUrl(movie.poster_path) }));
	}, [data]);

	return (
		<section>
			{isLoading && <div>Loading...</div>}
			{isError && <div>Error: {error.toString()}</div>}
			<CardsList>
				{movies &&
					movies.map((movie) => (
						<Card key={movie.id}>
							<img style={{ borderRadius: '20px 20px 0 0' }} src={movie.poster_path} />
							<p style={{ maxWidth: '200px', textAlign: 'center' }}>{movie.title}</p>
						</Card>
					))}
			</CardsList>
		</section>
	);
};

export default Home;
