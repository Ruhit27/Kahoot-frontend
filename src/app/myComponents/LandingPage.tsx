"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const LandingPage = () => {
  const [gameCodes, setGameCodes] = useState<{ code: string }[]>([]);
  const [inputCode, setInputCode] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✅
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5002/codes")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched game codes:", data);
        setGameCodes(data);
      })
      .catch((error) => console.error("Error fetching game codes:", error));
  }, []);

  const handleJoinGame = () => {
    console.log(typeof inputCode);
    const isValidCode = gameCodes.some((item) => item.code === inputCode);

    if (isValidCode) {
      setIsLoading(true);
      setTimeout(() => {
        router.push("/quizz");
      }, 1500);
    } else {
      alert("Invalid game code. Please try again.");
      setInputCode("");
    }
  };

  return (
    <div
      className={`h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col justify-center items-center text-black transition-opacity ${
        isLoading ? "opacity-0" : "opacity-100"
      } duration-1000`}
    >
      {/* Login and Signup Buttons */}
      <div className="absolute top-6 right-6 flex gap-4">
        <Link
          href={"/login"}
          className="px-6 py-2 bg-transparent border-2 border-white text-white rounded-md hover:bg-white hover:text-black transition duration-300"
        >
          Login
        </Link>
      </div>

      {/* Main Content */}
      <div className="bg-white w-[30%] h-56 p-10 flex rounded-xl flex-col justify-center">
        <h1 className="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 via-purple-600 to-yellow-300 bg-clip-text text-transparent">
          PyQuIzZ
        </h1>

        <input
          type="text"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          placeholder="Enter game code"
          className="px-4 py-2 rounded text-black mb-4 border border-black"
        />
        <div className="flex justify-center">
          <button
            onClick={handleJoinGame}
            className="w-1/2 px-6 py-2 rounded-md bg-gradient-to-r from-pink-500 to-black text-white hover:opacity-90 transition-transform transform hover:scale-105"
          >
            {isLoading ? "Joining..." : "Join Game"}
          </button>
        </div>
      </div>
    </div>
  );
};
