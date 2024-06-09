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
          <select
                    name='teacategory'
                    value={formData.teacategory}
                    onChange={handleInputChange}
                    className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
                    <option>BOP1A</option>
                    <option>FBOP</option>
                    <option>FBOPF1</option>
                    <option>OPA</option>
                    <option>OP</option>
                    <option>PEKOE</option>
                    <option>PEKOE1</option>
                    <option>BOP</option>
                    <option>BOP Sp</option>
                    <option>BOP1</option>
                    <option>BOPA</option>
                    <option>BOPF</option>
                    <option>FBOP1</option>
                    <option>FBOPF</option>
                    <option>OP1</option>
                    <option>BP</option>
                    <option>FBOPF Sp</option>
                    <option>FF EX SP</option>
                  </select>         
        </div>
        <div className="mb-5">
          <label className='made-tea'>Size Of Bag</label>
          <br />
          <input type='number' name='sizeofbag' placeholder='kg' className='control2' value={formData.sizeofbag} onChange={handleInputChange} />
        </div>
        <div className="mb-5">
          <label className='made-tea'>Num Of Bag</label>
          <br />
          <select
                    name='numofbags'
                    value={formData.numofbags}
                    onChange={handleInputChange}
                    className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'
                  >
                <option>10B</option>
                                        <option>15B</option>
                                        <option>20B</option>
                                        <option>30B</option>
                                        <option>40B</option>                       
                  </select>
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
