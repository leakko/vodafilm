import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CategoriesMenu from '../components/lateral-menu/CategoriesMenu';
import { MovieCategoriesResponse, MovieCategory } from '../models/movies-categories';
import { ShowCategoriesResponse, ShowCategory } from '../models/shows-categories';
import getCategories from '../queries/get-categories';

const Categories: React.FC = () => {
	const [typeOfItem] = useState<'movie' | 'show'>('movie');
	const [category, setCategory] = useState<MovieCategory | ShowCategory>({ id: 28, name: 'Action' });
	const {
		isLoading: areMovieCategoriesLoading,
		isError: didMovieCategoriesFailed,
		data: MovieCategoriesData,
	} = useQuery({
		queryKey: ['populars', 'shows'],
		queryFn: () => getCategories(true),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
	const {
		isLoading: areShowCategoriesLoading,
		isError: didShowCategoriesFailed,
		data: showCategoriesData,
	} = useQuery({
		queryKey: ['populars', 'shows'],
		queryFn: () => getCategories(false),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});

	const { movieCategories, showCategories } = useMemo(() => {
		const response: { movieCategories: MovieCategory[]; showCategories: ShowCategory[] } = {
			movieCategories: (MovieCategoriesData?.data as MovieCategoriesResponse)?.genres,
			showCategories: (showCategoriesData?.data as ShowCategoriesResponse)?.genres,
		};
		return response;
	}, [MovieCategoriesData, showCategoriesData]);

	if ((areMovieCategoriesLoading && typeOfItem === 'movie') || (areShowCategoriesLoading && typeOfItem === 'show')) {
		return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading...</p>;
	}

	if ((didMovieCategoriesFailed && typeOfItem === 'movie') || (didShowCategoriesFailed && typeOfItem === 'show')) {
		return <p style={{ textAlign: 'center', marginTop: '40px' }}>Error fetching the movies and TV Shows</p>;
	}

	return (
		<section>
			<h1 style={{ textAlign: 'center', marginTop: '40px' }}>
				Best {category.name.toLocaleLowerCase()} {typeOfItem === 'movie' ? 'movies' : 'shows'}
			</h1>
			<section>
				<CategoriesMenu
					categories={typeOfItem === 'movie' ? movieCategories : showCategories}
					setCategory={(cat: MovieCategory | ShowCategory) => setCategory(cat)}
					selectedCategory={category}
				/>
			</section>
		</section>
	);
};

export default Categories;
