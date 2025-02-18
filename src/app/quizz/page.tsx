"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function QuizApp() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  // Fetch quizzes from the API
  useEffect(() => {
    axios
      .get("http://localhost:5002/getAllQuizz")
      .then((response) => {
        setQuizzes(response.data);
      })
      .catch((error) => {
        toast.error("Failed to load quizzes!");
      });
  }, []);

  // Handle next question
  const handleNext = () => {
    if (selectedOption === null) {
      toast.warning("Please select an answer!");
      return;
    }

    const currentQuiz = quizzes[currentQuestion];
    setUserAnswers([
      ...userAnswers,
      {
        question: currentQuiz.question,
        selected: selectedOption,
        correctAnswer: currentQuiz.answer,
        isCorrect: selectedOption === currentQuiz.answer,
      },
    ]);

    if (currentQuestion === quizzes.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
    setSelectedOption(null);
  };

  // Handle previous question
  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
    setSelectedOption(userAnswers[currentQuestion - 1]?.selected || null);
  };

  // Restart the quiz
  const handleRestart = () => {
    setUserAnswers([]);
    setCurrentQuestion(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  // Calculate the number of correct and incorrect answers
  const getCorrectAnswersCount = () => {
    return userAnswers.filter((answer) => answer.isCorrect).length;
  };

  const getIncorrectAnswersCount = () => {
    return userAnswers.filter((answer) => !answer.isCorrect).length;
  };

  if (quizzes.length === 0) {
    return <div className="text-center">Loading quizzes...</div>;
  }

  return (
    <div className="h-screen container mx-auto p-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg shadow-lg">
      <ToastContainer />

      {!showResult ? (
        <div className="quiz-card p-6 rounded-lg shadow-lg bg-white max-w-md mx-auto mt-24">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Question {currentQuestion + 1}
          </h2>
          <p className="text-lg mb-4">{quizzes[currentQuestion].question}</p>
          <div className="space-y-4">
            {quizzes[currentQuestion].options.map((option, idx) => (
              <div
                key={idx}
                className={`p-3 cursor-pointer rounded-md hover:bg-blue-200 transition-colors ${
                  selectedOption === option
                    ? "bg-blue-300 border-2 border-blue-500"
                    : ""
                }`}
                onClick={() => setSelectedOption(option)}
              >
                {option}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            {currentQuestion > 0 && (
              <button
                onClick={handlePrevious}
                className="px-4 py-2 bg-gray-300 text-black rounded-md transition-all hover:bg-gray-400"
              >
                Previous
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded-md transition-all hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="result-card p-6 rounded-lg shadow-lg bg-white max-w-md mx-auto ">
          <h2 className="text-3xl font-bold mb-4 text-center">Quiz Results</h2>
          <p className="text-lg mb-2">
            Correct Answers: {getCorrectAnswersCount()}
          </p>
          <p className="text-lg mb-2">
            Incorrect Answers: {getIncorrectAnswersCount()}
          </p>
          <div>
            {userAnswers.map((answer, idx) => (
              <div key={idx} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold">{answer.question}</p>
                <p
                  className={`text-sm ${
                    answer.isCorrect ? "text-green-500" : "text-red-500"
                  }`}
                >
                  Your Answer: {answer.selected}
                </p>
                <p className="text-sm text-gray-500">
                  Correct Answer: {answer.correctAnswer}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={handleRestart}
            className="mt-6 px-6 py-2 bg-green-500 text-white rounded-md transition-all hover:bg-green-600"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}
