import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import {BASE_URL} from '../config';
import {toast} from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const Signup = () => {
  const[loading,setLoading] = useState(false)

  const[formData, setFormData]=useState({
    name:'',
    email:'',
    password:'',
    role:'viewer'
  });

  const navigate = useNavigate()

  const handleInputChange= e=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  };
  const submitHandler= async event =>{
    event.preventDefault();
    setLoading(true)
    try{
      const res = await fetch(`${BASE_URL}/auth/register`,{
        method:'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const {message}= await res.json()
      if(!res.ok){
        throw new Error(message)
      }
      setLoading(false)
      toast.success(message)
      navigate('/login')

    }catch (err) {
      toast.error(err.message)
      setLoading(false)

    }
  };
  return (
   <section className='px-5 xl:px-0'>
    <div className="max-w-[1170px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* =========img box ========= */}
       
        {/* sign up form */}
        <div className="rounded-l-lg lg:pl-16 py-10">
          <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
            Create an <span className='text-primaryColor '>account</span>
          </h3>
          <form onSubmit={submitHandler}>
          <div className="mb-5">
            <input type='text' placeholder='Enter Full Name' name='name' value={formData.name} onChange={handleInputChange}
            className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
            focus:border-b border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer' required
            />
          </div>
          <div className="mb-5">
            <input type='email' placeholder='Enter Your Email' name='email' value={formData.email} onChange={handleInputChange}
            className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
            focus:border-b border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer' required
            />
          </div>
          <div className="mb-5">
            <input type='password' placeholder='Enter Your Password' name='password' value={formData.password} onChange={handleInputChange}
            className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
            focus:border-b border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer' required
            />
          </div>
          <div className="mb-5 flex items-center justify-between">
            <label htmlFor='' className='text-headingColor font-bold text-[16px] leading-7'>
              Are you a: <select name='role' value={formData.role} onChange={handleInputChange} className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
                <option value='viewer'>viewer</option>
                <option value='Doctor'>Doctor</option>
              </select>
            </label>

          </div>
          <div className="mt-7">
            <button 
            disabled={loading && true}
            type='submit' className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
              { loading ? <HashLoader size={35} color="#ffffff"/> : 'Sign Up'}
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>

   </section>
  )
}

export default Signup