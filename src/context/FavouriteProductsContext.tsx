"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { IProduct } from "@/lib/types";

interface FavoriteContextType {
  favorites: IProduct[];
  addFavorite: (product: IProduct) => void;
  removeFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

const FavoriteProductsContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const FavoriteProductsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [favorites, setFavorites] = useState<IProduct[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedFavourites = localStorage.getItem("favorites");
        return savedFavourites ? JSON.parse(savedFavourites) : [];
      } catch (error) {
        console.error("Failed to parse favorites from localStorage", error);
        return []
      }
    }
  });

  useEffect(() => {
    const savedFavourites = localStorage.getItem("favorites");
    if (savedFavourites) {
      try {
        const parsed: IProduct[] = savedFavourites ? JSON.parse(savedFavourites) : [];
        setFavorites(parsed);
      } catch (error) {
        console.error("Failed to parse favorites from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (product: IProduct) => {
    if (!favorites.some((item) => item.id === product.id)) {
      setFavorites((prev) => [...prev, product]);
    }
  };

  const removeFavorite = (productId: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== productId));
  };

  const isFavorite = (productId: number) => {
    return favorites.some((item) => item.id === productId);
  };

  return (
    <FavoriteProductsContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoriteProductsContext.Provider>
  );
};

export const useFavorites = (): FavoriteContextType => {
  const context = useContext(FavoriteProductsContext);
  if (!context) {
    throw new Error(
      "useFavorites must be used within a FavoriteProductsProvider"
    );
  }
  return context;
};
