"use client";
import { createSlice } from "@reduxjs/toolkit";

export const movie = createSlice({
  name: "movie",
  initialState: {
    randomMovie: null,
  },
  reducers: {
    incrementRandomMovie(state, action) {
      state.randomMovie = action.payload;
    },
  },
});

export const { incrementRandomMovie } = movie.actions;

export default movie.reducer;
