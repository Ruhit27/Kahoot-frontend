"use client";
import { useState, useEffect } from "react";
import { IoIosHome } from "react-icons/io";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { deleteCookie } from "cookies-next";

export default function QuizApp() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const logoutFromQuiz = () => {
    deleteCookie("hasAccess");
  };

  useEffect(() => {
    axios
      .get("https://kahoot-backend-pi.vercel.app/getAllQuizz")
      .then((response) => {
        setQuizzes(response.data);
      })
      .catch(() => {
        toast.error("Failed to load quizzes!");
      });
  }, []);

  const handleNext = () => {
    if (selectedOption === null) {
      toast.warning("Please select an answer!");
      return;
    }

    setShowAnswer(true);
  };

  const handleContinue = () => {
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
      setSelectedOption(null);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
    setSelectedOption(userAnswers[currentQuestion - 1]?.selected || null);
    setShowAnswer(false);
  };

  const handleRestart = () => {
    setUserAnswers([]);
    setCurrentQuestion(0);
    setShowResult(false);
    setSelectedOption(null);
    setShowAnswer(false);
  };

  if (quizzes.length === 0) {
    return <div className="text-center">Loading quizzes...</div>;
  }

  return (
    <div className="h-screen">
      <Link className="flex justify-end mr-20" href={"/"}>
        <IoIosHome onClick={logoutFromQuiz} size={40} />
      </Link>
      <ToastContainer />

      {!showResult ? (
        <div className="flex justify-center align-middle">
          <NeonGradientCard className="quiz-card rounded-lg max-w-md mx-auto mt-32">
            <h2 className="text-2xl font-bold mb-4 text-left border border-b-2 border-black py-2 px-4 w-max">
              Question {currentQuestion + 1}
            </h2>
            <p className="text-lg mb-4">{quizzes[currentQuestion].question}</p>
            <div className="space-y-4">
              {quizzes[currentQuestion].options.map((option, idx) => (
                <div
                  key={idx}
                  className={`p-3 cursor-pointer rounded-md border border-b-2 border-black py-2 px-4 hover:bg-blue-200 transition-colors ${
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

            {showAnswer && (
              <div className="mt-4 p-3 rounded-md border border-black bg-gray-100">
                {selectedOption === quizzes[currentQuestion].answer ? (
                  <p className="text-green-500 font-bold">Correct!</p>
                ) : (
                  <p className="text-red-500 font-bold">
                    Incorrect! Correct answer:{" "}
                    <span className="text-black font-semibold">
                      {quizzes[currentQuestion].answer}
                    </span>
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-between mt-6">
              {currentQuestion > 0 && (
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md transition-all hover:bg-gray-400"
                >
                  Previous
                </button>
              )}

              {showAnswer ? (
                <button
                  onClick={handleContinue}
                  className="px-4 py-2 bg-green-500 text-white rounded-md transition-all hover:bg-green-600"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md transition-all hover:bg-blue-600"
                >
                  Next
                </button>
              )}
            </div>
          </NeonGradientCard>
        </div>
      ) : (
        <NeonGradientCard className="result-card rounded-lg h-min max-w-md mx-auto mt-2">
          <h2 className="text-3xl font-bold mb-4 text-center">Quiz Results</h2>
          <p className="text-lg mb-2">
            Correct Answers:{" "}
            {userAnswers.filter((answer) => answer.isCorrect).length}
          </p>
          <p className="text-lg mb-2">
            Incorrect Answers:{" "}
            {userAnswers.filter((answer) => !answer.isCorrect).length}
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
        </NeonGradientCard>
      )}
    </div>
  );
}
