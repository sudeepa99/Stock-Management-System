import { useState, useEffect } from 'react';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
import './packing.css';
import Packing1 from "./Packing1.jsx";
import Packing2 from "./Packing2.jsx";

const Packing = () => {
  const [loading, setLoading] = useState(false);
  const [madeTea, setMadeTea] = useState(null);
  const [error, setError] = useState('');
  const [getEndDate, setGetEndDate] = useState(null);
  const [formData, setFormData] = useState({
    saleNo: '',
    startDate: '',
    endDate: '',
    details: 'packing',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (name === 'startDate') {
      if (Number(value) > Number(formData.endDate)) {
        setError('Start date cannot exceed the end date.');
      } else {
        setError(''); // Clear error if condition is not met
      }
    }
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
      setMadeTea(false)
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

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
    } catch (err) {
      //  toast.error(err.message);
    } finally {
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
      // toast.success('Date fetched successfully');
    } catch (err) {
      // toast.error(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getEndDateF();
    getMadeTeaF();

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
              type="text"
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
                min={new Date().toISOString().split("T")[0]} // Disable dates before today
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
                min={formData.startDate || new Date().toISOString().split("T")[0]} // Disable dates before start date or today
              />
              <span className="error-message">
                {formData.endDate < formData.startDate && (
                  <span style={{ color: 'red' }}>
                    End date cannot be earlier than start date.
                  </span>
                )}  </span>
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
      ) : (madeTea ?
        <Packing2 /> : <Packing1 />
      )}
    </div>
  );
};

export default Packing;
