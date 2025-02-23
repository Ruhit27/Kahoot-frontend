"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

export default function AdminQuestionCard() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://kahoot-backend-pi.vercel.app/getAllQuizz"
      );
      setQuizzes(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch quizzes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleDelete = async (_id) => {
    try {
      setIsDeleting(_id);
      setError(null);
      setSuccessMessage(null);

      await axios.delete(`http://localhost:5002/deleteQuizz/${_id}`);

      // Immediately update local state without re-fetching
      setQuizzes((prev) => prev.filter((quiz) => quiz._id !== _id));

      // Show success message
      setSuccessMessage("Quiz deleted successfully");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      setError("Failed to delete quiz. Please try again.");
    } finally {
      setIsDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-48"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
            <div className="h-4 bg-gray-200 rounded w-52"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-gray-900">Quiz Management</h1>
          <span className="text-sm text-gray-500">
            Total Quizzes: {quizzes.length}
          </span>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 group relative"
            >
              <div className="p-2">
                <div className="relative">
                  <button
                    onClick={() => handleDelete(quiz._id)}
                    disabled={isDeleting === quiz._id}
                    className={`absolute right-0 top-0 opacity-80 group-hover:opacity-100 transition-opacity duration-200 
                      ${
                        isDeleting === quiz._id
                          ? "cursor-not-allowed opacity-50"
                          : "hover:text-red-600"
                      }`}
                    aria-label="Delete quiz"
                  >
                    <Trash2
                      className={`h-5 w-5 ${
                        isDeleting === quiz._id ? "animate-pulse" : ""
                      }`}
                    />
                  </button>
                  <h2 className="text-lg font-semibold text-gray-900 pr-8 line-clamp-2 mb-4">
                    {quiz.question}
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    {quiz.options.map((option, idx) => (
                      <div
                        key={`${quiz._id}-option-${idx}`}
                        className="p-2 rounded-md bg-gray-50 text-sm text-gray-700"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Correct Answer: {quiz.answer}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
