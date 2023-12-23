"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const currentUrl =
    typeof window !== "undefined" ? window.location.origin : "";
  const [userInfo, setUserInfo] = useState(null);

  const getData = async () => {
    try {
      const token = localStorage.getItem("user");
      const response = await axios.post(`${currentUrl}/auth/userinfo`, {
        headers: { Authorization: token },
      });

      if (response.data.success) {
        setUserInfo(response.data.data);
        router.push("/");
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
