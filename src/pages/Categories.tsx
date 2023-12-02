import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { styled } from 'styled-components';
import emptyHeart from '../assets/img/heart_empty.png';
import fullHeart from '../assets/img/heart_full.png';
import Card from '../components/card/Card';
import CardsList from '../components/cards-list/CardsList';
import CategoriesMenu from '../components/lateral-menu/CategoriesMenu';
import Selector from '../components/selector-button/SelectorButton';
import { Movie } from '../models/movie';
import { MovieCategory } from '../models/movies-categories';
import { Show } from '../models/show';
import { ShowCategory } from '../models/shows-categories';
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
		isLoading: areItemCategoriesLoading,
		isError: didItemCategoriesFailed,
		data: itemCategoriesData,
	} = useQuery({
		queryKey: ['categories', typeOfItem],
		queryFn: () => getCategories(typeOfItem === 'movie'),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
	const { isLoading: areItemsByGenreLoading, data: itemsByGenreData } = useQuery({
		queryKey: [typeOfItem, 'genre', category.id],
		queryFn: () => getByGenre(typeOfItem === 'movie', category.id),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});

	useEffect(()=> {
		setCategory(itemCategoriesData?.data?.genres[0] ?? { id: 28, name: 'Action' });
	}, [itemCategoriesData])

	const itemsByGenre = useMemo(() => {
		const getImgUrl = (endpoint: string) => `https://image.tmdb.org/t/p/w200${endpoint}`;
		return itemsByGenreData?.data?.results?.slice(0, 6).map(item => ({
			...item,
				poster_path: getImgUrl(item.poster_path),
				isFavorite: !!favorites.find((favorite) => favorite.id === item.id),
		}))
	}, [itemsByGenreData, favorites])

	const onTypeOfItemSelected = (typeOfItem: 'movie' | 'show') => {
		setTypeOfItem(typeOfItem);
	};

	if (areItemCategoriesLoading) {
		return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading...</p>;
	}

	if (didItemCategoriesFailed) {
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
						categories={itemCategoriesData?.data?.genres ?? []}
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
							{( areItemsByGenreLoading ) && (
								<h2 style={{ textAlign: 'center' }}>Loading...</h2>
							)}
							{itemsByGenre?.map((item: Movie | Show) => (
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
