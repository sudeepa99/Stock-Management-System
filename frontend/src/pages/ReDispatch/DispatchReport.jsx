import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import { BASE_URL } from "../../config";
import "./DispatchReport.css";

const DispatchReport = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
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

    // Flatten the data for current pagination
    const flattenedData = Object.entries(data || {}).flatMap(([date, entries]) =>
        entries.map((entry) => ({
            date,
            ...entry,
        }))
    );

    // Pagination logic
    const totalPages = Math.ceil(flattenedData.length / rowsPerPage);

    const currentData = flattenedData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

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
                <div className="a1">
                    <div>
                        <div className="flex-col gap-3">
                            <p className="b1">Dispatch Weekly Report</p>
                        </div>
                    </div>

                    <div>
                        <table className="min-w-full mt-10 border border-collapse border-gray-300">
                            <thead>
                                <tr className="bg-transparent">
                                    <th className="px-4 py-2 border text-[#50EDED] border-gray-300">
                                        Date
                                    </th>
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
                                        <td colSpan="5" className="text-center text-gray-500 px-4 py-2">
                                            No data available for the selected date range
                                        </td>
                                    </tr>
                                ) : (
                                    currentData.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2 border border-gray-300">
                                                {item.date}
                                            </td>
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
                        </table>

                        {/* Pagination */}
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 mx-1 border border-gray-300 text-gray-500"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 mx-1 border border-gray-300 text-gray-500"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DispatchReport;
