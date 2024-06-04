import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const Packing1 = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    saleNo: '',
    startDate: '',
    endDate: '',
    details: 'packing'
  });
  
  const navigate = useNavigate();

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/packing/packingdetails`, {
        method: 'post',
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
      navigate('/packing1');
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form className='a1' onSubmit={submitHandler}>
        <p className='b1'>Date</p>
        <p className='b2'>Please enter the following details to continue the process.</p>

        <div className="mb-5">
          <label className='green-leaf'>Amount of green leaf received</label>
          <br />
          <input type='number' name='green_leaves' placeholder='kg' className='control2' value={formData.saleNo} onChange={handleInputChange} />
        </div>
        <div className="mb-5">
          <label className='made-tea'>Amount of tea made</label>
          <br />
          <input type='number' name='green_leaves' placeholder='kg' className='control2' value={formData.saleNo} onChange={handleInputChange} />
        </div>
        
        
        <div className="mt-7">
          <button disabled={loading && true} type='submit'>
            {loading ? <HashLoader size={35} color="#ffffff" /> : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Packing1;
