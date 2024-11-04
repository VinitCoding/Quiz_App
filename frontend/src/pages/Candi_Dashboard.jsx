import React from "react";
import logo from "../assets/logo.svg";
import bg_img from "../assets/candidate_bg.svg";
// import bg_circle from '../assets/bg_circle.svg'
import { Separator } from "@chakra-ui/react";
import { IoCalendarOutline } from "react-icons/io5";
import status_logo from "../assets/status_logo.svg";

const Candi_Dashboard = () => {
  return (
    <section className="bg-gradient-to-t from-[#c8e3ff] to-slate-50 w-screen h-screen overflow-hidden">
      {/* Bg_elements img */}
      <div className="relative">
        <img src={bg_img} alt="" className="absolute w-screen" />
      </div>

      {/* Navbar */}
      <nav className="flex w-full p-3 bg-white border-b-2 gap-x-1">
        <img src={logo} alt="" className="w-[3%]" />
        <h2 className="text-3xl font-bold">Quizly</h2>
      </nav>

      {/* Dashboard */}
      <h2 className="mt-6 text-2xl font-semibold text-center">Dashboard</h2>
      <div className="p-6 left-[45%] bg-white w-[60%] mx-auto flex flex-col items-center justify-center mt-6 rounded-lg shadow-lg gap-y-4">
        {/* Exam Card*/}
        <div className="flex flex-col items-center justify-center text-center border-4 border-gray-300 gap-y-4 w-[45%] mx-3 mt-1 pb-4 rounded-md">
          <h2 className="mt-3 text-3xl font-semibold">Internship Exam</h2>
          <button className="w-[14%] bg-green-300 text font-medium py-2 rounded-md mt-5  cursor-pointer absolute">
            Start Exam
          </button>
          <Separator className="border-[0.2px] border-gray-500 w-[60%] my-3" />
          <h3 className="font-semibold">Details</h3>

          {/* Details */}
          <div className="mt-3">
            <div className="flex w-full bg-white gap-x-32">
              <div className="flex gap-x-2">
                <IoCalendarOutline className="text-[130%]" />
                <p>Date</p>
              </div>
              <p>03/08/2024</p>
            </div>
            <div className="flex w-full mt-3 bg-white gap-x-32">
              <div className="flex gap-x-2">
                <img src={status_logo} alt="date_img" />
                <p>Status</p>
              </div>
              <p>Completed</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="flex flex-col w-full">
          <div>
            <h2 className="text-xl font-semibold">Exam Rules</h2>
          </div>

          <ul className="text-start">
            <li className="ml-2">
              1. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse,
              nam.
            </li>
            <li className="ml-2">
              2. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse,
              nam.
            </li>
            <li className="ml-2">
              3. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse,
              nam.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Candi_Dashboard;
