import { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import { Link } from "react-router-dom";

import { BASE_URL } from "../../../config";
import "./DispatchReport.css";
import { toast } from "react-toastify";
const today = new Date().toLocaleString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
});
const DispatchReport = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25; // Number of rows per page

  const getDispatchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/dispatch/weekly/default`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(
          responseData.message || "Failed to fetch dispatch data"
        );
      }

      setData(responseData.data); // Set the dateRangeDetails object

      const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
      setSelectedDate(
        responseData.data[today]
          ? today
          : Object.keys(responseData.data)?.[0] || ""
      ); // Set default date to today if it exists, otherwise the first available date
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDispatchData();
  }, []);

  // Get data for the selected date
  const currentDateData = selectedDate ? data?.[selectedDate] || [] : [];

  const currentData = currentDateData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setCurrentPage(1); // Reset to the first page on date change
  };

  return (
    <div className="min-h-screen bg-[#f5fef9] flex justify-center items-center ">
      {loading ? (
        <HashLoader color="#36d7b7" />
      ) : (
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-6xl p-8">
          <div>
            <div className="flex justify-between items-center mb-6">
              {/* Left */}
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Dispatch Report per day
                </h1>
                <Link
                  to="/report"
                  className="text-green-600 hover:text-green-700 flex items-center gap-2 mt-1"
                >
                  ← Go to Main Report
                </Link>
              </div>

              {/* Right */}
              <div className="flex flex-col items-end gap-2">
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg text-black"
                  value={selectedDate}
                  onChange={handleDateChange}
                >
                  {Object.keys(data || {}).map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
                </select>

                <p className="text-sm text-gray-600">{today}</p>
              </div>
            </div>
          </div>
          {/* Date Selector */}

          {/* </div> */}

          <div>
            <table className="min-w-full mt-10 border border-collapse border-gray-300">
              <thead>
                <tr className="bg-transparent">
                  <th className="px-4 py-2 border text-black font-semibold border-gray-300">
                    Invoice No
                  </th>
                  <th className="px-4 py-2 border text-black font-semibold border-gray-300">
                    Category
                  </th>
                  <th className="px-4 py-2 border text-black font-semibold border-gray-300">
                    Weight of Bag
                  </th>
                  <th className="px-4 py-2 border text-black font-semibold border-gray-300">
                    Num of Bags
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center text-black px-4 py-2"
                    >
                      No data available for the selected date
                    </td>
                  </tr>
                ) : (
                  currentData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border border-gray-300">
                        {item.data.invoicenumber}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {item.category}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {item.data.sizeofbag}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {item.data.numofbags}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" className="text-center text-black px-4 py-2">
                    Total Number of Bags:{" "}
                    {currentData.reduce((acc, item) => {
                      let numBags = 0;
                      if (item.data.numofbags === "10B") {
                        numBags = 10;
                      } else if (item.data.numofbags === "20B") {
                        numBags = 20;
                      } else if (item.data.numofbags === "15B") {
                        numBags = 15;
                      } else if (item.data.numofbags === "30B") {
                        numBags = 30;
                      } else if (item.data.numofbags === "40B") {
                        numBags = 40;
                      }
                      return acc + numBags;
                    }, 0)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="4" className="text-center text-black px-4 py-2">
                    Total Weight of Bags:
                    {currentData.reduce((acc, item) => {
                      let numBags = 0;
                      if (item.data.numofbags === "10B") {
                        numBags = 10;
                      } else if (item.data.numofbags === "20B") {
                        numBags = 20;
                      } else if (item.data.numofbags === "15B") {
                        numBags = 15;
                      } else if (item.data.numofbags === "30B") {
                        numBags = 30;
                      } else if (item.data.numofbags === "40B") {
                        numBags = 40;
                      }
                      return acc + numBags * item.data.sizeofbag;
                    }, 0)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DispatchReport;
