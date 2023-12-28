"use client";
import "./app-loader.scss";
import Config from "./config.json";
import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import BarLoader from "react-spinners/BarLoader";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";

interface AppLoaderProps {}

const AppLoader: FC<AppLoaderProps> = () => {
  const pathname = usePathname();
  const router = useRouter();
  const ModuleConfig = Config["App-Loader"];
  const LoaderAktive = ModuleConfig["loader-aktive"];
  const [appIsStart, setAppIsStart] = useState<boolean>(false);
  const { user } = useSelector((state: any) => state.user);

  useEffect(() => {
    setInterval(() => {
      setAppIsStart(true);
    }, 500);
  }, []);

  useEffect(() => {
    if (user !== null) {
      setAppIsStart(true);
    }
  }, [user]);

  useEffect(() => {
    if (appIsStart && user && pathname === "/auth") {
      return router.push("/profiles");
    } else if (
      appIsStart &&
      !user &&
      (pathname === "/profiles" || pathname === "/")
    ) {
      return router.push("/auth");
    }
  }, [appIsStart]);

  return LoaderAktive ? (
    <div
      className={
        appIsStart
          ? "app-loader-container app-is-start"
          : "app-loader-container"
      }
    >
      <Image
        src="/images/logo.png"
        width={200}
        height={200}
        alt={ModuleConfig["img-alt"]}
        title={ModuleConfig["img-title"]}
      />
      <BarLoader color="#d91f27" loading={true} width={200} />
    </div>
  ) : null;
};

export default AppLoader;
