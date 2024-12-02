import React from "react";
import bg_img from "../../assets/admin_bg.svg";
import logo from "../../assets/logo.svg";
import chistats_logo from "../../assets/chistats_logo.svg";
import {
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate()
  const getUser = sessionStorage.getItem("login_admin");
  const handleLogout = () => {
    sessionStorage.removeItem("login_admin");
    navigate("/");
  };

  const handleAnalytics = (name) => {
    setTimeout(() => {
      navigate('/analytics', {state: {data: name}})
    }, 500)
  }
  return (
    <section
      className="flex flex-col w-screen h-screen overflow-y-auto bg-cover xl:overflow-hidden lg:overflow-hidden md:overflow-hidden sm:overflow-y-auto lg:bg-center md:bg-center sm:bg-none xl:bg-center xl:bg-cover md:bg-cover sm:bg-cover "
      style={{ backgroundImage: `url(${bg_img})` }}
    >
      {/* Navbar */}
      <nav className="flex justify-between w-full p-3 bg-white border-b-2 gap-x-1">
        <div className="flex gap-x-2">
          <img src={logo} alt="" className="w-[60%]" />
          <h2 className="text-2xl font-bold">Quizly</h2>
        </div>

        <div className="flex justify-between w-fit">
          <Dropdown>
            <DropdownTrigger className="">
              <button className="p-2 bg-gray-200 rounded-full">
                <FaUser />
              </button>
            </DropdownTrigger >
            <DropdownMenu aria-label="User Actions">
              <DropdownItem>
                <User name={`${getUser}`} />
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
                  <span>Logout</span>
                </p>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <img src={chistats_logo} alt="" className="w-[64%]" />
        </div>
      </nav>

      {/* Content */}
      <div className="flex justify-between px-6 mt-6">
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
      </div>

      <div className="px-6 mt-3">
        <p>The table shows the number of students appeared for the exam</p>
      </div>

      <div className="px-6 mt-3">
        <Table className="w-full">
          <TableHeader>
            <TableColumn className="w-[10%] text-medium text-center">Sr. No.</TableColumn>
            <TableColumn className="w-[40%] text-medium text-center">Candidate Name</TableColumn>
            <TableColumn className="w-[12%] text-medium text-center">Exam Complition Date</TableColumn>
            <TableColumn className="w-[10%] text-medium text-center">Actions</TableColumn>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="text-center">1.</TableCell>
              <TableCell className="text-center">Ajay Verma</TableCell>
              <TableCell className="text-center">20/11/2024</TableCell>
              <TableCell onClick={() => handleAnalytics('Ajay Verma')} className="text-center hover:cursor-pointer hover:underline hover:text-blue-700">Show Analytics</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">2.</TableCell>
              <TableCell className="text-center">Abhishek Desai</TableCell>
              <TableCell className="text-center">Not completed</TableCell>
              <TableCell className="text-center">----</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">3.</TableCell>
              <TableCell className="text-center">Shahaji Naik</TableCell>
              <TableCell className="text-center">20/11/2024</TableCell>
              <TableCell onClick={() => handleAnalytics('Shahaji Naik')} className="text-center hover:cursor-pointer hover:underline hover:text-blue-700">Show Analytics</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">4.</TableCell>
              <TableCell className="text-center">Dinkar Patil</TableCell>
              <TableCell className="text-center">Not completed</TableCell>
              <TableCell className="text-center">----</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default AdminDashboard;
