"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { incrementUser } from "@/module/redux/reducer/user";
import { signIn, register } from "@/module/auth";

import Input from "@/components/Input";

const Auth = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [variant, setVariant] = useState("login");
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const reg = useCallback(async () => {
    const reg = await register(data);
    if (reg) {
      login();
    }
  }, [data.email, data.password, data.passwordRepeat, data.username]);

  const login = useCallback(async () => {
    const login = await signIn(data);
    if (login) {
      dispatch(incrementUser(login));
      router.push("/profiles");
    }
  }, [data.email, data.password]);

  return (
    <div className="ralative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image
            src="/images/logo.png"
            alt="Logo"
            title="Logo"
            width={200}
            height={50}
          />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Anmelden" : "Registrieren"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Nutzername"
                  onChange={handleChange}
                  id="username"
                  type="text"
                  value={data.username}
                />
              )}
              <Input
                label="E-Mail"
                onChange={handleChange}
                id="email"
                type="email"
                value={data.email}
              />
              <Input
                label="Password"
                onChange={handleChange}
                id="password"
                type="password"
                value={data.password}
              />
              {variant === "register" && (
                <Input
                  label="Password wiederholen"
                  onChange={handleChange}
                  id="passwordRepeat"
                  type="password"
                  value={data.passwordRepeat}
                />
              )}
            </div>
            <button
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              onClick={variant === "login" ? login : reg}
            >
              {variant === "login" ? "Anmelden" : "Registrieren"}
            </button>
            <p className="text-neutral-500 mt-12 text-center">
              {variant === "login"
                ? "Bist du das erste mal hier??"
                : "Du hast bereits ein Account?"}{" "}
              <br />
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Erstelle ein Account" : "Anmelden"}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
