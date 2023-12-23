"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.user);

  const logout = async () => {
    try {
      const response = await axios.post(`${process.env.URL}/auth/logout`);
      if (response.data.success) {
        localStorage.removeItem("user");
        router.push("/auth");
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    user && (
      <>
        <main>
          <h1 className="text-2xl text-green-500">Netflix</h1>
          <button className="h-10 w-full bg-white" onClick={logout}>
            Abmelden
          </button>

          <h1>{user?.username}</h1>
        </main>
      </>
    )
  );
}
