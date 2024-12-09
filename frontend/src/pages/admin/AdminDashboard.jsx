import React, { useEffect, useMemo, useState } from "react";
import bg_img from "../../assets/admin_bg.svg";
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
  Pagination,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
  User,
} from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlineUserDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const url = "http://127.0.0.1:8000/admin";
  const getUser = sessionStorage.getItem("login_admin");
  const [candiData, setCandiData] = useState([]);
  const [page, setPage] = useState(1);
  const [actions, setActions] = useState("text_based");
  const [questionsData, setQuestionsData] = useState({
    category: '',
    question: '',
    options: {
      A: '',
      B: '',
      C: '',
      D: ''
    },
    answer: ''
  })
  const [questionSubmitting, setQuestionSubmitting] = useState(false)
  const rowsPerPage = 10;

  useEffect(() => {
    getCandidateInfo();
  }, []);

  const pages = Math.ceil(candiData.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return candiData.slice(start, end);
  }, [page, candiData]);

  const getCandidateInfo = async () => {
    try {
      const response = await axios.get(`${url}/UsersInfo`);
      // console.log(response.data.user_report);
      const data = response.data.user_report;
      setCandiData(data);
      // console.log("Candidate data", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("login_admin");
    navigate("/");
  };

  const handleAnalytics = (name, email, zone, exam_report) => {
    setTimeout(() => {
      navigate("/analytics", {
        state: {
          data: {
            full_name: name,
            email: email,
            zone: zone,
            report: exam_report,
          },
        },
      });
      // console.log("Full Name", name);
      // console.log("Email", email);
      // console.log("Zone", zone);
      // console.log("Exam Report", exam_report);
    }, 500);
  };

  const deleteUser = async (email) => {
    const confirmation = confirm("Do you really want to delete candidate");
    console.log(confirmation);
    if (confirmation) {
      try {
        const response = await axios.delete(`${url}/delete-user/${email}`);
        const resp_data = response.data.message;
        toast.success(`${resp_data}`);
        getCandidateInfo();
      } catch (error) {
        toast.error("Failed to delete user");
        console.log(error);
      }
    }
  };

  const dateConverstion = (d) => {
    const date = new Date(d);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits
    const month = String(date.getMonth()).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleTextQuestionInputChange = (e) => {
    const {name, value} = e.target
    if(name.startsWith('option')) {
      const key = name.split('-')[1] // Gets A, B, C, D
      setQuestionsData((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          [key]: value
        }
      }))
    }else{
      setQuestionsData((prev) => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleTextQuestionSubmit = async(e) => {
    e.preventDefault()
    setQuestionSubmitting(true)
    try {
      const Textquestions = {
        category: questionsData.category,
        quesiton: questionsData.question,
        options: {
          A: questionsData.options.A,
          B: questionsData.options.B,
          C: questionsData.options.C,
          D: questionsData.options.D
        },
        answer: questionsData.answer
      }
      const response = await axios.post(`${url}/add-question`, Textquestions)
      console.log(response.data)
      toast.success('Question added')
      setQuestionsData({
        category: '',
        question: '',
        options: {
          A: '',
          B: '',
          C: '',
          D: ''
        },
        answer: ''
      })
      setQuestionSubmitting(false)
    } catch (error) {
      toast.error('Error while submitting text based question')
      console.log(error);
    }
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <section
      className="flex flex-col w-screen h-screen overflow-y-auto bg-cover xl:overflow-hidden lg:overflow-hidden md:overflow-hidden sm:overflow-y-auto lg:bg-center md:bg-center sm:bg-none xl:bg-center xl:bg-cover md:bg-cover sm:bg-cover "
      style={{ backgroundImage: `url(${bg_img})` }}
    >
      <Toaster />
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
        <Button
          className="px-4 py-2 text-lg font-medium text-white bg-blue-500 rounded-md hover:b g-blue-400"
          onPress={onOpen}
        >
          Add Questions
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Questions</ModalHeader>
              <ModalBody>
                <div>
                  {/* Selection of question type */}
                  <div>
                    <h2>In which format does question is</h2>
                    <RadioGroup
                      defaultValue="text_based"
                      orientation="horizontal"
                      className="mt-3"
                    >
                      <Radio
                        value="text_based"
                        onChange={() => setActions("text_based")}
                      >
                        Text Based
                      </Radio>
                      <Radio
                        value="img_based"
                        onChange={() => setActions("img_based")}
                      >
                        Image Based
                      </Radio>
                    </RadioGroup>
                  </div>
                  {actions === "text_based" ? (
                    <div className="p-4">
                    <form onSubmit={handleTextQuestionInputChange}>
                      <div className="mb-4">
                        <label>Category</label>
                        <input
                          type="text"
                          name="category"
                          value={questionsData.category}
                          onChange={handleTextQuestionInputChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
              
                      <div className="mb-4">
                        <label>Question</label>
                        <textarea
                          name="question"
                          value={questionsData.question}
                          onChange={handleTextQuestionInputChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
              
                      <div className="mb-4">
                        <label>Options</label>
                        {Object.keys(questionsData.options).map((key) => (
                          <div key={key} className="mt-2">
                            <label>Option {key}</label>
                            <input
                              type="text"
                              name={`option-${key}`}
                              value={questionsData.options[key]}
                              onChange={handleTextQuestionInputChange}
                              className="w-full p-2 border rounded"
                            />
                          </div>
                        ))}
                      </div>
              
                      <div className="mb-4">
                        <label>Correct Answer</label>
                        <select
                          name="answer"
                          value={questionsData.answer}
                          onChange={handleTextQuestionInputChange}
                          className="w-full p-2 border rounded"
                        >
                          <option value="">Select correct option</option>
                          {Object.keys(questionsData.options).map((key) => (
                            <option key={key} value={questionsData.options[key]}>
                              Option {key}
                            </option>
                          ))}
                        </select>
                      </div>
              
                      <button
                        type="submit"
                        disabled={questionSubmitting}
                        className="px-4 py-2 text-white bg-blue-500 rounded"
                      >
                        {questionSubmitting ? 'Adding Question...' : 'Add Question'}
                      </button>
                    </form>
                  </div>
                  ) : (
                    <div>
                      <h1>Image based</h1>
                    </div>
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="px-6 mt-3">
        <p>The table shows the number of students appeared for the exam</p>
      </div>

      <div className="px-6 mt-3">
        <Table
          className="w-full"
          aria-label="Candidate examination data table"
          bottomContent={
            <div className="flex justify-center w-full">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[100px]",
          }}
        >
          <TableHeader>
            <TableColumn className="w-[10%] text-medium text-center">
              Sr. No.
            </TableColumn>
            <TableColumn className="w-[30%] text-medium text-center">
              Candidate Name
            </TableColumn>
            <TableColumn className="w-[12%] text-medium text-center">
              Exam Complition Date
            </TableColumn>
            <TableColumn className="w-[10%] text-medium text-center">
              Actions
            </TableColumn>
            <TableColumn className="w-[10%] text-medium text-center">
              Delete Candidate
            </TableColumn>
          </TableHeader>

          <TableBody items={items}>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">
                  {(page - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell className="text-center">{item.full_name}</TableCell>
                <TableCell className="text-center">
                  {item.exam_date === null ? (
                    <p>Not Completed</p>
                  ) : (
                    <p>{dateConverstion(item.exam_date)}</p>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {item.exam === "Completed" ? (
                    <p
                      className="cursor-pointer hover:text-blue-500 hover:transition-all hover:underline hover:ease-in-out hover:duration-75"
                      onClick={() =>
                        handleAnalytics(
                          item.full_name,
                          item.email,
                          item.zone,
                          item.exam_report
                        )
                      }
                    >
                      Show Analytics
                    </p>
                  ) : (
                    <p>----</p>
                  )}
                </TableCell>
                <TableCell className="flex justify-center">
                  <AiOutlineUserDelete
                    className="text-xl text-center hover:bg-red-500 hover:text-white hover:rounded-md hover:text-xl hover:mx-2 hover:py-0.5 hover:font-bold cursor-pointer"
                    title="Delete Candidate"
                    onClick={() => deleteUser(item.email)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default AdminDashboard;
