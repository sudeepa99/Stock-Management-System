import { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import { BASE_URL } from "../../../config";
import { Link } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedSaleNumber, setSelectedSaleNumber] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/packing/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch packing data");
      const responseData = await res.json();
      const fetchedData = responseData.data || [];
      setData(fetchedData);
      if (fetchedData.length > 0) {
        setSelectedSaleNumber(
          fetchedData[fetchedData.length - 1].saleDetailsAll.saleNumber
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaleNumberChange = (saleNumber) => {
    setSelectedSaleNumber(saleNumber);
    setSelectedDate("");
    setFilteredData(null);
    setCurrentPage(1);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedSaleNumber) {
      const selectedData = data.find(
        (item) =>
          item.saleDetailsAll.saleNumber === parseInt(selectedSaleNumber, 10)
      );
      setFilteredData(selectedData?.saleDetailsAll || null);
      setCurrentPage(1);
    }
  }, [selectedSaleNumber, data]);

  const availableDates = filteredData
    ? Object.keys(filteredData.dispatchDetails || {})
    : [];

  const currentDateData = selectedDate
    ? filteredData?.dispatchDetails[selectedDate] || []
    : [];
  const currentDateDataP = selectedDate
    ? filteredData?.packingDetails[selectedDate] || []
    : [];

  const currentData = currentDateData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  // const currentDataP = currentDateDataP.slice(
  //   (currentPage - 1) * rowsPerPage,
  //   currentPage * rowsPerPage
  // );

  return (
    <div className="min-h-screen bg-[#f5fef9] flex justify-center items-center">
      {loading ? (
        <HashLoader color="#36d7b7" />
      ) : (
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-6xl p-8">
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Yearly Dispatch Report
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

          {/* Sale Number Section */}
          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex-1 bg-white">
              <label className="text-lg font-medium text-gray-700 mb-2 block">
                Select Sale Number:
              </label>
              <div className="flex flex-wrap gap-2">
                {data.map((item) => (
                  <button
                    type="button"
                    key={item.saleDetailsAll.saleNumber}
                    onClick={() =>
                      handleSaleNumberChange(item.saleDetailsAll.saleNumber)
                    }
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      selectedSaleNumber === item.saleDetailsAll.saleNumber
                        ? "bg-green-600 text-white shadow-md"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-green-50"
                    }`}
                  >
                    {item.saleDetailsAll.saleNumber}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Filtered Data Section */}
          {filteredData && (
            <div>
              {/* Date Range */}
              <div className="flex flex-wrap gap-10 mb-6">
                <div className="flex flex-col items-start">
                  <label className="text-lg font-medium text-gray-700">
                    Catalogue Start Date
                  </label>
                  <span className="mt-2 text-green-600 font-semibold">
                    {filteredData.startDate
                      ? new Date(filteredData.startDate).toLocaleDateString(
                          "en-CA"
                        )
                      : ""}
                  </span>
                </div>
                <div className="flex flex-col items-start">
                  <label className="text-lg font-medium text-gray-700">
                    Catalogue End Date
                  </label>
                  <span className="mt-2 text-green-600 font-semibold">
                    {filteredData.endDate
                      ? new Date(filteredData.endDate).toLocaleDateString(
                          "en-CA"
                        )
                      : ""}
                  </span>
                </div>
              </div>

              {/* Date Selector */}
              <div className="mb-6">
                <label className="text-lg font-medium text-gray-700">
                  Select Sale Date:
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {availableDates.length > 0 ? (
                    availableDates.map((date) => (
                      <button
                        type="button"
                        key={date}
                        onClick={() => handleDateChange(date)}
                        className={`px-4 py-2 rounded-lg border transition-all ${
                          selectedDate === date
                            ? "bg-green-600 text-white shadow-md"
                            : "bg-white border-gray-300 text-gray-700 hover:bg-green-50"
                        }`}
                      >
                        {date}
                      </button>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      No available dates for selected sale number.
                    </p>
                  )}
                </div>
              </div>

              {/* Dispatch Table */}
              <p className="text-xl font-semibold text-gray-800 mb-3">
                Dispatch Details
              </p>
              <table className="min-w-full border border-gray-200 rounded-lg mb-10">
                <thead>
                  <tr className="bg-green-50 text-black font-semibold">
                    <th className="px-4 py-2 border border-gray-200">
                      Invoice No
                    </th>
                    <th className="px-4 py-2 border border-gray-200">
                      Category
                    </th>
                    <th className="px-4 py-2 border border-gray-200">
                      Weight of Bag
                    </th>
                    <th className="px-4 py-2 border border-gray-200">
                      Num of Bags
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center text-gray-400 py-6 italic"
                      >
                        No data available for the selected date
                      </td>
                    </tr>
                  ) : (
                    currentData.map((item, index) => (
                      <tr key={index} className="hover:bg-green-50 transition">
                        <td className="px-4 py-2 border border-gray-200 text-gray-700">
                          {item.data.invoicenumber}
                        </td>
                        <td className="px-4 py-2 border border-gray-200 text-gray-700">
                          {item.category}
                        </td>
                        <td className="px-4 py-2 border border-gray-200 text-gray-700">
                          {item.data.sizeofbag}
                        </td>
                        <td className="px-4 py-2 border border-gray-200 text-gray-700">
                          {item.data.numofbags}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tfoot className="bg-green-50 text-gray-600 font-medium">
                  <tr>
                    <td colSpan="4" className="px-4 py-2 text-center">
                      Total Number of Bags:{" "}
                      {currentData.reduce((acc, item) => {
                        const map = {
                          "10B": 10,
                          "15B": 15,
                          "20B": 20,
                          "30B": 30,
                          "40B": 40,
                        };
                        return acc + (map[item.data.numofbags] || 0);
                      }, 0)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="px-4 py-2 text-center">
                      Total Weight of Bags:{" "}
                      {currentData.reduce((acc, item) => {
                        const map = {
                          "10B": 10,
                          "15B": 15,
                          "20B": 20,
                          "30B": 30,
                          "40B": 40,
                        };
                        return (
                          acc +
                          (map[item.data.numofbags] || 0) * item.data.sizeofbag
                        );
                      }, 0)}
                    </td>
                  </tr>
                </tfoot>
              </table>

              {/* Packing Table */}
              <p className="text-xl font-semibold text-gray-800 mb-3">
                Packing Details
              </p>
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-green-50 text-black font-semibold">
                    <th className="px-4 py-2 border border-gray-200">
                      Invoice No
                    </th>
                    <th className="px-4 py-2 border border-gray-200">
                      Tea Mark
                    </th>
                    <th className="px-4 py-2 border border-gray-200">
                      Tea Category
                    </th>
                    <th className="px-4 py-2 border border-gray-200">
                      Weight of Bag
                    </th>
                    <th className="px-4 py-2 border border-gray-200">
                      Num of Bags
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(currentDateDataP).length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center text-gray-400 py-6 italic"
                      >
                        No data available for the selected date
                      </td>
                    </tr>
                  ) : (
                    Object.keys(currentDateDataP).map((key) => {
                      const categoryDetails = currentDateDataP[key];
                      return Object.keys(categoryDetails).map((subKey) => {
                        const categoryDetail = categoryDetails[subKey];
                        if (
                          Array.isArray(categoryDetail.data) &&
                          categoryDetail.data.length > 0
                        ) {
                          return categoryDetail.data.map((item, index) => (
                            <tr
                              key={`${item.invoiceNo}-${index}`}
                              className="hover:bg-green-50 transition"
                            >
                              <td className="px-4 py-2 border border-gray-200 text-gray-700">
                                {item.invoiceNo}
                              </td>
                              <td className="px-4 py-2 border border-gray-200 text-gray-700">
                                {item.teaMark}
                              </td>
                              <td className="px-4 py-2 border border-gray-200 text-gray-700">
                                {item.teacategory}
                              </td>
                              <td className="px-4 py-2 border border-gray-200 text-gray-700">
                                {item.sizeofbag}
                              </td>
                              <td className="px-4 py-2 border border-gray-200 text-gray-700">
                                {item.numofbags}
                              </td>
                            </tr>
                          ));
                        }
                        return null;
                      });
                    })
                  )}
                </tbody>
                <tfoot className="bg-green-50 text-gray-600 font-medium">
                  <tr>
                    <td colSpan="5" className="px-4 py-2 text-center">
                      Total Number of Bags:{" "}
                      {Object.keys(currentDateDataP).reduce((total, key) => {
                        const categoryDetails = currentDateDataP[key];
                        return (
                          total +
                          Object.keys(categoryDetails).reduce(
                            (subTotal, subKey) => {
                              const categoryDetail = categoryDetails[subKey];
                              if (
                                Array.isArray(categoryDetail.data) &&
                                categoryDetail.data.length > 0
                              ) {
                                return (
                                  subTotal +
                                  categoryDetail.data.reduce(
                                    (sum, item) => sum + item.numofbags,
                                    0
                                  )
                                );
                              }
                              return subTotal;
                            },
                            0
                          )
                        );
                      }, 0)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5" className="px-4 py-2 text-center">
                      Total Weight of Bags:{" "}
                      {Object.keys(currentDateDataP).reduce((total, key) => {
                        const categoryDetails = currentDateDataP[key];
                        return (
                          total +
                          Object.keys(categoryDetails).reduce(
                            (subTotal, subKey) => {
                              const categoryDetail = categoryDetails[subKey];
                              if (
                                Array.isArray(categoryDetail.data) &&
                                categoryDetail.data.length > 0
                              ) {
                                return (
                                  subTotal +
                                  categoryDetail.data.reduce(
                                    (sum, item) =>
                                      sum + item.numofbags * item.sizeofbag,
                                    0
                                  )
                                );
                              }
                              return subTotal;
                            },
                            0
                          )
                        );
                      }, 0)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DispatchReport;
