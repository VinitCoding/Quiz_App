import React from "react";
import bg_img from "../assets/bg_rectangle.svg";
import underline from "../assets/underline.svg";
import online_test from "../assets/online_test_bg.svg";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import chistats_logo from '../assets/chistats_logo.svg'

const LandingPage = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/auth");
  };
  return (
    <section className="bg-gradient-to-t from-[#c8e3ff] to-slate-50 w-screen h-screen overflow-hidden flex flex-col">
      {/* Bg-img */}
      <div className="relative">
        <img src={bg_img} alt="" className="absolute lg:w-full xl:w-screen" />
      </div>

      {/* Navbar */}
      <nav className="w-[92.6%] p-3 flex justify-between items-center">
        <div className="flex gap-x-1">
          <img src={logo} alt="" className="" />
          <h2 className="text-3xl font-bold">Quizly</h2>
        </div>

        <div>
            <img src={chistats_logo} alt="company_logo" className="w-[90%] " />
        </div>
      </nav>

      {/* Title */}
      <div className="relative flex justify-center mx-auto text-center lg:mt-6">
        <h1 className="w-[65%] text-5xl lg:leading-[120%] md:leading-[80%] z-10">
          Challenge Your Knowledge and Elevate Your Skills on{" "}
          <span className="font-semibold">Quizly</span>
        </h1>
        <img
          src={underline}
          alt="underline_img"
          className="absolute lg:top-[80.5%] md:top-[79%] lg:right-[32.6%] w-[11%]"
        />
      </div>

      {/* About */}
      <div className="flex justify-center mx-auto text-center lg:mt-5 md:mt-3">
        <p className="w-[50%] text-lg font-normal">
          <span className="font-medium">Quizly</span> is an interactive quiz app
          that lets you test your knowledge across various topics while having
          fun. Complete each quiz and get instant feedback, with a personalized
          scorecard displayed at the end to track your performance.
        </p>
      </div>

      {/* Button */}
      <div className="relative mx-auto mt-4">
        <button
          className="bg-dark-blue text-white px-4 py-1.5 rounded text-lg font-medium shadow-md shadow-blue-400 hover:shadow-none cursor-pointer absolute"
          onClick={handleNavigate}
        >
          Login
        </button>
      </div>

      <div className="flex justify-center mx-auto mt-3">
        <img src={online_test} alt="" className="lg:w-[58%] " />
      </div>
    </section>
  );
};

export default LandingPage;
