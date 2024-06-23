import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const Dispatch = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().substr(0, 10),
    details: 'packing',
    teacategory: '',
    sizeofbag: '',
    numofbags: '',
    invoicenumber: ''
  });
  const navigate = useNavigate();

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const update = {
        teacategory: formData.teacategory,
        invoicenumber: formData.invoicenumber,
        sizeofbag: formData.sizeofbag,
        numofbags: formData.numofbags
      };

      const payload = {
        date: formData.date,
        details: formData.details,
        updates: [update] // wrap update object in an array
      };

      const res = await fetch(`${BASE_URL}/dispatch/dispatchdetails`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate('/packing2');
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
          <label className='made-tea'>Invoice Number</label>
          <br />
          <input
            type='text'
            name='invoicenumber'
            className='control2'
            value={formData.invoicenumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <label className='green-leaf'>Tea Category</label>
          <br />
          <select
            name='teacategory'
            value={formData.teacategory}
            onChange={handleInputChange}
            className='tea_category'
          >
            <option value="">Select a category</option>
            <option value="BOP1A">BOP1A</option>
            <option value="FBOP">FBOP</option>
            <option value="FBOPF1">FBOPF1</option>
            <option value="OPA">OPA</option>
            <option value="OP">OP</option>
            <option value="PEKOE">PEKOE</option>
            <option value="PEKOE1">PEKOE1</option>
            <option value="BOP">BOP</option>
            <option value="BOPSp">BOP Sp</option>
            <option value="BOP1">BOP1</option>
            <option value="BOPA">BOPA</option>
            <option value="BOPF">BOPF</option>
            <option value="FBOP1">FBOP1</option>
            <option value="FBOPF">FBOPF</option>
            <option value="OP1">OP1</option>
            <option value="BP">BP</option>
            <option value="FBOPFSp">FBOPF Sp</option>
            <option value="FFEXSP">FF EX SP</option>
          </select>
        </div>
        <div className="mb-5">
          <label className='made-tea'>Size Of Bag</label>
          <br />
          <input
            type='number'
            name='sizeofbag'
            placeholder='kg'
            className='control2'
            value={formData.sizeofbag}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <label className='made-tea'>Number of Bags</label>
          <br />
          <select
            name='numofbags'
            value={formData.numofbags}
            onChange={handleInputChange}
            className='bags_no'
          >
            <option value="">Select number of bags</option>
            <option value="10B">10B</option>
            <option value="15B">15B</option>
            <option value="20B">20B</option>
            <option value="30B">30B</option>
            <option value="40B">40B</option>
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
};

export default Dispatch;