import React, { useState } from "react";

const Testing = () => {
  const questions = [
    {
      id: 1,
      question:
        "Which data type is used to store a sequence of characters in Python?",
      options: ["List", "Tuple", "Set", "String"],
      correctAnswer: "String",
    },
    {
      id: 2,
      question: "Which type of Programming does Python support?",
      options: [
        "object-oriented programming",
        "structured programming",
        "functional programming",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      id: 3,
      question:
        "Which of the following is the correct extension of the Python file?",
      options: [".python", ".py", ".pl", ".p"],
      correctAnswer: ".py",
    },
    {
      id: 4,
      question:
        "Which of the following is used to define a block of code in Python language",
      options: ["Indention", "Key", "Brackets", "All of the above"],
      correctAnswer: "Indention",
    },
    {
      id: 5,
      question: "Who developed Python Programming Language?",
      options: [
        "Wick van Rossum",
        "Rasmus Lerdorf",
        "Guido van Rossum",
        "Niene Stom",
      ],
      correctAnswer: "Guido van Rossum",
    },
    {
      id: 6,
      question: "What will be the output of 3**2 in Python?",
      options: ["6", "9", "None of these", "Error"],
      correctAnswer: "9",
    },
    {
      id: 7,
      question: "Which of these is the definition for packages in Python?",
      options: [
        "A folder of python modules",
        "A set of main modules",
        "A number of files containing Python definitions and statements",
        "A file containing Python definitions and statements",
      ],
      correctAnswer: "A folder of python modules",
    },
    {
      id: 8,
      question:
        "What is the maximum possible length of an identifier in Python?",
      options: ["32", "16", "128", "No fixed length is specified"],
      correctAnswer: "No fixed length is specified",
    },
    {
      id: 9,
      question: "Which of the following concepts is not a part of Python?",
      options: [
        "Pointers",
        "Loops",
        "Dynamic Typing",
        "All are part of Python",
      ],
      correctAnswer: "Pointers",
    },
    {
      id: 10,
      question: "What is the method inside the class in python language?",
      options: ["Object", "Function", "Attribute", "Property"],
      correctAnswer: "Function",
    },
  ];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleQuestionClick = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  const handleOptionSelect = (optionIndex) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] =
      questions[currentQuestion].options[optionIndex];
    setSelectedAnswers(newAnswers);
  };

  const handleSubmitQuiz = () => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        totalScore++;
      }
    });
    setScore(totalScore);
    setShowResults(true);
  };

  if (showResults) {
    return (
      <div className="min-h-screen p-4 bg-gray-100">
        <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-blue-600">
            Quiz Results
          </h2>
          <p className="mb-4 text-xl">
            Your Score: {score}/{questions.length}
          </p>

          {/* Show detailed results */}
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={index} className="pb-4 border-b">
                <p className="font-semibold">{question.question}</p>
                <p className="text-green-600">
                  Correct Answer: {question.correctAnswer}
                </p>
                <p
                  className={`${
                    selectedAnswers[index] === question.correctAnswer
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Your Answer: {selectedAnswers[index] || "Not answered"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl p-4 mx-auto">
        {/* Header */}
        <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-blue-600">Quizly</h1>
          <div className="flex items-center justify-between mt-2">
            <span>
              Questions {currentQuestion + 1}/{questions.length}
            </span>
            <span>
              Timing - {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Question Card */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-lg font-semibold">
            Q.{currentQuestion + 1} {questions[currentQuestion].question}
          </h2>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`w-full p-3 text-left transition border rounded 
                  ${
                    selectedAnswers[currentQuestion] === option
                      ? "bg-blue-200 border-blue-500"
                      : "hover:bg-blue-50"
                  }`}
                onClick={() => handleOptionSelect(index)}
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
          >
            Previous
          </button>
          <div className="flex flex-wrap gap-2">
            {[...Array(questions.length)].map((_, i) => (
              <button
                key={i}
                className={`w-8 h-8 rounded ${
                  i === currentQuestion
                    ? "bg-blue-600 text-white"
                    : selectedAnswers[i] !== null
                    ? "bg-green-200"
                    : "bg-gray-200"
                }`}
                onClick={() => handleQuestionClick(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            disabled={currentQuestion === questions.length - 1}
            onClick={() => setCurrentQuestion((prev) => prev + 1)}
          >
            Next
          </button>
        </div>

        {/* Submit Button - only show when all questions are answered */}
        {selectedAnswers.every((answer) => answer !== null) && (
          <button
            className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
            onClick={handleSubmitQuiz}
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default Testing;
