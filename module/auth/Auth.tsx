"use client";
import React, { useEffect } from "react";
import { getInfo } from "@/module/auth";
import { useDispatch, useSelector } from "react-redux";
import { incrementUser } from "@/module/redux/reducer/user";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (user === null) {
        const info = await getInfo();
        if (info) {
          dispatch(incrementUser(info));
        }
      }
    }, 1);
    return () => clearTimeout(timer);
  }, [user]);

  return <>{children}</>;
};

export default Auth;
