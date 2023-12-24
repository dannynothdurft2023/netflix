"use client";
import { logout } from "@/module/auth";
import { useSelector, useDispatch } from "react-redux";
import { incrementUser } from "@/module/redux/reducer/user";
import { useRouter } from "next/navigation";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: any) => state.user);

  const _logout = async () => {
    const action = await logout();
    if (action) {
      dispatch(incrementUser(null));
      router.push("/auth");
    }
  };

  return (
    user && (
      <>
        <main>
          <h1 className="text-2xl text-green-500">{user?.username}</h1>
          <button className="h-10 w-full bg-white" onClick={_logout}>
            Abmelden
          </button>
        </main>
      </>
    )
  );
}
