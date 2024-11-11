import {
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useNavbar,
  User,
} from "@nextui-org/react";
import React from "react";
import { FaUser } from "react-icons/fa";
import logo from "../assets/logo.svg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const ExamPage = () => {
  const getUser = localStorage.getItem("sign_up_user_email");
  const navigate = useNavigate("/");
  const handleLogout = () => {
    // localStorage.removeItem("sign_up_user_email");
    navigate("/candidate_dashboard");
  };
  return (
    <section className="w-screen h-screen bg-[#E0EFFF]">
      {/* Nav */}
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
                <RiLogoutBoxRLine className="text-lg" />
                <span>End Exam</span>
              </p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col gap-y-10">
        {/* No. of Questions and timer section */}
        <div className="flex justify-between pt-4 mx-6">
          <div className="bg-dark-blue text-white px-3 py-2.5 w-fit rounded-md font-medium">
            Questions 1 / 25
          </div>

          <div className="bg-dark-blue text-white px-3 py-2.5 w-fit rounded-md font-medium">
            Time Remaining - 00:00
          </div>
        </div>

        {/* Questions with options*/}
        <div className="flex flex-col justify-center p-6 mx-auto bg-white rounded-md shadow-md w-fit">
          <p className="text-lg font-semibold">
            Q.1 Which data type is used to store a sequence of characters in
            Python?
          </p>
          <ol className="flex flex-col mt-3 list-inside gap-y-5">
            <li className="px-2 py-1 border-[0.6px] border-black rounded-md text-lg cursor-pointer">
              List
            </li>
            <li className="px-2 py-1 border-[0.6px] border-black rounded-md text-lg">
              Tuple
            </li>
            <li className="px-2 py-1 border-[0.6px] border-black rounded-md text-lg">
              Set
            </li>
            <li className="px-2 py-1 border-[0.6px] border-black rounded-md text-lg">
              String
            </li>
          </ol>
        </div>

        {/* Previous and next button */}
        <div className="flex justify-between mx-20">
          <button className="bg-[#CAB123] px-4 py-1.5 font-medium text-white rounded-md">
            Previous
          </button>
          <button className="bg-[#3B9F3B] px-6 py-1.5 font-medium text-white rounded-md">
            Next
          </button>
        </div>

        {/* Question numbers */}
        <div className="flex flex-wrap justify-center w-full px-6 py-4 bg-white gap-y-4">
          {/* Category 5 */}
            <ul className="flex flex-wrap mt-2  max-w-[65%] justify-center gap-6">
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                1
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                2
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                3
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                4
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                5
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                6
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                7
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                8
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                9
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                10
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                11
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                12
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                13
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                14
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                15
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                16
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                17
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                18
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                19
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                20
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                21
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                22
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                23
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                24
              </li>
              <li className="border-[0.6px] rounded hover:cursor-pointer border-black text-center px-3 py-0.5">
                25
              </li>
            </ul>
        </div>
      </div>
    </section>
  );
};

export default ExamPage;
