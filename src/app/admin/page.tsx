"use client";
import { useState, useEffect } from "react";
import { IoIosHome } from "react-icons/io";

import axios from "axios";
import Link from "next/link";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { TypingAnimation } from "@/components/magicui/typing-animation";

export default function Admin() {
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load the code from localStorage on component mount
  useEffect(() => {
    const storedCode = localStorage.getItem("generatedCode");
    if (storedCode) {
      setCode(storedCode); // Load the saved code from localStorage
    }
  }, []);

  // Function to fetch the generated code
  const handleGenerateCode = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://kahoot-backend-pi.vercel.app/generateCode"
      );
      const generatedCode = res.data.code; // Assuming the response contains a field `code`
      setCode(generatedCode);

      // Store the generated code in localStorage
      localStorage.setItem("generatedCode", generatedCode);
    } catch (err) {
      setError("Failed to generate code!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <NeonGradientCard className=" w-[450px] h-[390px] flex flex-col justify-center align-middle">
        <div className="flex justify-center gap-10 ">
          <TypingAnimation
            className="text-4xl font-bold text-center text-gray-800 mb-8"
            duration={300}
          >
            Admin
          </TypingAnimation>
          <Link href={"/"}>
            <IoIosHome size={40} />
          </Link>
        </div>
        <div className="space-y-6">
          <Link href="/admin/quizz">
            <div className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition duration-300 ease-in-out text-center cursor-pointer">
              Manage Quizzes
            </div>
          </Link>

          {error && (
            <p className="text-red-500 text-center font-medium">{error}</p>
          )}

          {code && (
            <div className="bg-slate-200 w-[300px] ml-12 p-6 rounded-lg flex flex-col items-center mt-8 space-x-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Generated Code:
              </h2>
              <TypingAnimation
                className=" pr-7 text-6xl text-gray-800"
                duration={400}
              >
                {code}
              </TypingAnimation>
            </div>
          )}
          <button
            onClick={handleGenerateCode}
            className={`w-[300px] ml-12 py-3 text-white rounded-xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 shadow-xl transition duration-300 ease-in-out ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Code"}
          </button>
        </div>
      </NeonGradientCard>
    </div>
  );
}
