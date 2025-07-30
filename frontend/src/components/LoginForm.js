import { useState } from "react";
import { login } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";
import React from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left background section */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url('/A_2D_digital_illustration_login_screen_for_Nestora.png')",
        }}
      ></div>

      {/* Right login form section */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-10 bg-white">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Nestora</h2>

        <form className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <FaUserAlt className="text-gray-400 mr-2" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
