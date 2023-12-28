"use client";
import React, { useEffect } from "react";
import { getInfo } from "@/module/auth";
import { useDispatch, useSelector } from "react-redux";
import { incrementUser } from "@/module/redux/reducer/user";
import {
  incrementRandomMovie,
  incrementMovie,
  incrementFav,
} from "../redux/reducer/movie";

import { getRandomMovie, getMovies, getFavorite } from "../movie";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector((state: any) => state.user);
  const { randomMovie, movies, favorites } = useSelector(
    (state: any) => state.movie
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (user === null) {
        const info = await getInfo();
        if (info) {
          dispatch(incrementUser(info));
        }
      }
    }, 1);
    return () => clearTimeout(timer);
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (randomMovie === null) {
        const randomMovie = await getRandomMovie();
        if (randomMovie) {
          dispatch(incrementRandomMovie(randomMovie));
        }
      }
    }, 1);
    return () => clearTimeout(timer);
  }, [randomMovie]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (movies === null) {
        const movie = await getMovies();
        if (movie) {
          dispatch(incrementMovie(movie));
        }
      }
    }, 1);
    return () => clearTimeout(timer);
  }, [movies]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (favorites === null && user !== null) {
        const fav = await getFavorite(user._id);
        if (fav) {
          dispatch(incrementFav(fav));
        }
      }
    }, 1);
    return () => clearTimeout(timer);
  }, [favorites, user]);

  return <>{children}</>;
};

export default Auth;
