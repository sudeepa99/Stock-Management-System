import {useState, useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';
import { authContext } from '../context/AuthContext.jsx';
import HashLoader from 'react-spinners/HashLoader.js';
import loginImg from '../assets/images/Login_image.png'; // changed to lowercase for consistency
import logo from '../assets/images/logo.png';

const Login = () => {
  const[formData, setFormData]=useState({
    email:'',
    password:''
  });

  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const{dispatch} = useContext(authContext)

  const handleInputChange= e=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const submitHandler= async event =>{
    event.preventDefault();
    setLoading(true)
    try{
      const res = await fetch(`${BASE_URL}/auth/login`,{
        method:'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
            })
      const result= await res.json()
      if(!res.ok){
        throw new Error(result.message);
      }

      dispatch({
        type:'LOGIN_SUCCESS',
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        },
      });

      console.log(result, "login data");
      setLoading(false)
      toast.success(result.message)
     // console.log(user);

      navigate('/dashboard')

    }catch (err) {
      toast.error(err.message)
      setLoading(false)

    }
  };
  return (
    <section className='px-1 lg:px-0'>

      <div className="bg-cellwhiteColor w-full max-w-[80%] mx-auto rounded-lg shadow-md md:p-10 object-cover ">
        <div className='grid grid-cols-2 md:grid-cols-2 gap-4'>
          <div>
            <img src={logo}/>
          <p className='text-[25px] text-b py-4'>Stock Management System</p>
        <form className='py-6 md:py-20 bg-greyColor w-full max-w-[70%] mx-auto rounded-lg shadow-md md:p-5' onSubmit={submitHandler}>
          Login
          <div className="mb-5">
            
            <input type='email' placeholder='Enter Your Email' name='email' value={formData.email} onChange={handleInputChange}
            className='w-full  py-3 border-b border-solid border-[#0066ff61] focus:outline-none
            focus:border-b border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer' required
            />
          </div>
          <div className="mb-5">
            <input type='password' placeholder='Enter Your Password' name='password' value={formData.password} onChange={handleInputChange}
            className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
            focus:border-b border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer' required
            />
          </div>
          <div className="mt-7">
            <button type='submit' className='w-[50%] bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
              { loading ?<HashLoader size={25} color='#fff'/> :'login'}
            </button>
          </div>
         
        </form>
        </div>
       <div className='w-full'>
       <img src={loginImg} alt="Login" />
       </div>
       </div>
      </div>
    </section>
  )
}

export default Login