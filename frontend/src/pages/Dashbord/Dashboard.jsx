import React, { useState, useEffect } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import { BASE_URL } from '../../config';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: ''
  });

  const getMadeTeaF = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/packing/saleDetail`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.message);

      setData(responseData.data); // Update the data state with the fetched data
      toast.success('Data fetched successfully');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMadeTeaF();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <HashLoader color="#36d7b7" />
      ) : (
        <form className="a1">
          <p className="b1">Sale Details</p>
          <div className="mb-5">
            <label className="sale">Sale Number</label>
            <span>{data?.saleDetails.saleNo}</span>
          </div>
          <div className="row">
            <div className="mb-6">
              <label>Catalogue Start Date</label>
              <span>{data?.saleDetails.startDate ? new Date(data.saleDetails.startDate).toLocaleDateString() : ''}</span>
            </div>
            <div className="mb-6">
              <label>Catalogue End Date</label>
              <span>{data?.saleDetails.endDate ? new Date(data.saleDetails.endDate).toLocaleDateString() : ''}</span>
            </div>
          </div>


          <div className="mb-5">
            <label className='green-leaf'>Amount of green leaf received</label>
            <span>{data?.packingDetails && data.packingDetails.greenleaves !== null ? data.packingDetails.greenleaves : "Not add data"}</span>
          </div>
          <div className="mb-5">
            <label className='made-tea'>Amount of tea made</label>
            <span>{data?.packingDetails && data.packingDetails.madetea !== null ? data.packingDetails.madetea : "Not add data"}</span>
          </div>



          {/* Ensure BOP1A array has at least one element before accessing */}
          {data?.packingDetails && (
            <table className="table">
              <thead>
                <tr>
                  <th>Tea Category</th>
                  <th>Size Of Bag</th>
                  <th>Num Of Bags</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data.packingDetails).map((key) => {
                  const categoryDetails = data.packingDetails[key];

                  // Check if categoryDetails is an array before mapping
                  if (Array.isArray(categoryDetails) && categoryDetails.length > 0) {
                    return categoryDetails.map((item) => (
                      <tr key={item._id}>
                        <td>{item.teacategory}</td>
                        <td>{item.sizeofbag}</td>
                        <td>{item.numofbags}</td>
                      </tr>
                    ));
                  }
                  return null; // Return null for empty categories or non-array values
                })}
              </tbody>
            </table>
          )}


        </form>
      )}
    </div>
  );

};

export default Dashboard;
