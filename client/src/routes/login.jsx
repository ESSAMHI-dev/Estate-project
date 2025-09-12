import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../lib/apiRequest";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {updateUser} = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        email,
        password,
      });

      updateUser(res.data)
      
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
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
          <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
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
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {error && <span className="text-red-500">{error}</span>}

          <Link
            to="/register"
            className="text-sm text-gray-600 border-b border-gray-400 w-max"
          >
            Don't have an account?
          </Link>
        </form>
      </div>

      {/* IMAGE CONTAINER */}
      <div className="flex-[2] bg-[#fcf5f3] flex items-center justify-center max-sm:hidden max-md:hidden">
        <img src="/bg.png" alt="Background" className="w-full h-auto" />
      </div>
    </div>
  );
}

export default Login;
