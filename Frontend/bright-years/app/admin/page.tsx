"use client";
import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
import DashboardHero from "../components/Admin/sidebar/DashboardHero";

type Props = {};

const Page = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <AdminProtected>
        <Heading
          title="Bright Years - Admin"
          description="Bright Years is an elderlearning platform that supports lifelong learning."
          keywords="Bright Years, eLearning, Elderlearning, Lifelong learning"
        />

        <div className="flex h-min-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="w-[85%]">
              <DashboardHero isDashboard={true} />
            </div>
          )}
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
