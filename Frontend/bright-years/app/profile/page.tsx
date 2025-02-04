"use client";

import React, { FC, useState, useEffect } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import Profile from "../components/Profile/Profile";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

type Props = {};

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen">
          <Protected>
            <Heading
              title={`${user?.name} profile - LMS`}
              description="Elearning is a prlatform for student to learn and get help from teachers"
              keywords="Programming, MERN, Redux, Machine Learning"
            />
            <Header
              open={open}
              setOpen={setOpen}
              activeItem={activeItem}
              setRoute={setRoute}
              route={route}
            />
            <Profile user={user} />
            <Footer />
          </Protected>
        </div>
      )}
    </>
  );
};

export default Page;
