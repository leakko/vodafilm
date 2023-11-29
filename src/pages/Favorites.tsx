import React, { useMemo } from 'react';
import styled from 'styled-components';
import emptyHeart from '../assets/img/heart_empty.png';
import fullHeart from '../assets/img/heart_full.png';
import Card from '../components/card/Card';
import CardsList from '../components/cards-list/CardsList';
import { Movie } from '../models/movie';
import { Show } from '../models/show';
import { useFavorites } from '../providers/FavoritesProvider';

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

const Favorites: React.FC = () => {
	const { favorites, addFavorite, removeFavorite } = useFavorites();
	console.log(favorites);

	const { movies, shows } = useMemo(() => {
		const response: { movies: Movie[]; shows: Show[] } = {
			movies: favorites.filter((movie) => (movie as Movie).title) as Movie[],
			shows: favorites.filter((show) => (show as Show).name) as Show[],
		};
		return response;
	}, [favorites]);

	if (!movies?.length && !shows.length)
		return <h1 style={{ textAlign: 'center', marginTop: '40px' }}>You don&#39;t have any favorite movie or TV Show</h1>;

	return (
		<section style={{ margin: '0px 25px' }}>
			{!!movies.length && <h1 style={{ textAlign: 'center', marginTop: '40px' }}>Your favorite movies</h1>}
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
			{!!shows.length && <h1 style={{ textAlign: 'center', marginTop: '40px' }}>Your favorite TV Shows</h1>}
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

export default Favorites;
