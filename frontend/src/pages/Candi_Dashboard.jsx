import React from "react";
import logo from "../assets/logo.svg";
import bg_img from "../assets/candidate_bg.svg";
// import bg_circle from '../assets/bg_circle.svg'
import { IoCalendarOutline } from "react-icons/io5";
import status_logo from "../assets/status_logo.svg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import {
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import footer_logo from '../assets/Footer_logo.svg'

const Candi_Dashboard = () => {
  const getUser = localStorage.getItem("sign_up_user_email");
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('sign_up_user_email')
    navigate('/')
  }
  const navigateExamPage = () => {
    navigate('/exam')
  }
  return (
    <section className="flex flex-col w-screen h-screen overflow-y-auto bg-cover xl:overflow-hidden lg:overflow-hidden md:overflow-hidden sm:overflow-y-auto lg:bg-center md:bg-center sm:bg-none xl:bg-center xl:bg-cover md:bg-cover sm:bg-cover " style={{ backgroundImage: `url(${bg_img})`}}>

      {/* Navbar */}
      <nav className="flex justify-between w-full p-3 bg-white border-b-2 gap-x-1">
        <div className="flex gap-x-2">
          <img src={logo} alt="" className="w-[60%]" />
          <h2 className="text-2xl font-bold">Quizly</h2>
        </div>

        <Dropdown>
          <DropdownTrigger className="">
            <button>
              <FaUser />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem>
              <User
                name="Jane Doe"
                description={`${getUser}`}
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                }}
              />
            </DropdownItem>
            <DropdownItem>
            <Divider />
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              onClick={handleLogout}
            >
              <p className="flex items-center gap-x-2">
                <RiLogoutBoxRLine className="text-lg"/>
                <span>LogOut</span>
              </p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </nav>

      {/* Dashboard */}
      <h2 className="mt-6 text-2xl font-semibold text-center">Dashboard</h2>
      <div className="p-6 bg-white xl:w-[60%] lg:w-[70%] md:w-[80%] sm:w-[90%] w-auto xl:mx-auto lg:mx-auto md:mx-auto sm:mx-auto mx-5 flex flex-col items-center justify-center mt-6 rounded-lg shadow-lg gap-y-4">
        {/* Exam Card*/}
        <div className="flex flex-col items-center justify-center text-center border-4 border-gray-300 gap-y-4 xl:w-[45%] lg:w-[55%] md:w-[65%] sm:w-[75%] w-full xl:mx-3 lg:mx-4 md:mx-5 sm:mx-6 mx-8 mt-1 pb-4 rounded-md">
          <h2 className="mt-3 text-3xl font-semibold">Internship Exam</h2>
          <button className="p-2 font-medium bg-green-300 rounded-md cursor-pointer w-fit text hover:bg-green-200" onClick={navigateExamPage}>
            Start Exam
          </button>
          <Divider className="w-[90%]" />
          <h3 className="font-semibold">Details</h3>

          {/* Details */}
          <div className="flex flex-col w-full px-6 gap-y-3">
            <div className="flex justify-between w-auto lg:w-auto md:w-auto sm:w-auto">
              <div className="flex gap-x-2">
                <IoCalendarOutline className="text-[130%]" />
                <p>Date</p>
              </div>
              <p>03/08/2024</p>
            </div>
            <div className="flex justify-between w-auto lg:w-auto md:w-auto sm:w-auto">
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

          <ol type="1" className="list-decimal list-inside">
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
              atque.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
              atque.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
              atque.
            </li>
          </ol>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-center mb-3 mt-7 xl:mt-auto lg:mt-4 md:mt-5 sm:mt-6">
        <img src={footer_logo} alt="footer_logo" className="xl:w-[14%] lg:w-[18%] md:w-[22%] sm:w-[26%] w-[40%]"/>
      </div>
    </section>
  );
};

export default Candi_Dashboard;
