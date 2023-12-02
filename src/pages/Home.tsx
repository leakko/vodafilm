import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import emptyHeart from '../assets/img/heart_empty.png';
import fullHeart from '../assets/img/heart_full.png';
import Card from '../components/card/Card';
import CardsList from '../components/cards-list/CardsList';
import { Movie } from '../models/movie';
import { TmdbApiResponse } from '../models/populars-api-response';
import { Show } from '../models/show';
import { useFavorites } from '../providers/FavoritesProvider';
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
		refetchOnMount: false,
		staleTime: 1000 * 60 * 10
	});
	const {
		isLoading: areShowsLoading,
		isError: didShowsFailed,
		data: showsData,
	} = useQuery({
		queryKey: ['populars', 'shows'],
		queryFn: () => getPopulars(false),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		staleTime: 1000 * 60 * 10
	});

	const { favorites, addFavorite, removeFavorite } = useFavorites();

	const { movies, shows } = useMemo(() => {
		const getImgUrl = (endpoint: string) => `https://image.tmdb.org/t/p/w200${endpoint}`;
		const response: { movies: Movie[]; shows: Show[] } = {
			movies: (moviesData?.data as TmdbApiResponse<Movie>)?.results?.slice(0, 4).map((movie) => ({
				...movie,
				poster_path: getImgUrl(movie.poster_path),
				isFavorite: !!favorites.find((favorite) => favorite.id === movie.id),
			})),
			shows: (showsData?.data as TmdbApiResponse<Show>)?.results?.slice(0, 4).map((show) => ({
				...show,
				poster_path: getImgUrl(show.poster_path),
				isFavorite: !!favorites.find((favorite) => favorite.id === show.id),
			})),
		};
		return response;
	}, [moviesData, showsData, favorites]);

	if (areMoviesLoading || areShowsLoading) return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading...</p>;
	if (didMoviesFailed || didShowsFailed)
		return <p style={{ textAlign: 'center', marginTop: '40px' }}>Error: {moviesError?.toString()}</p>;

	return (
		<section style={{ margin: '0px 25px' }}>
			<h1 style={{ textAlign: 'center', marginTop: '40px' }}>Top Movies</h1>
			<CardsList>
				{movies &&
					movies.map((movie) => (
						<Card key={movie.id}>
							<HeartImg
								src={movie.isFavorite ? fullHeart : emptyHeart}
								onClick={movie.isFavorite ? () => removeFavorite(movie) : () => addFavorite(movie)}
							/>
							<PosterImg src={movie.poster_path} />
							<p style={{ maxWidth: '200px', textAlign: 'center' }}>{movie.title}</p>
						</Card>
					))}
			</CardsList>
			<h1 style={{ textAlign: 'center', marginTop: '40px' }}>Top TV Shows</h1>
			<CardsList>
				{shows &&
					shows.map((show) => (
						<Card key={show.id}>
							<HeartImg
								src={show.isFavorite ? fullHeart : emptyHeart}
								onClick={show.isFavorite ? () => removeFavorite(show) : () => addFavorite(show)}
							/>
							<PosterImg src={show.poster_path} />
							<p style={{ maxWidth: '200px', textAlign: 'center' }}>{show.name}</p>
						</Card>
					))}
			</CardsList>
		</section>
	);
};

export default Home;
