"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { TypingAnimation } from "@/components/magicui/typing-animation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded credentials for now (replace with your real authentication logic)
    const correctUsername = "admin";
    const correctPassword = "123";

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    // Check credentials
    if (username === correctUsername && password === correctPassword) {
      setCookie("isAuthenticated", "true", { maxAge: 600 });
      router.push("/admin"); // Redirect to dashboard after login
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center text-black">
      <NeonGradientCard className=" w-[350px] h-[290px] flex flex-col justify-center align-middle">
        {/* <h1 className="text-4xl font-bold text-center mb-6">Login</h1> */}
        <TypingAnimation
          className="  text-5xl font-bold text-center mb-5 bg-gradient-to-r from-[#0020dd] via-[#ab00a9] to-[#cc0000] bg-clip-text text-transparent"
          duration={200}
        >
          Login
        </TypingAnimation>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="mx-4 px-4 py-2 w-[270px] h-[40px] rounded text-black border border-black"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mx-4 px-4 py-2 w-[270px] h-[40px] rounded text-black border border-black"
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[270px] h-[40px] px-6 py-2 rounded-md bg-gradient-to-r from-[#0020dd] via-[#ab00a9] to-[#cc0000] text-white hover:opacity-90 transition-transform transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 mt-2 ">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </a>
        </p>
      </NeonGradientCard>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    </div>
  );
}
