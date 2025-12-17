import { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import { BASE_URL } from "../../../config";
import { Link } from "react-router-dom";
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
  const [currentBroker, setCurrentBroker] = useState("Farbas");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;
  const brokers = ["Farbas", "Mercantile", "JKeels"];

  const getMadeTeaF = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/dispatch/weekly`, {
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
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMadeTeaF();
  }, []);

  // Get data for the current broker
  const currentBrokerData =
    data?.[`broker${currentBroker}Details`]?.flatMap((item) =>
      item ? [item] : []
    ) || [];

  // Pagination logic
  const totalPages = Math.ceil(currentBrokerData.length / rowsPerPage);
  const currentData = currentBrokerData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleBrokerChange = (broker) => {
    setCurrentBroker(broker);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Calculate totals for current data
  const calculateTotals = () => {
    let totalBags = 0;
    let totalWeight = 0;

    currentData.forEach((item) => {
      let numBags = 0;
      const numofbags = item.data?.numofbags;

      if (numofbags) {
        // Handle both "15B" format and regular numbers
        if (typeof numofbags === "string" && numofbags.includes("B")) {
          numBags = parseInt(numofbags.replace("B", "")) || 0;
        } else {
          numBags = parseInt(numofbags) || 0;
        }
      }

      const bagWeight = parseFloat(item.data?.sizeofbag) || 0;
      totalBags += numBags;
      totalWeight += numBags * bagWeight;
    });

    return { totalBags, totalWeight };
  };

  const { totalBags, totalWeight } = calculateTotals();

  return (
    <div className="min-h-screen bg-[#f5fef9] flex justify-center items-center">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen bg-white">
          <HashLoader color="#36d7b7" />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Weekly Report according to broker
                </h1>
                <Link
                  to="/report"
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-2"
                >
                  <i className="fas fa-arrow-left"></i> Go to Main Report
                </Link>
              </div>
              <div className="text-right">
                <p className="text-sm text-black">Today</p>
                <p className="text-gray-800 font-medium">{today}</p>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Invoice No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Weight of Bag
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Num of Bags
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No data available for this broker
                      </td>
                    </tr>
                  ) : (
                    currentData.map((item, index) => (
                      <tr key={item._id || index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.data?.invoicenumber || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.data?.date
                            ? new Date(item.data.date).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.category || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.data?.sizeofbag || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.data?.numofbags || "N/A"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Totals Section */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700">
                    Total Number of Bags:{" "}
                    <span className="text-gray-900 font-bold">{totalBags}</span>
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700">
                    Total Weight of Bags:{" "}
                    <span className="text-gray-900 font-bold">
                      {totalWeight}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Broker Selector */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4">
              {brokers.map((broker) => (
                <button
                  key={broker}
                  onClick={() => handleBrokerChange(broker)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    currentBroker === broker
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {broker}
                </button>
              ))}
            </div>

            {/* Navigation Arrow */}
            <button className="text-gray-600 hover:text-gray-800">
              <i className="fas fa-arrow-right text-2xl"></i>
            </button>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg border text-sm ${
                  currentPage === 1
                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                    : "text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Previous
              </button>

              <div className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg border text-sm ${
                  currentPage === totalPages
                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                    : "text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DispatchReport;
