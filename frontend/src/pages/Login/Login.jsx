import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";
import { authContext } from "../../context/AuthContext.jsx";
import HashLoader from "react-spinners/HashLoader.js";
import loginImg from "../../assets/images/Login_image.png"; // changed to lowercase for consistency
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaLock, FaUser } from "react-icons/fa";
// import { FaUser } from "react-icons/fa";

const Login = () => {
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

      console.log(result, "login data");
      setLoading(false);
      toast.success(result.message);
      // console.log(user);

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };
  return (
    <section className="px-1 lg:px-0">
      <div className="bg-cellwhiteColor w-full max-w-[80%] mx-auto rounded-lg shadow-md md:p-10 object-cover ">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
          <div>
            <img src={logo} />
            <p className="text-[34px] font-bold  py-4 ml-24">
              Stock Management System
            </p>
            <form
              className="flex flex-col justify-start w-[436px] h-[462px] ml-24 gap-6  rounded-lg shadow-md  bg-greyColor"
              onSubmit={submitHandler}
            >
              <p className="text-[48px] font-semibold pl-8 pt-6 leading-7 text-headingColor">
                Login
              </p>
              <div className="mx-10 pt-14">
                <span className="absolute laptop:ml-16 desktop:ml-24  left-72 laptop:top-[65%]  desktop:top-[50.5%]  ">
                  <FaUser />
                </span>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3  border-b border-solid  focus:outline-none bg-brownColor text rounded-lg
            focus:border-b  text-[16px] leading-7 text-headingColor placeholder:text-textColor pl-14 rounded-md cursor-pointer"
                  required
                />
              </div>
              <div className="mx-10">
                <span className="absolute laptop:ml-16 desktop:ml-24  left-72 laptop:mt-4 desktop:mt-0   desktop:top-[59%] ">
                  <FaLock />
                </span>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid  focus:outline-none bg-brownColor rounded-lg
            focus:border-b  text-[16px] leading-7 text-headingColor placeholder:text-textColor pl-14 rounded-md cursor-pointer"
                  required
                />
              </div>
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="w-[50%] bg-primaryColor text-white text-[30px] leading-[30px] rounded-lg px-4 py-3 tracking-wide font"
                >
                  {loading ? <HashLoader size={25} color="#fff" /> : "Log in"}
                </button>
              </div>
            </form>
          </div>
          <div className="w-full">
            <img src={loginImg} alt="Login" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
