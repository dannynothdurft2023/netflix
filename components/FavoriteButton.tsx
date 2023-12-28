"use client";
import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite, getFavorite } from "@/module/movie";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/outline";
import { incrementFav } from "@/module/redux/reducer/movie";

//import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  const { user } = useSelector((state: any) => state.user);
  const { favorites } = useSelector((state: any) => state.movie);

  useEffect(() => {
    if (favorites !== null) {
      const isMovieInFavorites = favorites.some(
        (favorite: any) => favorite._id === movieId
      );
      setIsFavorite(isMovieInFavorites);
    }
  }, [favorites]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await removeFavorite(movieId, user._id);

      if (response) {
        setIsFavorite(false);
        const updateState = await getFavorite(user._id);

        if (updateState) {
          dispatch(incrementFav(updateState));
        }
      }
    } else {
      response = await addFavorite(movieId, user._id);

      if (response) {
        setIsFavorite(true);

        const updateState = await getFavorite(user._id);

        if (updateState) {
          dispatch(incrementFav(updateState));
        }
      }
    }
  }, [movieId, isFavorite, user]);

  const Icon = isFavorite ? CheckIcon : PlusIcon;

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
};

export default FavoriteButton;
