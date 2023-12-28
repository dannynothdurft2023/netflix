"use client";

import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../reducer/user";
import movieReducer from "../reducer/movie";

export const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
  },
});
