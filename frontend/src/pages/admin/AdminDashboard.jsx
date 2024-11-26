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
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
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
        <button className="px-3.5 py-2 font-semibold text-white bg-blue-500 rounded-md text-medium">
          Scheduled Test
        </button>
      </div>

      <div className="px-6 mt-3">
        <p>The table shows the number of students appeared for the exam</p>
      </div>

      <div className="px-6 mt-3">
        <Table className="w-full">
          <TableHeader>
            <TableColumn className="w-[10%] text-medium">Sr. No.</TableColumn>
            <TableColumn className="w-[40%] text-medium">Candidate Name</TableColumn>
            <TableColumn className="w-[12%] text-medium">Exam Complition Date</TableColumn>
            <TableColumn className="w-[10%] text-medium">Actions</TableColumn>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>1.</TableCell>
              <TableCell>Ajay Verma</TableCell>
              <TableCell>20/11/2024</TableCell>
              <TableCell onClick={() => handleAnalytics('Ajay Verma')} className="hover:cursor-pointer hover:underline hover:text-blue-700">Show Analytics</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2.</TableCell>
              <TableCell>Abhishek Desai</TableCell>
              <TableCell>Not completed</TableCell>
              <TableCell>----</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3.</TableCell>
              <TableCell>Shahaji Naik</TableCell>
              <TableCell>20/11/2024</TableCell>
              <TableCell onClick={() => handleAnalytics('Shahaji Naik')} className="hover:cursor-pointer hover:underline hover:text-blue-700">Show Analytics</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>4.</TableCell>
              <TableCell>Dinkar Patil</TableCell>
              <TableCell>Not completed</TableCell>
              <TableCell>----</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default AdminDashboard;
