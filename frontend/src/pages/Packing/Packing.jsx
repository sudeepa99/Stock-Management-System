import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
import './packing.css';
import Packing1 from "./Packing1.jsx";

const Packing = () => {
  const [loading, setLoading] = useState(false);
  const [getEndDate, setGetEndDate] = useState(null);
  const [formData, setFormData] = useState({
    saleNo: '',
    startDate: '',
    endDate: '',
    details: 'packing',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/packing/saledetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setLoading(false);
      toast.success(data.message);
      setGetEndDate(false);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  const getEndDateF = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/packing/getDateDetails`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setGetEndDate(data.data);
      setLoading(false);
      toast.success('Date fetched successfully');
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getEndDateF();
  }, []);

  return (
    <div className="container">
      {getEndDate ? (
        <form className="a1" onSubmit={submitHandler}>
          <p className="b1">Sale Details</p>
          <p className="b2">Please enter the following details to continue the process.</p>
          <div className="mb-5">
            <label className="sale">Sale Number</label>
            <br />
            <input
              type="number"
              name="saleNo"
              className="control2"
              value={formData.saleNo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="row">
            <div className="mb-6">
              <label>Catalogue Start Date</label>
              <input
                type="date"
                name="startDate"
                className="control"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-6">
              <label>Catalogue End Date</label>
              <input
                type="date"
                name="endDate"
                className="control"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="mt-7">
            <button
              disabled={loading}
              type="submit"
              className=""
            >
              {loading ? <HashLoader size={35} color="#ffffff" /> : 'Submit'}
            </button>
          </div>
        </form>
      ) : (
        <Packing1/>
      )}
    </div>
  );
};

export default Packing;
