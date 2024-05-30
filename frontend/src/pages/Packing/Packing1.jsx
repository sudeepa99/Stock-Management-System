import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HashLoader from 'react-spinners/HashLoader';

const Packing1 = () => {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    saleNo: '',
    s_date: '',
    e_date: '',
    details: 'packing'
  });

  const navigate = useNavigate();
  const byeSectionRef = useRef(null);

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/packingdetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }
      setLoading(false);
      toast.success(message);
      setIsSubmitted(true);
      byeSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {!isSubmitted ? (
        <section id='Hi'>
          <div className="w-full max-w-[50%] mx-auto rounded-lg shadow-md md:p-10 object-cover h-40">
            <form
              className='py-6 md:py-20 bg-greyColor w-full max-w-[70%] mx-auto rounded-lg shadow-md md:p-5'
              onSubmit={submitHandler}
            >
              <div className="mb-5">
                <input
                  type='number'
                  name='saleNo'
                  className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
                  required
                  value={formData.saleNo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-5">
                <input
                  type='date'
                  name='s_date'
                  className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                  required
                  value={formData.s_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-5">
                <input
                  type='date'
                  name='e_date'
                  className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
                  required
                  value={formData.e_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-7">
                <button
                  disabled={loading}
                  type='submit'
                  className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'
                >
                  {loading ? <HashLoader size={35} color="#ffffff" /> : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </section>
      ) : (
        <section id='Bye' ref={byeSectionRef}>
          <div className='py-6 md:py-20 bg-greyColor w-full max-w-[70%] mx-auto rounded-lg shadow-md md:p-5'>
            dilini
          </div>
        </section>
      )}
    </>
  );
};

export default Packing1;
