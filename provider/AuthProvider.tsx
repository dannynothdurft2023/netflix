"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { incrementUser } from "@/redux/reducer/user";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);

  const getData = async () => {
    try {
      const token = localStorage.getItem("user");
      const response = await axios.post(`${process.env.URL}/auth/userinfo`, {
        headers: { Authorization: token },
      });

      if (response.data.success) {
        setUserInfo(response.data.data);
        dispatch(incrementUser(response.data.data));
        router.push("/profiles");
      } else {
        localStorage.removeItem("user");
        router.push("/auth");
      }
    } catch (error) {
      localStorage.removeItem("user");
      router.push("/auth");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userInfo === null) {
        getData();
      }
    }, 1);
    return () => clearTimeout(timer);
  }, [userInfo]);
  return <>{children}</>;
};

export default AuthProvider;
