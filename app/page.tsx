"use client";
import { useSelector } from "react-redux";

import Navbar from "@/components/Navbar";

export default function Home() {
  const { user } = useSelector((state: any) => state.user);

  return (
    user && (
      <>
        <main>
          <Navbar />
        </main>
      </>
    )
  );
}
