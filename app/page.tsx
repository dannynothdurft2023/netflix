"use client";
import { useSelector } from "react-redux";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";

export default function Home() {
  const { user } = useSelector((state: any) => state.user);
  const { randomMovie, movies, favorites } = useSelector(
    (state: any) => state.movie
  );

  console.log(movies);

  return (
    user && (
      <>
        <main>
          <Navbar />
          {randomMovie && <Billboard />}
          <div className="pb-40">
            <MovieList title="Trending Now" data={movies} />
            <MovieList title="My List" data={favorites} />
          </div>
        </main>
      </>
    )
  );
}
