import React, { createContext, useContext, useState, useEffect } from 'react';
import { Meal, Cocktail } from '../types/api';

interface FavoriteItem {
  id: string;
  type: 'meal' | 'cocktail';
  name: string;
  image: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: Meal | Cocktail, type: 'meal' | 'cocktail') => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (item: Meal | Cocktail, type: 'meal' | 'cocktail') => {
    const id = type === 'meal' ? (item as Meal).idMeal : (item as Cocktail).idDrink;
    const name = type === 'meal' ? (item as Meal).strMeal : (item as Cocktail).strDrink;
    const image = type === 'meal' ? (item as Meal).strMealThumb : (item as Cocktail).strDrinkThumb || '';

    if (!isFavorite(id)) {
      setFavorites([...favorites, { id, type, name, image }]);
    }
  };

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some(item => item.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};