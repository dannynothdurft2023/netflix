"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getInfo } from "@/module/auth";
import { useDispatch, useSelector } from "react-redux";
import { incrementUser } from "@/module/redux/reducer/user";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (user === null) {
        const info = await getInfo();
        if (info) {
          dispatch(incrementUser(info));
          router.push("/");
        }
      }
    }, 1);
    return () => clearTimeout(timer);
  }, [user]);

  return <>{children}</>;
};

export default Auth;
