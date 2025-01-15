import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import { BASE_URL } from "../../../config";
import "./DispatchReport.css";

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
                throw new Error(responseData.message || "Failed to fetch dispatch data");
            }

            setData(responseData.data); // Set the dateRangeDetails object

            const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
            setSelectedDate(responseData.data[today] ? today : Object.keys(responseData.data)?.[0] || ""); // Set default date to today if it exists, otherwise the first available date
        } catch (err) {
            console.error("Error fetching dispatch data:", err);
            alert(`Error: ${err.message}`);
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
        <div className="container">
            {loading ? (
                <HashLoader color="#36d7b7" />
            ) : (
                <div className="a1">
                    <div>
                        <div className="flex-col gap-3">
                            <p className="b1">Dispatch Report per day</p>
                        </div>
                        {/* Date Selector */}
                        <div className="absolute flex flex-row top-[15px] right-[10px]">
                            <select
                                name="selectDate"
                                className="px-4 py-2 border text-[#131919]"
                                value={selectedDate}
                                onChange={handleDateChange}
                            >
                                <option value="">Select a Date</option>
                                {Object.keys(data || {}).map((date) => (
                                    <option key={date} value={date}>
                                        {date}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <table className="min-w-full mt-10 border border-collapse border-gray-300">
                            <thead>
                                <tr className="bg-transparent">
                                    <th className="px-4 py-2 border text-[#50EDED] border-gray-300">
                                        Invoice No
                                    </th>
                                    <th className="px-4 py-2 border text-[#50EDED] border-gray-300">
                                        Category
                                    </th>
                                    <th className="px-4 py-2 border text-[#50EDED] border-gray-300">
                                        Weight of Bag
                                    </th>
                                    <th className="px-4 py-2 border text-[#50EDED] border-gray-300">
                                        Num of Bags
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center text-gray-500 px-4 py-2">
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
                                    <td colSpan="4" className="text-center text-gray-500 px-4 py-2">
                                        Total Number of Bags: {currentData.reduce((acc, item) => {
                                            let numBags = 0;
                                            if (item.data.numofbags === "10B") {
                                                numBags = 10;
                                            } else if (item.data.numofbags === "20B") {
                                                numBags = 20;

                                            }
                                            else if (item.data.numofbags === "15B") {
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
                                    <td colSpan="4" className="text-center text-gray-500 px-4 py-2">
                                        Total Weight of Bags:
                                        {currentData.reduce((acc, item) => {
                                            let numBags = 0;
                                            if (item.data.numofbags === "10B") {
                                                numBags = 10;
                                            } else if (item.data.numofbags === "20B") {
                                                numBags = 20;

                                            }
                                            else if (item.data.numofbags === "15B") {
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
