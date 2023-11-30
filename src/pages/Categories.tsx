import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { styled } from 'styled-components';
import emptyHeart from '../assets/img/heart_empty.png';
import fullHeart from '../assets/img/heart_full.png';
import Card from '../components/card/Card';
import CardsList from '../components/cards-list/CardsList';
import CategoriesMenu from '../components/lateral-menu/CategoriesMenu';
import Selector from '../components/selector/selector';
import { Movie } from '../models/movie';
import { MovieCategoriesResponse, MovieCategory } from '../models/movies-categories';
import { TmdbApiResponse } from '../models/populars-api-response';
import { Show } from '../models/show';
import { ShowCategoriesResponse, ShowCategory } from '../models/shows-categories';
import { useFavorites } from '../providers/FavoritesProvider';
import getByGenre from '../queries/get-by-genre';
import getCategories from '../queries/get-categories';

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

const Categories: React.FC = () => {
	const [typeOfItem, setTypeOfItem] = useState<'movie' | 'show'>('movie');
	const [category, setCategory] = useState<MovieCategory | ShowCategory>({ id: 28, name: 'Action' });
	const { favorites, addFavorite, removeFavorite } = useFavorites();

	const {
		isLoading: areMovieCategoriesLoading,
		isError: didMovieCategoriesFailed,
		data: movieCategoriesData,
	} = useQuery({
		queryKey: ['categories', 'movies'],
		queryFn: () => getCategories(true),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
	const {
		isLoading: areShowCategoriesLoading,
		isError: didShowCategoriesFailed,
		data: showCategoriesData,
	} = useQuery({
		queryKey: ['categories', 'shows'],
		queryFn: () => getCategories(false),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
	const { isLoading: areMoviesByGenreLoading, data: moviesByGenreData } = useQuery({
		queryKey: ['movies', 'genre', category.id],
		queryFn: () => getByGenre(true, category.id),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
	const { isLoading: areShowsByGenreLoading, data: showsByGenreData } = useQuery({
		queryKey: ['shows', 'genre', category.id],
		queryFn: () => getByGenre(false, category.id),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});

	const { movieCategories, showCategories } = useMemo(() => {
		const response: { movieCategories: MovieCategory[]; showCategories: ShowCategory[] } = {
			movieCategories: (movieCategoriesData?.data as MovieCategoriesResponse)?.genres,
			showCategories: (showCategoriesData?.data as ShowCategoriesResponse)?.genres,
		};
		return response;
	}, [movieCategoriesData, showCategoriesData]);

	const { moviesByGenre, showsByGenre } = useMemo(() => {
		const getImgUrl = (endpoint: string) => `https://image.tmdb.org/t/p/w200${endpoint}`;
		const response: { moviesByGenre: Movie[]; showsByGenre: Show[] } = {
			moviesByGenre: (moviesByGenreData?.data as TmdbApiResponse<Movie>)?.results?.slice(0, 6).map((movie) => ({
				...movie,
				poster_path: getImgUrl(movie.poster_path),
				isFavorite: !!favorites.find((favorite) => favorite.id === movie.id),
			})),
			showsByGenre: (showsByGenreData?.data as TmdbApiResponse<Show>)?.results?.slice(0, 6).map((show) => ({
				...show,
				poster_path: getImgUrl(show.poster_path),
				isFavorite: !!favorites.find((favorite) => favorite.id === show.id),
			})),
		};
		return response;
	}, [moviesByGenreData, showsByGenreData, favorites]);

	const onTypeOfItemSelected = (typeOfItem: 'movie' | 'show') => {
		setTypeOfItem(typeOfItem);
		setCategory(typeOfItem === 'movie' ? movieCategories[0] : showCategories[0]);
	};

	if ((areMovieCategoriesLoading && typeOfItem === 'movie') || (areShowCategoriesLoading && typeOfItem === 'show')) {
		return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading...</p>;
	}

	if ((didMovieCategoriesFailed && typeOfItem === 'movie') || (didShowCategoriesFailed && typeOfItem === 'show')) {
		return <p style={{ textAlign: 'center', marginTop: '40px' }}>Error fetching the movies and TV Shows</p>;
	}

	return (
		<section>
			<div style={{ display: 'flex' }}>
				<div style={{ marginTop: '40px' }}>
					<ul style={{ display: 'flex', columnGap: '15px', paddingLeft: '0' }}>
						<Selector selected={typeOfItem === 'movie'} onClick={() => onTypeOfItemSelected('movie')}>
							Movies
						</Selector>
						<Selector selected={typeOfItem === 'show'} onClick={() => onTypeOfItemSelected('show')}>
							Shows
						</Selector>
					</ul>
					<CategoriesMenu
						categories={typeOfItem === 'movie' ? movieCategories : showCategories}
						setCategory={(cat: MovieCategory | ShowCategory) => setCategory(cat)}
						selectedCategory={category}
					/>
				</div>
				<div style={{ width: '100%', margin: '0 25px' }}>
					<h1 style={{ textAlign: 'center', marginTop: '40px' }}>
						Best {category.name.toLocaleLowerCase()} {typeOfItem === 'movie' ? 'movies' : 'shows'}
					</h1>
					<div style={{ width: '100%', height: '85vh', overflowY: 'auto' }}>
						<CardsList>
							{(areMoviesByGenreLoading || areShowsByGenreLoading) && (
								<h2 style={{ textAlign: 'center' }}>Loading...</h2>
							)}
							{(typeOfItem === 'movie' ? moviesByGenre : showsByGenre)?.map((item: Movie | Show) => (
								<Card key={item.id}>
									<HeartImg
										src={item.isFavorite ? fullHeart : emptyHeart}
										onClick={item.isFavorite ? () => removeFavorite(item) : () => addFavorite(item)}
									/>
									<PosterImg src={item.poster_path} />
									<p style={{ maxWidth: '200px', textAlign: 'center' }}>
										{(item as any)[typeOfItem === 'movie' ? 'title' : 'name']}
									</p>
								</Card>
							))}
						</CardsList>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Categories;
