"use client";

import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Loader from "../Loader";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const Hero: FC<Props> = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, isLoading } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data) {
      setTitle(data.layout?.banner?.title || "Welcome to Bright Years,");
      setSubTitle(
        data.layout?.banner?.subTitle ||
          "Discover a world of learning designed just for you!"
      );
      setImage(data.layout?.banner?.image?.url || "/assets/budi_aimia.png");
    }
  }, [data]);

  return (
    <div className="relative w-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="relative flex flex-col md:flex-row items-center justify-center w-full px-4 md:px-8 lg:px-16 py-16">
          <div className="relative z-10 max-w-sm md:max-w-md">
            <Image
              src={require("../../../public/assets/budi_aimia.png")}
              alt="Bright Years Hero"
              width={400}
              height={400}
              className="object-contain mx-auto"
            />
          </div>

          {/* Text Content */}
          <div className="relative z-10 mt-8 md:mt-0 text-center md:text-left flex flex-col items-center md:items-start space-y-4">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white">
              {title}
            </h1>
            <p className="text-sm md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-md">
              {subTitle}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
