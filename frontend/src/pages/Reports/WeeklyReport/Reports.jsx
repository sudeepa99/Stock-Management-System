import { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import { Link } from "react-router-dom";

import { BASE_URL } from "../../../config";
import "./report.css";
const today = new Date().toLocaleString("en-US", {
  weekday: "long", // 'Monday'
  year: "numeric", // '2025'
  month: "long", // 'February'
  day: "numeric", // '12'
  hour: "numeric", // '3'
  minute: "numeric", // '47'
  second: "numeric", // '25'
  hour12: true, // 12-hour format with AM/PM
});
const Reports = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const rowsPerPage = 5; // Set number of rows per page
  // const [sortBy, setSortBy] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDay, setCurrentDay] = useState("Monday"); // Default to Monday
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  //const today = new Date().toLocaleDateString();

  const getMadeTeaF = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/packing/weekly`, {
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

  // Get data for the current day
  const currentDayData =
    data?.[currentDay]?.flatMap((dayData) =>
      Object.values(dayData).flatMap((category) => category.data || [])
    ) || [];

  // Pagination logic
  const rowsPerPage = 5;
  // const totalPages = Math.ceil(currentDayData.length / rowsPerPage);

  const currentData = currentDayData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleDayChange = (day) => {
    setCurrentDay(day);
    setCurrentPage(1); // Reset page to 1 when changing the day
  };

  // const handlePageChange = (pageNumber) => {
  //   if (pageNumber > 0 && pageNumber <= totalPages) {
  //     setCurrentPage(pageNumber);
  //   }
  // };

  return (
    <div className="min-h-screen bg-[#f5fef9] flex justify-center items-center">
      {loading ? (
        <HashLoader color="#36d7b7" />
      ) : (
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-6xl p-8">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Weekly Report About Packing Details
                </h1>
                <Link
                  to="/report"
                  className="text-green-600 hover:text-green-700 flex items-center gap-2"
                >
                  <i className="fas fa-arrow-left"></i> Go to Main Report
                </Link>
              </div>
              <div className="text-right">
                <p className="text-sm text-black font-semibold">Today</p>
                <p className="text-gray-800 font-medium">{today}</p>
              </div>
            </div>
          </div>

          <div>
            <table className="min-w-full mt-10 border border-collapse border-gray-300">
              <thead>
                <tr className="bg-transparent">
                  <th className="px-4 py-2 border text-black border-gray-300">
                    Invoice No
                  </th>
                  <th className="px-4 py-2 border text-black border-gray-300">
                    Tea Mark
                  </th>
                  <th className="px-4 py-2 text-black border border-gray-300">
                    Tea Category
                  </th>
                  <th className="px-4 py-2 text-black border border-gray-300">
                    Weight of Bag
                  </th>
                  <th className="px-4 py-2 text-black border border-gray-300">
                    Num of Bags
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.length === 0 ? (
                  <p className="text-center text-gray-300 px-4 py-2">
                    This date has no data entered
                  </p>
                ) : (
                  currentData.map((item) => (
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
                  ))
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-gray-300 px-4 py-2"
                  >
                    Total Number of Bags:{" "}
                    {currentData.reduce((acc, item) => {
                      return acc + item.numofbags;
                    }, 0)}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-gray-300 px-4 py-2"
                  >
                    Total Weight of Bags:
                    {currentData.reduce((acc, item) => {
                      return acc + item.numofbags * item.sizeofbag;
                    }, 0)}
                  </td>
                </tr>
              </tfoot>
            </table>

            {/* Day Selector */}
            <div className="flex justify-center mt-4">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  onClick={() => handleDayChange(day)}
                  className={`px-4 py-2 mx-1 border border-gray-300 ${
                    currentDay === day
                      ? "bg-green-600 text-white"
                      : "text-gray-500"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
