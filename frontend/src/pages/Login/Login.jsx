import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa"; // For email and password icons
import "./Login.css"; // For custom styling

import loginImg from "../../assets/images/Login_image.png"; // changed to lowercase for consistency
import logo from "../../assets/images/logo.png";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";
import { authContext } from "../../context/AuthContext.jsx";
import HashLoader from "react-spinners/HashLoader.js";

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
            <form
              onSubmit={submitHandler}
            >
              <div className="input-field">
                <FaEnvelope className="input-icon" />
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
                <FaLock className="input-icon" />
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
    </div >
  );
};

export default LoginPage;

//   return (
//     <div className="bg-cellwhiteColor w-full max-w-[80%] mx-auto rounded-lg shadow-md md:p-10 object-cover ">
//       <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
//         <div>
//           <img src={logo} />
//           <p className="text-[34px] font-bold py-4 ml-24">
//             Stock Management System
//           </p>
//           <form
//             className="flex flex-col justify-start w-[436px] h-[462px] ml-24 gap-6  rounded-lg shadow-md  bg-greyColor"
//             onSubmit={submitHandler}
//           >
//             <p className="text-[48px] font-semibold pl-8 pt-6 leading-7 text-headingColor">
//               Login
//             </p>
//             <div className="mx-10 pt-14">
//               <span className="absolute laptop:ml-16 desktop:ml-24  left-72 laptop:top-[65%]  desktop:top-[50.5%]  ">
//                 <FaUser />
//               </span>
//               <input
//                 type="email"
//                 placeholder="Enter Your Email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border-b border-solid  focus:outline-none bg-brownColor rounded-lg
//             focus:border-b  text-[16px] leading-7 text-headingColor placeholder:text-textColor pl-14  cursor-pointer"
//                 required
//               />
//             </div>
//             <div className="mx-10">
//               <span className="absolute laptop:ml-16 desktop:ml-24  left-72 laptop:mt-4 desktop:mt-0   desktop:top-[59%] ">
//                 <FaLock />
//               </span>
//               <input
//                 type="password"
//                 placeholder="Enter Your Password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border-b border-solid  focus:outline-none bg-brownColor rounded-lg
//             focus:border-b  text-[16px] leading-7 text-headingColor placeholder:text-textColor pl-14  cursor-pointer"
//                 required
//               />
//             </div>
//             <div className="flex justify-center pt-4">
//               <button
//                 type="submit"
//                 className="w-[50%] bg-primaryColor text-white text-[30px] leading-[30px] rounded-lg px-4 py-3 tracking-wide font"
//               >
//                 {loading ? <HashLoader size={25} color="#fff" /> : "Login"}
//               </button>
//             </div>
//           </form>
//         </div>
//         <div className="w-full">
//           <img src={loginImg} alt="Login" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;




