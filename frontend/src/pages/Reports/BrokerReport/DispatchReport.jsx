import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import { BASE_URL } from "../../../config";
import { Link } from 'react-router-dom';

import "./DispatchReport.css";
const today = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
});
const DispatchReport = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentDay, setCurrentDay] = useState("Farbas"); // Default to Farbas
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 25; // Number of rows per page
    const daysOfWeek = ["Farbas", "Mercantile", "JKeels"];

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
                throw new Error(responseData.message || "Failed to fetch made tea data");
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

    // Get data for the current day
    const currentDayData =
        data?.[`broker${currentDay}Details`]?.flatMap((item) => item ? [item] : []) || [];

    // Pagination logic
    const totalPages = Math.ceil(currentDayData.length / rowsPerPage);

    const currentData = currentDayData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );
    const handleDayChange = (day) => {
        setCurrentDay(day);
        setCurrentPage(1); // Reset page to 1 when changing the day
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="container">
            {loading ? (
                <HashLoader color="#36d7b7" />
            ) : (
                <div className="sub-container">
                    <div>
                        <div className="flex-col gap-3">
                            <p className="b1">Weekly Report according to brokers</p>
                            <div className="b5">
                                <Link to="/report">
                                    <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i>
                                    Go to Main Report
                                </Link>
                            </div>
                        </div>
                        <div className="b3">
                            <p className="b3">Today {today}</p>
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
                                        Date
                                    </th>
                                    <th className="px-4 py-2 text-[#50EDED] border border-gray-300">
                                        Category
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
                                {currentData.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center text-gray-500 px-4 py-2">
                                            This date has no data entered
                                        </td>
                                    </tr>
                                ) : (
                                    currentData.map((item) => (
                                        <tr key={item._id}>
                                            <td className="px-4 py-2 border border-gray-300">
                                                {item.data.invoicenumber}
                                            </td>
                                            <td className="px-4 py-2 border border-gray-300">
                                                {new Date(item.data.date).toLocaleDateString()}
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

                        {/* Day Selector */}
                        <div className="flex justify-center mb-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 mx-1 border border-gray-300 text-gray-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.707 4.293a1 1 0 010 1.414L4.414 9H16a1 1 0 110 2H4.414l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {daysOfWeek.map((day) => (
                                <button
                                    key={day}
                                    onClick={() => handleDayChange(day)}
                                    className={`px-4 py-2 mx-1 border border-gray-300 ${currentDay === day ? "bg-[#29d83e] text-white" : "text-gray-500"
                                        }`}
                                >
                                    {day}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 mx-1 border border-gray-300 text-gray-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.293 15.707a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        {/* Pagination */}


                    </div>
                </div>
            )}
        </div>
    );
};

export default DispatchReport;
