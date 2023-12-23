"use client";
import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Profiles = () => {
  const { user } = useSelector((state: any) => state.user);
  const router = useRouter();

  return (
    user && (
      <div className="flex items-center h-full justify-center">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-6xl text-white text-center">
            Welches Profile
          </h1>
          <div className="flex items-center justify-center gap-8 mt-10">
            <div
              onClick={() => {
                router.push("/");
              }}
            >
              <div className="group flex-row w-44 mx-auto">
                <div className="w-44 h-44 rounded-md flex imtems-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hiddem">
                  <Image
                    src="/images/default-blue.png"
                    alt="Profile"
                    title="Profile"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                  {user?.username}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Profiles;
