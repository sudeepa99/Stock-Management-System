import { FaEnvelope, FaLock } from "react-icons/fa"; // For email and password icons
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader.js";

import loginImg from "../../assets/images/Login_image.png"; // changed to lowercase for consistency
import logo from "../../assets/images/logo.png";
import { BASE_URL } from "../../config.js";
import { authContext } from "../../context/AuthContext.jsx";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        },
      });

      setLoading(false);
      toast.success(result.message);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-green-100">
      <div className=" flex w-[900px] bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <div className="flex items-center space-x-4 mb-6">
            <img src={logo} alt="logo" className="w-14" />
            <p className="text-2xl font-bold text-gray-800">
              Stock Management System
            </p>
          </div>

          <h2 className="text-xl font-semibold text-gray-700 mb-6">Login</h2>

          <form onSubmit={submitHandler} className="space-y-5">
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-green-400">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-transparent outline-none"
              />
            </div>

            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-green-400">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-transparent outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white text-lg rounded-xl font-semibold hover:bg-green-600 hover:scale-[1.02] shadow-md transition-all duration-200"
            >
              {loading ? <HashLoader size={25} color="#fff" /> : "Login"}
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-green-50 flex items-center justify-center">
          <img src={loginImg} alt="Login" className="w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
