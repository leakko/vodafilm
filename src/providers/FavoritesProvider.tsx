import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Movie } from '../models/movie';
import { Show } from '../models/show';

interface Props {
	children: React.ReactNode;
}

interface FavoritesContext {
	favorites: (Movie | Show)[];
	addFavorite: (item: Movie | Show) => void;
	removeFavorite: (item: Movie | Show) => void;
}

const storedFavorites = localStorage.getItem('favorites')
	? JSON.parse(localStorage.getItem('favorites') as string)
	: [];

const initialContext: FavoritesContext = {
	favorites: storedFavorites,
	addFavorite: () => {},
	removeFavorite: () => {},
};

const FavoritesContext = createContext<FavoritesContext>(initialContext);

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
	const [favorites, setFavorites] = useState<(Movie | Show)[]>([]);
	const favoritesContextValue = useMemo(() => {
		localStorage.setItem('favorites', JSON.stringify(favorites));
		return {
			favorites,
			addFavorite: (newItem: Movie | Show) => {
				newItem = { ...newItem, isFavorite: true };
				setFavorites((items) => {
					if (items.find((item) => item.id === newItem.id)) {
						return items;
					} else {
						return [...items, newItem];
					}
				});
			},
			removeFavorite: (itemToRemove: Movie | Show) =>
				setFavorites((items) => items.filter((item) => item.id !== itemToRemove.id)),
		};
	}, [favorites, setFavorites]);
	useEffect(() => {
		setFavorites(storedFavorites);
	}, []);
	return <FavoritesContext.Provider value={favoritesContextValue}>{children}</FavoritesContext.Provider>;
};
