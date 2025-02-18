"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    console.log("Logged in as:", username);
    router.push("/"); // Redirect to dashboard after login
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col justify-center items-center text-black">
      <div className="bg-white w-[30%] p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6">Login</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="px-4 py-2 rounded text-black border border-black"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="px-4 py-2 rounded text-black border border-black"
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full px-6 py-2 rounded-md bg-gradient-to-r from-pink-500 to-black text-white hover:opacity-90 transition-transform transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
