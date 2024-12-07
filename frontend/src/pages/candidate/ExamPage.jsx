import {
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import logo from "../../assets/logo.svg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import chistats_logo from "../../assets/chistats_logo.svg";

const ExamPage = () => {
  const getUser = sessionStorage.getItem("login_user");
  const [questions, setQuestions] = useState([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalQuestionNumber, setTotalQuestionNumber] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [submitQuiz, setSubmitQuiz] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [showToast, setShowToast] = useState(false)
  const navigate = useNavigate("/");
  const toastTimerRef = useRef()

  const getReport = async () => {
    // Ensure all questions are stored, even if unanswered
    const allAnswers = { ...selectedAnswer };
    questions.forEach((category, catIndex) => {
      category.questions.forEach((question, qIndex) => {
        const categoryName = category.name;
        if (!allAnswers[categoryName]) {
          allAnswers[categoryName] = {};
        }
        if (!allAnswers[categoryName][`question${qIndex}`]) {
          allAnswers[categoryName][`question${qIndex}`] = {
            questionIndex: qIndex,
            selectedOption: 'null', // Indicate unanswered
            question: question.question,
            answer: 'null',
            type: question.type,
          };
        }
      });
    });
  
    try {
      const response = await axios.post(`${URL}/submit`, {
        username: getUser,
        category_info: allAnswers,
      });
  
      if (!response) {
        toast.error("Something went wrong");
      }
      const isFullscreenSupported = document.fullscreenEnabled !== undefined;
      setTimeout(() => {
        setTimeout(() => {
          navigate("/report", { state: { data: response.data.zone } });
          if (isFullscreenSupported && document.fullscreenElement) {
            document.exitFullscreen();
          }
        }, 3000);
        toast.success("Quiz submitted successfully...");
        sessionStorage.setItem("quiz_submitted", true);
        console.log(allAnswers);
        setSubmitQuiz(true);
      }, 500);
  
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    getReport();
    sessionStorage.removeItem('login_user')
    sessionStorage.removeItem('quiz_submitted')
  };
  const URL = "http://127.0.0.1:8000/exam";

  // We try to get the questions through API
  const getQuestions = async () => {
    try {
      const response = await axios.get(`${URL}/quiz`);
      setQuestions(response.data.categories);
    } catch (error) {
      console.log("Error while fetching data", error);
    }
  };

  useEffect(() => {
    getQuestions();
    setSubmitQuiz(false);
  }, []);

  // Timer functions
  useEffect(() => {
    const interval = setInterval(() => {
      // Decrease the seconds if greater than 0
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      // When seconds reach 0, decrease minutes if greater than 0
      if (seconds === 0) {
        if (minutes === 0) {
          // Stop the countdown when both seconds and minutes are 0
          clearInterval(interval);
          getReport();
        } else {
          // Reset seconds to 59 and decrease minutes by 1
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      // cleanup functions = Stop the interval when component is unmounts
      clearInterval(interval);
    };
  }, [seconds]); // Re-run this effects whenever the seconds is changed
  
  useEffect(() => {
    const enterFullscreen = () => {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    };

    enterFullscreen();

    const handleKeyPress = (event) => {
      if (
        event ||
        (event.ctrlKey && event.key === "r") ||
        (event.ctrlKey && event.key === "c") ||
        (event.ctrlKey && event.key === "x")
      ) {
        event.preventDefault();
        if(!showToast){
          toast.error("Don't press any keys from keyboard");
          setShowToast(true)

          toastTimerRef.current = setTimeout(() => {
            setShowToast(false)
          }, 2000)
        }
      }
    };

    const handleAltTab = (event) => {
      if (event.altKey && event.key === "Tab") {
        
        event.preventDefault(); // Prevent Alt + Tab
        getReport(); // Navigate to dashboard
      }
    };

    // const handleRightClick = (event) => {
    //   event.preventDefault(); // Prevent context menu
    // };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        const showAlert = confirm('Do you really want to submit exam...')
        if(showAlert === true){
          getReport();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keydown", handleAltTab);
    // window.addEventListener("contextmenu", handleRightClick); // Block right-click
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keydown", handleAltTab);
      // window.removeEventListener("contextmenu", handleRightClick);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);

      // Clean up the timer functions
      if(toastTimerRef.current){
        clearTimeout(toastTimerRef.current)
      }
    };
  }, [navigate, showToast]);

  const getTotalQuestionCount = (upToCategory) => {
    let count = 0;
    for (let i = 0; i < upToCategory; i++) {
      count += questions[i].questions.length;
    }
    return count;
  };

  const handleNext = () => {
    const currentCategory = questions[currentCategoryIndex];
    if (currentQuestionIndex < currentCategory.questions.length - 1) {
      // If there are more questions in current category, go to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTotalQuestionNumber(totalQuestionNumber + 1);
    } else if (currentCategoryIndex < questions.length - 1) {
      // If we're at last question of category, go to next category
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentQuestionIndex(0);
      setTotalQuestionNumber(totalQuestionNumber + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      // If not at first question of category, go to previous question
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTotalQuestionNumber(totalQuestionNumber - 1);
    } else if (currentCategoryIndex > 0) {
      // If at first question of category, go to previous category's last question
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      setCurrentQuestionIndex(
        questions[currentCategoryIndex - 1].questions.length - 1
      );
      setTotalQuestionNumber(totalQuestionNumber - 1);
    }
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentCategory = questions[currentCategoryIndex];
  const currentQuestion = currentCategory.questions[currentQuestionIndex];

  const isLastQuestion = () => {
    return (
      currentCategoryIndex === questions.length - 1 &&
      currentQuestionIndex ===
        questions[currentCategoryIndex].questions.length - 1
    );
  };

  const handleOptionSelect = (optionKey) => {
    const categoryName = currentCategory.name;

    setSelectedAnswer({
      ...selectedAnswer,
      [categoryName]: {
        ...selectedAnswer[categoryName],
        [`question${currentQuestionIndex}`]: {
          questionIndex: currentQuestionIndex,
          selectedOption: optionKey,
          question: currentQuestion.question,
          answer: optionKey,
          type: currentQuestion.type,
        },
      },
    });

    setAnsweredQuestions({
      ...answeredQuestions,
      [`${currentCategoryIndex}-${currentQuestionIndex}`]: true,
    });
  };

  const handleQuestionSelect = (categoryIndex, questionIndex) => {
    setCurrentCategoryIndex(categoryIndex);
    setCurrentQuestionIndex(questionIndex);
    setTotalQuestionNumber(
      getTotalQuestionCount(categoryIndex) + questionIndex + 1
    );
  };

  // Add this function to calculate total questions across all categories
  const getTotalQuestions = () => {
    return questions.reduce((total, category) => {
      return total + category.questions.length;
    }, 0);
  };

  return (
    <section className="w-screen h-screen bg-[#E0EFFF] overflow-y-auto">
      <Toaster />
      {/* Nav */}
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
                  <span>End Exam</span>
                </p>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <img src={chistats_logo} alt="" className="w-[64%]" />
        </div>
      </nav>

      {/* Main Body */}
      <div className="flex ">
        {/* Left Side */}
        <div className="h-[91vh] bg-gray-50 w-[19vw] flex flex-col">
          {/* Pagination */}
          <div className="flex flex-col w-full gap-4 p-4 mt-6  py-[1.8%] ">
            {questions.map((category, catIndex) => (
              <div key={`category-${catIndex}`} className="">
                <h3 className="mb-2 font-semibold">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.questions.map((_, qIndex) => {
                    const questionNumber =
                      getTotalQuestionCount(catIndex) + qIndex + 1;
                    const isActive =
                      catIndex === currentCategoryIndex &&
                      qIndex === currentQuestionIndex;
                    const isAnswered =
                      answeredQuestions[`${catIndex}-${qIndex}`];

                    return (
                      <button
                        key={`question-${catIndex}-${qIndex}`}
                        onClick={() => handleQuestionSelect(catIndex, qIndex)}
                        className={`w-8 h-8 rounded-full ${
                          isActive
                            ? "bg-blue-400 text-white"
                            : isAnswered
                            ? "bg-green-500 text-white" // Answered questions will be green
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        {questionNumber}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <Divider className="my-6" />
          {/* Navigation Buttons */}
          <div className="flex flex-col items-center justify-center w-full gap-4 px-6 mt-6">
            <button
              onClick={handlePrevious}
              disabled={
                currentCategoryIndex === 0 && currentQuestionIndex === 0
              }
              className={`bg-[#CAB123] px-8 py-1.5 font-medium text-white rounded-md w-fit ${
                currentCategoryIndex === 0 && currentQuestionIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Previous
            </button>
            {isLastQuestion() ? (
              <button
                onClick={getReport}
                className="bg-[#3B9F3B] px-10 py-1.5 font-medium text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed w-fit"
                disabled={submitQuiz}
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-[#3B9F3B] px-12 py-1.5 font-medium text-white rounded-md w-fit"
              >
                Next
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full">
          {/* Question and Timer */}
          <div className="flex justify-between w-full px-3 pt-4">
            <p className="bg-dark-blue text-white px-3 py-2.5 w-fit rounded-md font-medium">
              Questions{" "}
              <span className="font-extrabold">
                {totalQuestionNumber} / {getTotalQuestions()}
              </span>
            </p>

            <p className="bg-dark-blue text-white px-3 py-2.5 w-fit rounded-md font-medium">
              Time Remaining -{" "}
              <span className="font-extrabold">
                {minutes < 10 ? ` 0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </span>
            </p>
          </div>
          {/* Main Content */}
          <div className="flex items-center justify-center mx-auto overflow-y-auto">
            {currentQuestion.type === "text based" ? (
              <div className="flex flex-col p-6 mx-auto mt-[16%] overflow-y-auto bg-white rounded-md shadow-md h-fit w-fit">
                <p className="text-lg font-semibold">
                  Q.{totalQuestionNumber} {currentQuestion.question}
                </p>
                {/* For text based questions */}
                <ol className="flex flex-col mt-3 list-inside gap-y-5">
                  {Object.entries(currentQuestion.options).map(
                    ([key, value]) => {
                      const categoryName = currentCategory.name;
                      const isSelected =
                        selectedAnswer[categoryName]?.[
                          `question${currentQuestionIndex}`
                        ]?.selectedOption === key;

                      return (
                        <li
                          key={`option-${key}`}
                          onClick={() => handleOptionSelect(key)}
                          className={`px-2 py-1 border-[0.6px] border-black rounded-md text-base cursor-pointer 
                                      ${
                                        isSelected
                                          ? "bg-green-600 text-white font-semibold"
                                          : "hover:bg-gray-100"
                                      }
                                      transition-colors duration-200`}
                        >
                          {key}. {value}
                        </li>
                      );
                    }
                  )}
                </ol>
              </div>
            ) : (
              <div className="flex flex-col p-6 mx-6 mt-3 overflow-y-auto bg-white rounded-md shadow-md h-fit">
                <p className="text-lg font-semibold text-left"></p>
                <div className="w-full h-auto overflow-y-auto bg-gray-200 max-h-[40vh] ">
                  <img
                    src={`data:image/png;base64,${currentQuestion.question}`}
                    alt="Question"
                    className="object-contain w-full h-auto"
                  />
                </div>
                {/* For image based questions - same change */}
                <ol className="flex flex-col mt-3 list-inside gap-y-5">
                  {Object.entries(currentQuestion.options).map(
                    ([key, value]) => {
                      const categoryName = currentCategory.name;
                      const isSelected =
                        selectedAnswer[categoryName]?.[
                          `question${currentQuestionIndex}`
                        ]?.selectedOption === key;

                      return (
                        <li
                          key={`option-${key}`}
                          onClick={() => handleOptionSelect(key)}
                          className={`px-2 py-1 border-[0.6px] border-black rounded-md text-base cursor-pointer 
                                      ${
                                        isSelected
                                          ? "bg-green-600 text-white font-semibold"
                                          : "hover:bg-gray-100"
                                      }
                                      transition-colors duration-200`}
                        >
                          {key}. {value}
                        </li>
                      );
                    }
                  )}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamPage;

// import {
//   Divider,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
//   User,
// } from "@nextui-org/react";
// import React, { useEffect, useRef, useState } from "react";
// import { FaUser } from "react-icons/fa";
// import logo from "../../assets/logo.svg";
// import { RiLogoutBoxRLine } from "react-icons/ri";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import chistats_logo from "../../assets/chistats_logo.svg";

// const ExamPage = () => {
//   const getUser = sessionStorage.getItem("login_user");
//   const [questions, setQuestions] = useState([]);
//   const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [totalQuestionNumber, setTotalQuestionNumber] = useState(1);
//   const [selectedAnswer, setSelectedAnswer] = useState({});
//   const [submitQuiz, setSubmitQuiz] = useState(false);
//   const [answeredQuestions, setAnsweredQuestions] = useState({});
//   const [minutes, setMinutes] = useState(10);
//   const [seconds, setSeconds] = useState(0);
//   const [showToast, setShowToast] = useState(false);
//   const navigate = useNavigate("/");
//   const toastTimerRef = useRef();

//   const getReport = async () => {
//     // Ensure all questions are stored, even if unanswered
//     const allAnswers = { ...selectedAnswer };
//     questions.forEach((category, catIndex) => {
//       category.questions.forEach((question, qIndex) => {
//         const categoryName = category.name;
//         if (!allAnswers[categoryName]) {
//           allAnswers[categoryName] = {};
//         }
//         if (!allAnswers[categoryName][`question${qIndex}`]) {
//           allAnswers[categoryName][`question${qIndex}`] = {
//             questionIndex: qIndex,
//             selectedOption: null, // Indicate unanswered
//             question: question.question,
//             answer: null,
//             type: question.type,
//           };
//         }
//       });
//     });

//     try {
//       const response = await axios.post(`${URL}/submit`, {
//         username: getUser,
//         category_info: allAnswers,
//       });

//       if (!response) {
//         toast.error("Something went wrong");
//       }
//       const isFullscreenSupported = document.fullscreenEnabled !== undefined;
//       setTimeout(() => {
//         setTimeout(() => {
//           navigate("/report", { state: { data: response.data.zone } });
//           if (isFullscreenSupported && document.fullscreenElement) {
//             document.exitFullscreen();
//           }
//         }, 3000);
//         toast.success("Quiz submitted successfully...");
//         sessionStorage.setItem("quiz_submitted", true);
//         console.log(allAnswers);
//         setSubmitQuiz(true);
//       }, 500);

//       console.log(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleLogout = () => {
//     getReport();
//   };
//   const URL = "http://127.0.0.1:8000/exam";

//   // We try to get the questions through API
//   const getQuestions = async () => {
//     try {
//       const response = await axios.get(`${URL}/quiz`);
//       setQuestions(response.data.categories);
//     } catch (error) {
//       console.log("Error while fetching data", error);
//     }
//   };

//   useEffect(() => {
//     getQuestions();
//     setSubmitQuiz(false);
//   }, []);

//   // Timer functions
//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Decrease the seconds if greater than 0
//       if (seconds > 0) {
//         setSeconds(seconds - 1);
//       }

//       // When seconds reach 0, decrease minutes if greater than 0
//       if (seconds === 0) {
//         if (minutes === 0) {
//           // Stop the countdown when both seconds and minutes are 0
//           clearInterval(interval);
//           getReport();
//         } else {
//           // Reset seconds to 59 and decrease minutes by 1
//           setSeconds(59);
//           setMinutes(minutes - 1);
//         }
//       }
//     }, 1000);

//     return () => {
//       // cleanup functions = Stop the interval when component is unmounts
//       clearInterval(interval);
//     };
//   }, [seconds]); // Re-run this effects whenever the seconds is changed

//   useEffect(() => {
//     const enterFullscreen = () => {
//       const elem = document.documentElement;
//       if (elem.requestFullscreen) {
//         elem.requestFullscreen();
//       } else if (elem.mozRequestFullScreen) {
//         elem.mozRequestFullScreen();
//       } else if (elem.webkitRequestFullscreen) {
//         elem.webkitRequestFullscreen();
//       } else if (elem.msRequestFullscreen) {
//         elem.msRequestFullscreen();
//       }
//     };

//     enterFullscreen();

//     const handleKeyPress = (event) => {
//       if (
//         event ||
//         (event.ctrlKey && event.key === "r") ||
//         (event.ctrlKey && event.key === "c") ||
//         (event.ctrlKey && event.key === "x")
//       ) {
//         event.preventDefault();
//         if (!showToast) {
//           toast.error("Don't press any keys from keyboard");
//           setShowToast(true);

//           toastTimerRef.current = setTimeout(() => {
//             setShowToast(false);
//           }, 2000);
//         }
//       }
//     };

//     const handleAltTab = (event) => {
//       if (event.altKey && event.key === "Tab") {
//         event.preventDefault(); // Prevent Alt + Tab
//         getReport(); // Navigate to dashboard
//       }
//     };

//     // const handleRightClick = (event) => {
//     //   event.preventDefault(); // Prevent context menu
//     // };

//     const handleFullscreenChange = () => {
//       if (!document.fullscreenElement) {
//         const showAlert = confirm("Do you really want to submit exam...");
//         if (showAlert === true) {
//           getReport();
//         }
//       }
//     };

//     window.addEventListener("keydown", handleKeyPress);
//     window.addEventListener("keydown", handleAltTab);
//     // window.addEventListener("contextmenu", handleRightClick); // Block right-click
//     document.addEventListener("fullscreenchange", handleFullscreenChange);

//     return () => {
//       window.removeEventListener("keydown", handleKeyPress);
//       window.removeEventListener("keydown", handleAltTab);
//       // window.removeEventListener("contextmenu", handleRightClick);
//       document.removeEventListener("fullscreenchange", handleFullscreenChange);

//       // Clean up the timer functions
//       if (toastTimerRef.current) {
//         clearTimeout(toastTimerRef.current);
//       }
//     };
//   }, [navigate, showToast]);

//   const getTotalQuestionCount = (upToCategory) => {
//     let count = 0;
//     for (let i = 0; i < upToCategory; i++) {
//       count += questions[i].questions.length;
//     }
//     return count;
//   };

//   const handleNext = () => {
//     const currentCategory = questions[currentCategoryIndex];
//     if (currentQuestionIndex < currentCategory.questions.length - 1) {
//       // If there are more questions in current category, go to next question
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setTotalQuestionNumber(totalQuestionNumber + 1);
//     } else if (currentCategoryIndex < questions.length - 1) {
//       // If we're at last question of category, go to next category
//       setCurrentCategoryIndex(currentCategoryIndex + 1);
//       setCurrentQuestionIndex(0);
//       setTotalQuestionNumber(totalQuestionNumber + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       // If not at first question of category, go to previous question
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//       setTotalQuestionNumber(totalQuestionNumber - 1);
//     } else if (currentCategoryIndex > 0) {
//       // If at first question of category, go to previous category's last question
//       setCurrentCategoryIndex(currentCategoryIndex - 1);
//       setCurrentQuestionIndex(
//         questions[currentCategoryIndex - 1].questions.length - 1
//       );
//       setTotalQuestionNumber(totalQuestionNumber - 1);
//     }
//   };

//   if (questions.length === 0) {
//     return <div>Loading questions...</div>;
//   }

//   const currentCategory = questions[currentCategoryIndex];
//   const currentQuestion = currentCategory.questions[currentQuestionIndex];

//   const isLastQuestion = () => {
//     return (
//       currentCategoryIndex === questions.length - 1 &&
//       currentQuestionIndex ===
//         questions[currentCategoryIndex].questions.length - 1
//     );
//   };

//   const handleOptionSelect = (optionKey) => {
//     const categoryName = currentCategory.name;

//     setSelectedAnswer({
//       ...selectedAnswer,
//       [categoryName]: {
//         ...selectedAnswer[categoryName],
//         [`question${currentQuestionIndex}`]: {
//           questionIndex: currentQuestionIndex,
//           selectedOption: optionKey,
//           question: currentQuestion.question,
//           answer: optionKey,
//           type: currentQuestion.type,
//         },
//       },
//     });

//     setAnsweredQuestions({
//       ...answeredQuestions,
//       [`${currentCategoryIndex}-${currentQuestionIndex}`]: true,
//     });
//   };

//   const handleQuestionSelect = (categoryIndex, questionIndex) => {
//     setCurrentCategoryIndex(categoryIndex);
//     setCurrentQuestionIndex(questionIndex);
//     setTotalQuestionNumber(
//       getTotalQuestionCount(categoryIndex) + questionIndex + 1
//     );
//   };

//   // Add this function to calculate total questions across all categories
//   const getTotalQuestions = () => {
//     return questions.reduce((total, category) => {
//       return total + category.questions.length;
//     }, 0);
//   };

//   return (
//     <section className="w-screen h-screen bg-[#E0EFFF] overflow-y-auto">
//       <Toaster />
//       {/* Nav */}
//       <nav className="flex justify-between w-full p-3 bg-white border-b-2 gap-x-1">
//         <div className="flex gap-x-2">
//           <img src={logo} alt="" className="w-[60%]" />
//           <h2 className="text-2xl font-bold">Quizly</h2>
//         </div>

//         <div className="flex justify-between w-fit">
//           <Dropdown>
//             <DropdownTrigger className="">
//               <button className="p-2 bg-gray-200 rounded-full">
//                 <FaUser />
//               </button>
//             </DropdownTrigger>
//             <DropdownMenu aria-label="Static Actions">
//               <DropdownItem>
//                 <User name={`${getUser}`} />
//               </DropdownItem>
//               <DropdownItem>
//                 <Divider />
//               </DropdownItem>
//               <DropdownItem
//                 key="delete"
//                 className="text-danger"
//                 color="danger"
//                 onClick={handleLogout}
//               >
//                 <p className="flex items-center gap-x-2">
//                   <RiLogoutBoxRLine className="text-lg" />
//                   <span>End Exam</span>
//                 </p>
//               </DropdownItem>
//             </DropdownMenu>
//           </Dropdown>

//           <img src={chistats_logo} alt="" className="w-[64%]" />
//         </div>
//       </nav>

//       {/* Main Body */}
//       <div className="flex ">
//         {/* Left Side */}
//         <div className="h-[91vh] bg-gray-50 w-[19vw] flex flex-col">
//           {/* Pagination */}
//           <div className="flex flex-col w-full gap-4 p-4 mt-6  py-[1.8%] ">
//             {questions.map((category, catIndex) => (
//               <div key={`category-${catIndex}`} className="">
//                 <h3 className="mb-2 font-semibold">{category.name}</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {category.questions.map((_, qIndex) => {
//                     const questionNumber =
//                       getTotalQuestionCount(catIndex) + qIndex + 1;
//                     const isActive =
//                       catIndex === currentCategoryIndex &&
//                       qIndex === currentQuestionIndex;
//                     const isAnswered =
//                       answeredQuestions[`${catIndex}-${qIndex}`];

//                     return (
//                       <button
//                         key={`question-${catIndex}-${qIndex}`}
//                         onClick={() => handleQuestionSelect(catIndex, qIndex)}
//                         className={`w-8 h-8 rounded-full ${
//                           isActive
//                             ? "bg-blue-400 text-white"
//                             : isAnswered
//                             ? "bg-green-500 text-white" // Answered questions will be green
//                             : "bg-gray-200 hover:bg-gray-300"
//                         }`}
//                       >
//                         {questionNumber}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <Divider className="my-6" />
//           {/* Navigation Buttons */}
//           <div className="flex flex-col items-center justify-center w-full gap-4 px-6 mt-6">
//             <button
//               onClick={handlePrevious}
//               disabled={
//                 currentCategoryIndex === 0 && currentQuestionIndex === 0
//               }
//               className={`bg-[#CAB123] px-8 py-1.5 font-medium text-white rounded-md w-fit ${
//                 currentCategoryIndex === 0 && currentQuestionIndex === 0
//                   ? "opacity-50 cursor-not-allowed"
//                   : ""
//               }`}
//             >
//               Previous
//             </button>
//             {isLastQuestion() ? (
//               <button
//                 onClick={getReport}
//                 className="bg-[#3B9F3B] px-10 py-1.5 font-medium text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed w-fit"
//                 disabled={submitQuiz}
//               >
//                 Submit
//               </button>
//             ) : (
//               <button
//                 onClick={handleNext}
//                 className="bg-[#3B9F3B] px-12 py-1.5 font-medium text-white rounded-md w-fit"
//               >
//                 Next
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="flex flex-col w-full">
//           {/* Question and Timer */}
//           <div className="flex justify-between w-full px-3 pt-4">
//             <p className="bg-dark-blue text-white px-3 py-2.5 w-fit rounded-md font-medium">
//               Questions{" "}
//               <span className="font-extrabold">
//                 {totalQuestionNumber} / {getTotalQuestions()}
//               </span>
//             </p>

//             <p className="bg-dark-blue text-white px-3 py-2.5 w-fit rounded-md font-medium">
//               Time Remaining -{" "}
//               <span className="font-extrabold">
//                 {minutes < 10 ? ` 0${minutes}` : minutes}:
//                 {seconds < 10 ? `0${seconds}` : seconds}
//               </span>
//             </p>
//           </div>
//           {/* Main Content */}
//           <div className="flex items-center justify-center mx-auto overflow-y-auto">
//             {currentQuestion.type === "text based" ? (
//               <div className="flex flex-col p-6 mx-auto mt-[16%] overflow-y-auto bg-white rounded-md shadow-md h-fit w-fit">
//                 <p className="text-lg font-semibold">
//                   Q.{totalQuestionNumber} {currentQuestion.question}
//                 </p>
//                 {/* For text based questions */}
//                 <ol className="flex flex-col mt-3 list-inside gap-y-5">
//                   {Object.entries(currentQuestion.options).map(
//                     ([key, value]) => {
//                       const categoryName = currentCategory.name;
//                       const isSelected =
//                         selectedAnswer[categoryName]?.[
//                           `question${currentQuestionIndex}`
//                         ]?.selectedOption === key;

//                       return (
//                         <li
//                           key={`option-${key}`}
//                           onClick={() => handleOptionSelect(key)}
//                           className={`px-2 py-1 border-[0.6px] border-black rounded-md text-base cursor-pointer 
//                                       ${
//                                         isSelected
//                                           ? "bg-green-600 text-white font-semibold"
//                                           : "hover:bg-gray-100"
//                                       }
//                                       transition-colors duration-200`}
//                         >
//                           {key}. {value}
//                         </li>
//                       );
//                     }
//                   )}
//                 </ol>
//               </div>
//             ) : (
//               <div className="flex flex-col p-6 mx-6 mt-3 overflow-y-auto bg-white rounded-md shadow-md h-fit">
//                 <p className="text-lg font-semibold text-left"></p>
//                 <div className="w-full h-auto overflow-y-auto bg-gray-200 max-h-[40vh] ">
//                   <img
//                     src={`data:image/png;base64,${currentQuestion.question}`}
//                     alt="Question"
//                     className="object-contain w-full h-auto"
//                   />
//                 </div>
//                 {/* For image based questions - same change */}
//                 <ol className="flex flex-col mt-3 list-inside gap-y-5">
//                   {Object.entries(currentQuestion.options).map(
//                     ([key, value]) => {
//                       const categoryName = currentCategory.name;
//                       const isSelected =
//                         selectedAnswer[categoryName]?.[
//                           `question${currentQuestionIndex}`
//                         ]?.selectedOption === key;

//                       return (
//                         <li
//                           key={`option-${key}`}
//                           onClick={() => handleOptionSelect(key)}
//                           className={`px-2 py-1 border-[0.6px] border-black rounded-md text-base cursor-pointer 
//                                       ${
//                                         isSelected
//                                           ? "bg-green-600 text-white font-semibold"
//                                           : "hover:bg-gray-100"
//                                       }
//                                       transition-colors duration-200`}
//                         >
//                           {key}. {value}
//                         </li>
//                       );
//                     }
//                   )}
//                 </ol>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ExamPage;
