"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import pythonLogo from "@/app/assets/python-logo-svg.svg";
import Image from "next/image";

export const LandingPage = () => {
  const [gameCodes, setGameCodes] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBounce(true);
      setTimeout(() => setBounce(false), 800);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("https://kahoot-backend-pi.vercel.app/codes")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched game codes:", data);
        setGameCodes(data);
      })
      .catch((error) => console.error("Error fetching game codes:", error));

    // Check if the user is logged in
    setIsAuthenticated(getCookie("isAuthenticated") === "true");
  }, []);

  const handleJoinGame = () => {
    const isValidCode = gameCodes.some((item) => item.code === inputCode);

    if (isValidCode) {
      setCookie("hasAccess", "true", { maxAge: 600 });
      setIsLoading(true);
      setTimeout(() => {
        console.log("landingPage");
        router.push("/quizz");
        setIsLoading(false);
      }, 1500);
    } else {
      alert("Invalid game code. Please try again.");
      setInputCode("");
    }
  };

  const handleLogout = () => {
    deleteCookie("isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <div
      className={`h-screen bg-white flex flex-col justify-center items-center text-black transition-opacity ${
        isLoading ? "opacity-0" : "opacity-100"
      } duration-1000`}
    >
      {/* Login and Logout Button */}
      <div className="absolute top-6 right-6 flex gap-8 mr-5">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-transparent border-2 border-red-500 text-black rounded-md hover:bg-red-500 hover:text-white transition duration-300 hover:scale-125"
          >
            Logout
          </button>
        ) : (
          <Link
            href={"/login"}
            className="px-6 py-2 bg-transparent border-2 border-[#0020dd] text-black rounded-md hover:bg-[#0020dd] hover:text-white transition duration-300 hover:scale-125"
          >
            Login
          </Link>
        )}

        <Link
          href={"/admin"}
          className="px-6 py-2 bg-transparent border-2 border-[#0020dd] text-black rounded-md hover:bg-[#0020dd] hover:text-white transition duration-300 hover:scale-125"
        >
          Admin Panel
        </Link>
        <Link
          href={"/about"}
          className="px-6 py-2 bg-transparent border-2 border-[#0020dd] text-black rounded-md hover:bg-[#0020dd] hover:text-white transition duration-300 hover:scale-125"
        >
          About
        </Link>
      </div>

      {/* Main Content */}
      <NeonGradientCard className="w-[350px] h-[290px] flex flex-col justify-center align-middle">
        <Image
          src={pythonLogo}
          alt="python Image"
          className="w-10 absolute top-10 left-10"
        />
        <TypingAnimation
          className="mt-3 ml-7 text-5xl font-bold text-center mb-5 bg-gradient-to-r from-[#0020dd] via-[#ab00a9] to-[#cc0000] bg-clip-text text-transparent"
          duration={200}
        >
          PyQuIzZ
        </TypingAnimation>

        <input
          type="text"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          placeholder="Enter game code"
          className="px-10 ml-5 mt-3 py-2 rounded text-black mb-4 border border-black"
        />
        <div className="flex justify-center">
          <button
            onClick={handleJoinGame}
            className="w-1/2 px-6 mt-5 py-2 rounded-md bg-gradient-to-r from-[#0020dd] via-[#ab00a9] to-[#cc0000] text-white hover:opacity-90 transition-transform transform hover:scale-105"
          >
            {isLoading ? "Joining..." : "Join Game"}
          </button>
        </div>
      </NeonGradientCard>
      <div className="flex justify-center mt-8 mb-6">
        <Link href="/about">
          <div
            className={`relative px-6 py-3 font-bold text-black group rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 cursor-pointer transition-all duration-300 ease-in-out overflow-hidden ${
              bounce ? "animate-bounce" : ""
            }`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <span
              className={`absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-full group-hover:h-full opacity-10`}
            ></span>
            <span className="relative flex items-center">
              <span
                className={`transition-all duration-200 ${
                  hovered ? "translate-x-2" : ""
                }`}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 font-mono">
                  &lt;Created By/&gt;
                </span>{" "}
                <span className="font-bold text-white">
                  Majharul Islam Ruhit
                </span>
              </span>
              <span className="mx-2 text-white">&</span>
              <span
                className={`transition-all duration-200 ${
                  hovered ? "-translate-x-2" : ""
                }`}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 font-mono">
                  &lt;Designed By/
                </span>{" "}
                <span className="font-bold text-white">Junaid Javed</span>
              </span>
            </span>
            <div
              className={`absolute bottom-0 left-0 w-full h-1 bg-white transition-all duration-300 ${
                hovered ? "opacity-40" : "opacity-0"
              }`}
            ></div>
          </div>
        </Link>
      </div>
    </div>
  );
};
