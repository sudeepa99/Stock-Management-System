import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const Packing2 = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    teacategory: '',
    sizeofbag: '',
    details: 'packing',
    numofbags: ''
  });

  const navigate = useNavigate();

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/packing/update`, {
        method: 'put',
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
      navigate('/packing');
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
          <label className='green-leaf'>Tea Category</label>
          <br />
          <input type='text' name='teacategory' placeholder='0' className='control2' value={formData.teacategory} onChange={handleInputChange} />
        </div>
        <div className="mb-5">
          <label className='made-tea'>Size Of Bag</label>
          <br />
          <input type='number' name='sizeofbag' placeholder='kg' className='control2' value={formData.sizeofbag} onChange={handleInputChange} />
        </div>
        <div className="mb-5">
          <label className='made-tea'>Num Of Bag</label>
          <br />
          <input type='number' name='numofbags' placeholder='kg' className='control2' value={formData.numofbags} onChange={handleInputChange} />
        </div>
        <div className="mt-7">
          <button disabled={loading} type='submit'>
            {loading ? <HashLoader size={35} color="#ffffff" /> : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Packing2;
