"use client";
import { useSelector } from "react-redux";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
//import InfoModal from "@/components/InfoModal";
import useInfoModalStore from "@/hooks/useInfoModalStore";

export default function Home() {
  const { user } = useSelector((state: any) => state.user);
  const { randomMovie, movies, favorites } = useSelector(
    (state: any) => state.movie
  );

  const { isOpen, closeModal } = useInfoModalStore();

  return (
    user && (
      <>
        <main>
          {/* <InfoModal visible={isOpen} onClose={closeModal} /> */}
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
