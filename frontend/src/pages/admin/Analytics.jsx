import React from "react";
import logo from "../../assets/logo.svg";
import chistats_logo from "../../assets/chistats_logo.svg";
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
  User,
} from "@nextui-org/react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import GaugeChart from "react-gauge-chart";

const Analytics = () => {
  const location = useLocation();
  const { data } = location.state;
  const navigate = useNavigate();
  const getUser = sessionStorage.getItem("login_admin");
  const handleDashboard = () => {
    navigate("/admin_dashboard");
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <section className="w-screen h-screen overflow-x-hidden bg-blue-50 ">
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
                onClick={handleDashboard}
              >
                <p className="flex items-center gap-x-2">
                  <RiLogoutBoxRLine className="text-lg" />
                  <span>Admin Dashboard</span>
                </p>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <img src={chistats_logo} alt="" className="w-[64%]" />
        </div>
      </nav>

      {/* Candidate Info */}
      <div className="px-6 py-3">
        <h3 className="text-lg font-semibold">Information of Candidate</h3>
        <div className="flex items-center justify-between">
          <div className="flex mt-3 gap-x-10">
            <div className="flex items-center gap-x-6">
              <h3 className="font-medium text-medium">Name</h3>
              <p className="px-3 py-1 bg-white rounded shadow text-medium">
                {data}
              </p>
            </div>
            <div className="flex items-center gap-x-6">
              <h3 className="font-medium text-medium">Email</h3>
              <p className="px-3 py-1 bg-white rounded shadow text-medium w-fit">
                teswdawdawdadawdat@gmail.com
              </p>
            </div>
          </div>

          <div className="">
            <Button
              onPress={onOpen}
              className="px-4 py-1 text-base font-medium text-white bg-blue-400 rounded-md"
            >
              See Score
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalBody>
                      {/* Report Card */}
                      <div className="w-full">
                        <div className="mt-4 text-center">
                          <h3 className="text-lg font-semibold">Score card</h3>
                        </div>

                        {/* Gauge chart */}
                        <div className="flex justify-center mt-4">
                          <div className="w-[45%] ">
                            <GaugeChart
                              id="gauge-chart3"
                              nrOfLevels={3}
                              colors={["#FF0000", "#FFA500", "#4CAF50"]} // Red, Yellow, Green
                              arcWidth={0.3}
                              percent={0.5} // Dynamically set the percent value
                              textColor={"black"}
                              //   needleColor="transparent"
                              hideText={true}
                              cornerRadius={0}
                              animDelay={50}
                              animate={true}
                            />
                          </div>
                        </div>

                        <Divider className="my-4" />

                        {/* Summary of Questions */}
                        <div className="flex flex-col my-4 gap-y-3">
                          <div className="flex justify-between px-4">
                            <h4 className="text-lg">
                              Total Number of Questions
                            </h4>
                            <h4 className="text-lg">25</h4>
                          </div>
                          <div className="flex justify-between px-4">
                            <h4 className="text-lg">
                              Total Number of Questions Attempted
                            </h4>
                            <h4 className="text-lg">20</h4>
                          </div>
                          <div className="flex justify-between px-4">
                            <h4 className="text-lg">
                              Total number of right questions from attempted one
                            </h4>
                            <h4 className="text-lg">15</h4>
                          </div>
                          <div className="flex justify-between px-4">
                            <h4 className="text-lg">
                              Total number of wrong questions from attempted one
                            </h4>
                            <h4 className="text-lg">5</h4>
                          </div>
                        </div>

                        <Divider className="my-4" />

                        {/* Zone */}
                        <div className="flex justify-between px-4 my-4">
                          <h3 className="text-lg">Zone</h3>
                          <h3 className="font-semibold text-[#FFA500] text-large">
                            Yellow
                          </h3>
                        </div>
                      </div>
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>

      {/* Analysis */}
      <div className="flex flex-col mx-6">
        {/* Questions and Answers */}
        <div className="w-full py-3">
          <h2 className="text-lg font-semibold ">Total Questions</h2>
        </div>
        <div className="bg-[#DCECFF] max-h-[70vh] overflow-y-auto w-full scrollbar-custom">
          <div className="flex flex-col items-center justify-center mt-5 gap-y-4">
            <div className="p-3 bg-white rounded-md w-fit">
              <h1 className="font-medium">
                Q.1. Which data type is used to store a sequence of characters
                in Python?
              </h1>
              <ul>
                <li className="pl-1 py-0.5 mt-2 rounded border-[0.3px] border-gray-400">
                  List
                </li>
                <li className="pl-1 py-0.5 mt-3 rounded border-[0.3px] border-gray-400 bg-red-100">
                  Tuple
                </li>
                <li className="pl-1 py-0.5 mt-3 rounded border-[0.3px] border-gray-400">
                  Set
                </li>
                <li className="pl-1 py-0.5 mt-3 rounded border-[0.3px] border-gray-400 bg-green-100">
                  String
                </li>
              </ul>
            </div>
            <div className="p-3 bg-white rounded-md w-fit">
              <h1 className="font-medium">
                Q.2. Which data type is used to store a sequence of characters
                in Python?
              </h1>
              <ul>
                <li className="pl-1 py-0.5 mt-2 rounded border-[0.3px] border-gray-400">
                  List
                </li>
                <li className="pl-1 py-0.5 mt-3 rounded border-[0.3px] border-gray-400">
                  Tuple
                </li>
                <li className="pl-1 py-0.5 mt-3 rounded border-[0.3px] border-gray-400">
                  Set
                </li>
                <li className="pl-1 py-0.5 mt-3 rounded border-[0.3px] border-gray-400 bg-green-100">
                  String
                </li>
              </ul>
            </div>
            <div className="p-3 bg-white rounded-md w-fit">
              <h1 className="font-medium">
                Q.3. Which data type is used to store a sequence of characters
                in Python?
              </h1>
              <ul>
                <li className="pl-1 py-0.5 mt-2 rounded border-[0.3px] border-gray-400">
                  List
                </li>
                <li className="pl-1 py-0.5 mt-3 rounded border-[0.3px] border-gray-400">
                  Tuple
                </li>
                <li className="pl-1 py-0.5 mt-3 rounded border-[0.3px] border-gray-400">
                  Set
                </li>
                <li className="pl-1 py-0.5 mt-3 rounded border-[0.3px] border-gray-400 bg-green-100">
                  String
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
