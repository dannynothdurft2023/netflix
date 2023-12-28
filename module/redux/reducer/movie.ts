"use client";
import { createSlice } from "@reduxjs/toolkit";

export const movie = createSlice({
  name: "movie",
  initialState: {
    randomMovie: null,
    movies: null,
    favorites: null,
  },
  reducers: {
    incrementRandomMovie(state, action) {
      state.randomMovie = action.payload;
    },
    incrementMovie(state, action) {
      state.movies = action.payload;
    },
    incrementFav(state, action) {
      state.favorites = action.payload;
    },
  },
});

export const { incrementRandomMovie, incrementMovie, incrementFav } =
  movie.actions;

export default movie.reducer;
