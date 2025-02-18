"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

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
      const res = await axios.post("http://localhost:5002/generateCode");
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
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
      <div className="container mx-auto p-6 bg-white shadow-xl rounded-xl max-w-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Admin Panel
        </h1>

        <div className="space-y-6">
          <Link href="/admin/quizz">
            <div className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition duration-300 ease-in-out text-center cursor-pointer">
              Manage Quizzes
            </div>
          </Link>

          <button
            onClick={handleGenerateCode}
            className={`w-full py-3 text-white rounded-xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 shadow-xl transition duration-300 ease-in-out ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Code"}
          </button>

          {error && (
            <p className="text-red-500 text-center font-medium">{error}</p>
          )}

          {code && (
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Generated Code:
              </h2>
              <pre className="bg-gray-200 p-4 rounded-md overflow-x-auto text-sm text-gray-800">
                {code}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
