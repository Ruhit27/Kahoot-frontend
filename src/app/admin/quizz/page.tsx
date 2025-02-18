"use client";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminQuestionCard from "@/app/myComponents/AdminQuestionCard";

const QuizAdmin = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || options.some((opt) => !opt) || !answer) {
      toast.warn("⚠️ All fields are required!", { position: "top-right" });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5002/createQuizz", {
        question,
        options,
        answer,
      });

      if (response.status === 201) {
        toast.success("✅ Quiz Created Successfully!", {
          position: "top-right",
        });
        setQuestion("");
        setOptions(["", "", "", ""]);
        setAnswer("");
        window.location.reload();
      }
    } catch (error) {
      toast.error("❌ Error Creating Quiz. Try again.", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
        <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] md:w-[50%]">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Admin Quiz Creator
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Question Input */}
            <label className="block text-lg font-medium text-gray-700">
              Question:
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter quiz question"
            />

            {/* Options */}
            <div className="mt-4">
              <label className="block text-lg font-medium text-gray-700">
                Options:
              </label>
              {options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500"
                  placeholder={`Option ${index + 1}`}
                />
              ))}
            </div>

            {/* Correct Answer Selection */}
            <div className="mt-4">
              <label className="block text-lg font-medium text-gray-700">
                Correct Answer:
              </label>
              <select
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Correct Answer</option>
                {options.map((opt, index) => (
                  <option key={index} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              {loading ? "Submitting..." : "Create Quiz"}
            </button>
          </form>
        </div>
        {/* Toast Container */}
        <ToastContainer />
      </div>
      <AdminQuestionCard quizzes={quizzes} setQuizzes={setQuizzes} />
    </div>
  );
};

export default QuizAdmin;
