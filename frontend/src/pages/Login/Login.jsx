import { FaEnvelope, FaLock } from "react-icons/fa"; // For email and password icons
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader.js";

import "./Login.css"; // For custom styling
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
    <div className="login-page">
      <div className="login-container">
        {/* Left Section */}
        <div className="login-form">
          <div className="logo-container">
            <div>
              <img src={logo} />
              <p className="text-[34px] font-bold py-4 ml-24 text-[#000]">
                Stock Management System
              </p>
            </div>
          </div>

          <div className="input-container bg-greyColor">
            <p className="text-[40px] font-bold text-[#000] ml-2">Login</p>
            <form onSubmit={submitHandler} noValidate>
              <div className="input-field">
                <FaEnvelope className="absolute text-black left-[17.5%]" />
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-field">
                <FaLock className="absolute text-black left-[17.5%]" />
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="w-[50%] bg-primaryColor text-white text-[25px] leading-[30px] rounded-lg px-4 py-2 tracking-wide font"
                >
                  {loading ? <HashLoader size={25} color="#fff" /> : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div className="login-image">
          <img src={loginImg} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
