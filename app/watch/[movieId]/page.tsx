"use client";
import React, { FC, useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

import { useMovie } from "@/module/movie";

interface WatchProps {
  params: any;
}

const Watch: FC<WatchProps> = ({ params }) => {
  const router = useRouter();
  const [movie, setMovie] = useState<any>({});

  useEffect(() => {
    const timer = setTimeout(async () => {
      const data = await useMovie(params.movieId);
      if (data) {
        setMovie(data);
      } else {
      }
    }, 1);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <ArrowLeftIcon
          onClick={() => router.push("/")}
          className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition"
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {movie?.title}
        </p>
      </nav>
      <video
        className="h-full w-full"
        autoPlay
        controls
        src={movie?.videoUrl}
      ></video>
    </div>
  );
};

export default Watch;
