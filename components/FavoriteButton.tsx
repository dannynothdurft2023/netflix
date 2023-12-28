import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/outline";

//import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { user } = useSelector((state: any) => state.user);

  // const { mutate: mutateFavorites } = useFavorites();

  // const isFavorite = useMemo(() => {
  //   const list = currentUser?.favoriteIds || [];

  //   return list.includes(movieId);
  // }, [currentUser, movieId]);

  // const toggleFavorites = useCallback(async () => {
  //   let response;

  //   if (isFavorite) {
  //     response = await axios.delete("/api/favorite", { data: { movieId } });
  //   } else {
  //     response = await axios.post("/api/favorite", { movieId });
  //   }

  //   const updatedFavoriteIds = response?.data?.favoriteIds;

  //   mutate({
  //     ...currentUser,
  //     favoriteIds: updatedFavoriteIds,
  //   });
  //   mutateFavorites();
  // }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  //const Icon = isFavorite ? CheckIcon : PlusIcon;
  const Icon = PlusIcon;
  return (
    <div
      // onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
};

export default FavoriteButton;
