import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import emptyHeart from '../assets/img/heart_empty.png';
import Card from '../components/card/Card';
import CardsList from '../components/cards-list/CardsList';
import getPopulars from '../queries/get-populars';

const HeartImg = styled.img`
	width: 25px;
	height: 25px;
	position: absolute;
	right: 5%;
	top: 5%;

	&:hover {
		cursor: pointer;
	}
`;

const PosterImg = styled.img`
	border-radius: 20px 20px 0 0;
`;

const Home: React.FC = () => {
	const {
		isLoading: areMoviesLoading,
		isError: didMoviesFailed,
		data: moviesData,
		error: moviesError,
	} = useQuery({
		queryKey: ['populars', 'movies'],
		queryFn: () => getPopulars(true),
		refetchOnWindowFocus: false,
	});
	const {
		isLoading: areShowsLoading,
		isError: didShowsFailed,
		data: showsData,
	} = useQuery({
		queryKey: ['populars', 'shows'],
		queryFn: () => getPopulars(false),
		refetchOnWindowFocus: false,
	});

	const { movies, shows } = useMemo(() => {
		const getImgUrl = (endpoint: string) => `https://image.tmdb.org/t/p/w200${endpoint}`;
		return {
			movies: moviesData?.data.results
				.slice(0, 4)
				.map((movie) => ({ ...movie, poster_path: getImgUrl(movie.poster_path) })),
			shows: showsData?.data.results.slice(0, 4).map((show) => ({ ...show, poster_path: getImgUrl(show.poster_path) })),
		};
	}, [moviesData, showsData]);

	if (areMoviesLoading || areShowsLoading) return <div>Loading...</div>;
	if (didMoviesFailed || didShowsFailed) return <div>Error: {moviesError?.toString()}</div>;

	return (
		<section>
			<h1 style={{ textAlign: 'center', marginTop: '40px' }}>Top Movies</h1>
			<CardsList>
				{movies &&
					movies.map((movie) => (
						<Card key={movie.id}>
							<HeartImg src={emptyHeart} />
							<PosterImg src={movie.poster_path} />
							<p style={{ maxWidth: '200px', textAlign: 'center' }}>{movie.title}</p>
						</Card>
					))}
			</CardsList>
			<h1 style={{ textAlign: 'center', marginTop: '40px' }}>Top TV Shows</h1>
			<CardsList>
				{shows &&
					shows.map((movie) => (
						<Card key={movie.id}>
							<HeartImg src={emptyHeart} />
							<PosterImg src={movie.poster_path} />
							<p style={{ maxWidth: '200px', textAlign: 'center' }}>{movie.title}</p>
						</Card>
					))}
			</CardsList>
		</section>
	);
};

export default Home;
