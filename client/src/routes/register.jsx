import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../lib/apiRequest";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex">
      {/* FORM CONTAINER */}
      <div className="flex-[3] flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full max-w-md p-6"
        >
          <h1 className="text-2xl font-bold text-gray-800">
            Create an Account
          </h1>
          <input
            name="username"
            type="text"
            placeholder="Username"
            required
            className="p-4 border border-gray-400 rounded-md outline-none focus:border-teal-500"
          />
          <input
            name="email"
            type="text"
            placeholder="Email"
            required
            className="p-4 border border-gray-400 rounded-md outline-none focus:border-teal-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="p-4 border border-gray-400 rounded-md outline-none focus:border-teal-500"
          />

          <button
            disabled={isLoading}
            className="p-4 rounded-xl bg-teal-600 text-white font-bold cursor-pointer transition-all duration-500 ease-in-out hover:bg-teal-400 hover:scale-105 disabled:bg-teal-200 disabled:cursor-not-allowed"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {error && <span className="text-red-500">{error}</span>}

          <Link
            to="/login"
            className="text-sm text-gray-600 border-b border-gray-400 w-max"
          >
            Do you have an account?
          </Link>
        </form>
      </div>

      {/* IMAGE CONTAINER */}
      <div className="flex-[2] bg-[#fcf5f3] flex items-center justify-center">
        <img src="/bg.png" alt="Background" className="w-full h-auto" />
      </div>
    </div>
  );
}

export default Register;
