"use client";
import React, { useState, useEffect } from "react";
import Loader from "@/app/components/Loader";
import CreateCourse from "@/app/components/Admin/Course/CreateCourse";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import DashboardHero from "@/app/components/Admin/sidebar/DashboardHero";
import Heading from "@/app/utils/Heading";

type Props = {};

const page = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <Heading
        title="Bright Years - Admin"
        description="Bright Years is an elderlearnig platform that supports lifelong learning."
        keywords="Bright Years, eLearning, Elderlearning, Lifelong learning"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        {isLoading ? (
          <Loader /> // Show the loader while loading
        ) : (
          <div className="w-[85%]">
            <DashboardHero />
            <CreateCourse />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
