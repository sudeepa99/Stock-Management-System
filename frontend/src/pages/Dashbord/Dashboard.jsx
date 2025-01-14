import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import { BASE_URL } from "../../config";
import "./Dashboard.css";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null); // Initialize data state
  const rowsPerPage = 5; // Set number of rows per page
  const [currentPage, setCurrentPage] = useState(1);
  const today = new Date().toLocaleDateString();
  const [endDate, setEndDate] = useState(today);

  const getMadeTeaF = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/packing/sale`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(
          responseData.message || "Failed to fetch made tea data"
        );
      }

      setData(responseData.data);
    } catch (err) {
      console.error("Error fetching made tea data:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMadeTeaF();
  }, []);

  // Aggregate dispatch details for pagination
  const allDispatchDetails = Object.keys(data?.dispatchDetails || {}).reduce(
    (acc, key) => {
      const categoryDetails = data.dispatchDetails[key];
      if (Array.isArray(categoryDetails.data)) {
        acc.push(...categoryDetails.data);
      }
      return acc;
    },
    []
  );

  const totalPages = Math.ceil(allDispatchDetails.length / rowsPerPage);

  // Data for the current page
  const currentData = allDispatchDetails.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/packing/end-date`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ endDate }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setLoading(false);
      toast.success(data.message);
      setEndDate(today); // Reset input field to today's date
      getMadeTeaF(); // Refresh the data by calling the get API
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="a1">
        <div>
          <div className="flex-col gap-3">
            <p className="b1">Current Status {today}</p>
          </div>
          <div className="absolute flex flex-row top-[15px] right-[10px]">
            <label className="sale">Sale Number - </label>
            <span className="text-xl ">{data?.saleDetails.saleNo}</span>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-start justify-center h-40 max-w-md gap-8 px-4 pt-4 rounded-lg bg-slate-900">
            <div className="flex flex-col justify-center">
              <label className="text-[#d4cc3d]">Catalogue Start Date</label>
              <span className="mt-3 text-center">
                {data?.saleDetails.startDate
                  ? new Date(data.saleDetails.startDate).toLocaleDateString()
                  : ""}
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <label className="text-[#D5D767]">Catalogue End Date</label>
              <span className="mt-3 text-center">
                {data?.saleDetails.endDate
                  ? new Date(data.saleDetails.endDate).toLocaleDateString()
                  : ""}
              </span>
              <div>
                <form onSubmit={submitHandler}>
                  <label className="text-[#D5D767]">Update End date</label>
                  <p></p>
                  <input
                    type="date"
                    name="endDate"
                    className="text-[#070513]"
                    value={endDate}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <p></p>
                  <button type="submit" className="text-[#fb3c52]">
                    {loading ? <HashLoader size={45} color="#ffffff" /> : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-start justify-center h-40 max-w-md gap-8 px-4 pt-4 rounded-lg bg-slate-900">
            <div className="mb-5">
              <label className="text-[#50EDED] text-center">
                Amount of green leaf received
              </label>
              <span className="mt-3">
                {data?.packingDetails &&
                  data.packingDetails.greenleaves !== null
                  ? data.packingDetails.greenleaves
                  : "Not add data"}
              </span>
            </div>
            <div className="mb-5">
              <label className="text-[#50EDED] text-center">
                Amount of tea made
              </label>
              <span className="mt-3">
                {data?.packingDetails && data.packingDetails.madetea !== null
                  ? data.packingDetails.madetea
                  : "Not add data"}
              </span>
            </div>
          </div>
        </div>

        {data?.packingDetails && (
          <table className="min-w-full mt-10 border border-collapse border-gray-300">
            <thead>
              <tr className="bg-transparent">
                <th className="px-4 py-2 border text-[#50EDED] border-gray-300">
                  Invoice No
                </th>
                <th className="px-4 py-2 border text-[#50EDED] border-gray-300">
                  Tea Mark
                </th>
                <th className="px-4 py-2 border text-[#50EDED] border-gray-300">
                  Tea Category
                </th>
                <th className="px-4 py-2 text-[#50EDED] border border-gray-300">
                  Weight of Bag
                </th>
                <th className="px-4 py-2 text-[#50EDED] border border-gray-300">
                  Num of Bags
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data.packingDetails).map((key) => {
                const categoryDetails = data.packingDetails[key];
                console.log(categoryDetails);


                if (
                  Array.isArray(categoryDetails.data) &&
                  categoryDetails.data.length > 0
                ) {
                  return categoryDetails.data.map((item) => (
                    <tr key={item._id} className="">
                      <td className="px-4 py-2 border border-gray-300">
                        {item.invoiceNo}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {item.teaMark}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {item.teacategory}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {item.sizeofbag}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {item.numofbags}
                      </td>
                    </tr>
                  ));
                }
              })}
            </tbody>
          </table>
        )}
        {data?.dispatchDetails && (
          <div>
            <table className="min-w-full mt-10 border border-collapse border-gray-300">
              <thead>
                <tr className="bg-transparent">
                  <th className="px-4 py-2 border text-[#50EDED] border-gray-300">
                    Invoice No
                  </th>
                  <th className="px-4 py-2 border text-[#50EDED] border-gray-300">
                    Date
                  </th>
                  <th className="px-4 py-2 text-[#50EDED] border border-gray-300">
                    Weight of Bag
                  </th>
                  <th className="px-4 py-2 text-[#50EDED] border border-gray-300">
                    Num of Bags
                  </th>
                  <th className="px-4 py-2 text-[#50EDED] border border-gray-300">
                    Broker
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item) => (
                  <tr key={item._id} className="">
                    <td className="px-4 py-2 border border-gray-300">
                      {item.invoicenumber}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.date
                        ? new Date(item.date).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.sizeofbag}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.numofbags}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.broker}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 border border-gray-300 text-gray-500 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 mx-1 border border-gray-300 ${currentPage === index + 1
                    ? "bg-[#50EDED] text-white"
                    : "text-gray-500"
                    }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-1 border border-gray-300 text-gray-500 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
