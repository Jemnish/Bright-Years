"use client";
import React, { useState, useEffect } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import About from "./About";
import Footer from "../components/Footer";
import How from "../components/How/How";
import Loader from "../components/Loader";

type Props = {};

const Page = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [route, setRoute] = useState("Login");

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 10);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title="About Us - Bright Years"
            description="Bright Years is an elderlearnig platform that supports lifelong learning."
            keywords="Bright Years, eLearning, Elderlearning, Lifelong learning"
          />
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
            setRoute={setRoute}
            route={route}
          />
          <About />
          <How />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Page;
