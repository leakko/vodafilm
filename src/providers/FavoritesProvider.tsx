import React, { createContext, useContext, useMemo, useState } from 'react';

interface Props {
    children: React.ReactNode;
}

interface FavoritesContext {
    favoritesIds: number[];
    addFavorite: (id: number) => void;
    removeFavorite: (id: number) => void;
}

const initialContext: FavoritesContext = {
    favoritesIds: [],
    addFavorite: () => {},
    removeFavorite: () => {},
}

const FavoritesContext = createContext<FavoritesContext>(initialContext);

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
    const [favoritesIds, setFavoritesIds] = useState<number[]>([]);
    const favoritesContextValue = useMemo(() => {
        return {
            favoritesIds,
            addFavorite: (movieId: number) => setFavoritesIds(ids => [...ids, movieId]),
            removeFavorite: (movieId: number) => setFavoritesIds(ids => ids.filter(id => id !== movieId)),
        }
    }, [favoritesIds, setFavoritesIds])
    return (
        <FavoritesContext.Provider value={favoritesContextValue}>
            { children }
        </FavoritesContext.Provider>
    )
}
