"use client";
import { useSelector } from "react-redux";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";

export default function Home() {
  const { user } = useSelector((state: any) => state.user);
  const { randomMovie } = useSelector((state: any) => state.movie);

  return (
    user && (
      <>
        <main>
          <Navbar />
          {randomMovie && <Billboard />}
        </main>
      </>
    )
  );
}
