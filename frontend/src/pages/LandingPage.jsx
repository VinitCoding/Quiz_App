import React from "react";
// import bg_img from "../assets/bg_rectangle.svg";
import bg_img from "../assets/Landing_page.svg";
import underline from "../assets/underline.svg";
import online_test from "../assets/online_test_bg.svg";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import chistats_logo from "../assets/chistats_logo.svg";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/auth");
  };
  return (
    <section
      className="w-screen h-screen overflow-y-auto bg-cover xl:overflow-hidden lg:overflow-hidden md:overflow-y-auto sm:overflow-y-auto lg:bg-center md:bg-center sm:bg-none xl:bg-center xl:bg-cover md:bg-cover sm:bg-cover "
      style={{ backgroundImage: `url(${bg_img})`}}
    >
      {/* Navbar */}
      <nav className="xl:w-[91.6%] xl:shadow-none lg:shadow-lg md:shadow-lg sm:shadow-lg shadow-lg lg:w-full md:w-full w-full xl:backdrop-blur-none lg:backdrop-blur-md md:backdrop-blur-lg sm:backdrop-blur backdrop-blur-md xl:bg-transparent  p-3 flex justify-between items-center xl:flex lg:flex md:flex sm:fixed fixed z-20">
        <div className="flex gap-x-1">
          <img src={logo} alt="" className="" />
          <h2 className="text-3xl font-bold">Quizly</h2>
        </div>

        <div>
          <img src={chistats_logo} alt="company_logo" className="w-[90%] " />
        </div>
      </nav>

      {/* Title */}
      <div className="relative flex justify-center mx-auto mt-32 text-center xl:mt-20 lg:mt-20 md:mt-24 sm:mt-28">
        <h1 className="xl:w-[65%] lg:w-[70%] md:w-auto sm:w-auto w-auto  text-5xl sm:text-5xl xl:leading-[120%] lg:leading-[140%] md:leading-[120%] sm:leading-[130%] leading-[120%] z-10 lg:mx-0 md:mx-6 sm:mx-6 mx-6">
          Challenge Your Knowledge and Elevate Your Skills on{" "}
          <span className="font-semibold">Quizly</span>
        </h1>
        <img
          src={underline}
          alt="underline_img"
          className="absolute xl:top-[80.5%] xl:right-[37.6%] lg:hidden md:hidden sm:hidden hidden xl:block w-[11%]"
        />
      </div>

      {/* About */}
      <div className="flex justify-center mx-auto mt-5 text-center lg:mt-5 md:mt-6 sm:mt-5 ">
        <p className="lg:w-[50%] md:w-[80%] sm:w-full w-full lg:mx-0 md:mx-4 sm:mx-6 mx-6 text-lg font-normal">
          <span className="font-medium">Quizly</span> is an interactive quiz app
          that lets you test your knowledge across various topics while having
          fun. Complete each quiz and get instant feedback, with a personalized
          scorecard displayed at the end to track your performance.
        </p>
      </div>

      {/* Button */}
      <div className="flex justify-center mt-4 ">
        <button
          className="bg-dark-blue text-white px-4 py-1.5 rounded text-lg font-medium shadow-md shadow-blue-400 hover:shadow-none cursor-pointer  "
          onClick={handleNavigate}
        >
          Login
        </button>
      </div>

      {/* Image */}
      <div className="flex justify-center">
        <img src={online_test} alt="" className="lg:w-[25%] " />
      </div>
    </section>
  );
};

export default LandingPage;
