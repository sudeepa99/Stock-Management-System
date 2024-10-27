import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
import Packing2 from "./Packing2.jsx";

import './packing.css';

const Packing1 = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [getMadeTea, setMadeTea] = useState('');
  const [getTrue, setGetTrue] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    greenleaves: '',
    madetea: '',
    details: 'packing',
    date: new Date().toISOString().substr(0, 10),
  });


  const getMadeTeaF = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/packing/getMade`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMadeTea(data.data);
      //  toast.success('Data fetched successfully');
      setGetTrue(!data.data); // Assumes `data.data` is non-empty if there's data
    } catch (err) {
      // toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'madetea' && Number(value) > Number(formData.greenleaves)) {
      setError('Amount of tea made cannot exceed the amount of green leaves received.');
    } else {
      setError('');
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/packing/packingdetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const { message } = await res.json();
      if (!res.ok) throw new Error(message);

      toast.success(message);
      await getMadeTeaF(); // Update getMadeTea after submission
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {getTrue ? (
        <form className='a1' onSubmit={submitHandler}>
          <p className='b1'>Date</p>
          <p className='b2'>Please enter the following details to continue the process.</p>
          <div>
            <div className="mb-5">
              <label className='green-leaf'>Amount of green leaf received</label>
              <br />
              <input
                type='number'
                name='greenleaves'
                placeholder='kg'
                className='control2'
                value={formData.greenleaves}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-5">
              <label className='made-tea'>Amount of tea made</label>
              <br />
              <input
                type='number'
                name='madetea'
                placeholder='kg'
                className='control2'
                value={formData.madetea}
                onChange={handleInputChange}
                required
              />
            </div>
            {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
          </div>
          <div className="mt-7">
            <button disabled={loading} type='submit'>
              {loading ? <HashLoader size={35} color="#ffffff" /> : 'Submit'}
            </button>
          </div>
        </form>
      ) : (
        <Packing2 />
      )}
    </div>
  );
};

export default Packing1;
