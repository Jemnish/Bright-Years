"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ/FAQ";
import Loader from "../components/Loader";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3);
  const [route, setRoute] = useState("Login");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulated delay
  }, []);

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Heading
            title="FAQ - Bright Years"
            description="Bright Years is an elderlearning platform that supports lifelong learning."
            keywords="Bright Years, eLearning, Elderlearning, Lifelong learning"
          />
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
            setRoute={setRoute}
            route={route}
          />
          <br />
          <FAQ />
          <br />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Page;
