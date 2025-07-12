import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import { BASE_URL } from "../../../config";
import { Link } from 'react-router-dom';

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
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]); // Data from API
    const [selectedSaleNumber, setSelectedSaleNumber] = useState(""); // Selected Sale Number
    const [filteredData, setFilteredData] = useState(null); // Data filtered by Sale Number
    const [selectedDate, setSelectedDate] = useState(""); // Selected Date
    const rowsPerPage = 5; // Rows per page
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination  

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
                setSelectedSaleNumber(fetchedData[fetchedData.length - 1].saleDetailsAll.saleNumber);
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
        setSelectedDate(""); // Reset date when sale number changes
        setFilteredData(null); // Reset filtered data
        setCurrentPage(1); // Reset pagination
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setCurrentPage(1); // Reset pagination when date changes
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedSaleNumber) {
            const selectedData = data.find(
                (item) => item.saleDetailsAll.saleNumber === parseInt(selectedSaleNumber, 10)
            );
            setFilteredData(selectedData?.saleDetailsAll || null);
            setCurrentPage(1); // Reset to page 1 when sale number changes
        }
    }, [selectedSaleNumber, data]);

    const availableDates = filteredData
        ? Object.keys(filteredData.dispatchDetails || {})
        : [];

    const currentDateData = selectedDate ? filteredData?.dispatchDetails[selectedDate] || [] : [];
    const currentDateDataP = selectedDate ? filteredData?.packingDetails[selectedDate] || [] : [];

    const currentData = currentDateData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );
    const currentDataP = currentDateDataP.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div className="container">
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <HashLoader color="#36d7b7" />
                </div>
            ) : (
                <div className="main-container">
                    <div>
                        <div className="flex-col gap-3">
                            <p className="b1">Yearly Report</p>
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
                        <div className="flex flex-row gap-4 my-2">
                            <div className="w-1/2">
                                <label className="text-lg">Select Sale Number:</label>
                                {/* Sale Number Buttons */}
                                <div className="sale-number-selection">
                                    {data.map((item) => (
                                        <button
                                            type="button"
                                            key={item.saleDetailsAll.saleNumber}
                                            className={`sale-button ${selectedSaleNumber === item.saleDetailsAll.saleNumber ? 'selected' : ''}`}
                                            onClick={() => handleSaleNumberChange(item.saleDetailsAll.saleNumber)}
                                        >
                                            {item.saleDetailsAll.saleNumber}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="w-1/2">

                            </div>
                        </div>
                    </div>

                    {filteredData && (
                        <div>

                            <div className="flex flex-row ">
                                <div className="flex flex-col ">
                                    <label className="text-lg">Catalogue Start Date</label>
                                    <span className="mt-3 text-center text-[#54ed50] date-button">
                                        {filteredData.startDate
                                            ? new Date(filteredData.startDate).toLocaleDateString('en-CA') // 'en-CA' format is YYYY-MM-DD
                                            : ""}
                                    </span>
                                </div>
                                <div className="p-10"> </div>
                                <div className=" flex flex-col ">
                                    <label className="text-lg">Catalogue End Date</label>
                                    <span className="mt-3 text-center text-[#54ed50] date-button">
                                        {filteredData.endDate
                                            ? new Date(filteredData.endDate).toLocaleDateString('en-CA') // 'en-CA' format is YYYY-MM-DD
                                            : ""}
                                    </span>
                                </div>

                            </div>

                            <div>
                                <label className="text-lg">Select Sale Date:</label>
                                {/* Sale Date Buttons */}
                                <div className="date-number-selection">
                                    {availableDates.length > 0 ? (
                                        availableDates.map((date) => (
                                            <button
                                                type="button"
                                                key={date}
                                                className={`date-button ${selectedDate === date ? 'selected' : ''}`}
                                                onClick={() => handleDateChange(date)}
                                            >
                                                {date}
                                            </button>
                                        ))
                                    ) : (
                                        <p>No available dates for selected sale number.</p>
                                    )}
                                </div>
                            </div>
                            {/* Dispatch Details Table */}
                            <p>Dispatch Details</p>
                            <table className="min-w-full mt-10 border border-collapse border-gray-300">
                                <thead>
                                    <tr className="bg-transparent">
                                        <th className="px-4 py-2 border text-[#50EDED] border-gray-300">Invoice No</th>
                                        <th className="px-4 py-2 border text-[#50EDED] border-gray-300">Category</th>
                                        <th className="px-4 py-2 border text-[#50EDED] border-gray-300">Weight of Bag</th>
                                        <th className="px-4 py-2 border text-[#50EDED] border-gray-300">Num of Bags</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="text-center text-gray-300 px-4 py-2">
                                                No data available for the selected date
                                            </td>
                                        </tr>
                                    ) : (
                                        currentData.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2 border border-gray-300">
                                                    {item.data.invoicenumber}
                                                </td>
                                                <td className="px-4 py-2 border border-gray-300">{item.category}</td>
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
                                        <td colSpan="4" className="text-center text-gray-300 px-4 py-2">
                                            Total Number of Bags: {currentData.reduce((acc, item) => {
                                                let numBags = 0;
                                                if (item.data.numofbags === "10B") numBags = 10;
                                                else if (item.data.numofbags === "20B") numBags = 20;
                                                else if (item.data.numofbags === "15B") numBags = 15;
                                                else if (item.data.numofbags === "30B") numBags = 30;
                                                else if (item.data.numofbags === "40B") numBags = 40;
                                                return acc + numBags;
                                            }, 0)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" className="text-center text-gray-300 px-4 py-2">
                                            Total Weight of Bags: {currentData.reduce((acc, item) => {
                                                let numBags = 0;
                                                if (item.data.numofbags === "10B") numBags = 10;
                                                else if (item.data.numofbags === "20B") numBags = 20;
                                                else if (item.data.numofbags === "15B") numBags = 15;
                                                else if (item.data.numofbags === "30B") numBags = 30;
                                                else if (item.data.numofbags === "40B") numBags = 40;
                                                return acc + numBags * item.data.sizeofbag;
                                            }, 0)}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>

                            {/* Packing Details Table */}
                            <p>Packing Details</p>
                            <table className="min-w-full mt-10 border border-collapse border-gray-300">
                                <thead>
                                    <tr className="bg-transparent">
                                        <th className="px-4 py-2 border text-[#50EDED] border-gray-300">Invoice No</th>
                                        <th className="px-4 py-2 border text-[#50EDED] border-gray-300">Tea Mark</th>
                                        <th className="px-4 py-2 border text-[#50EDED] border-gray-300">Tea Category</th>
                                        <th className="px-4 py-2 border text-[#50EDED] border-gray-300">Weight of Bag</th>
                                        <th className="px-4 py-2 border text-[#50EDED] border-gray-300">Num of Bags</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(currentDateDataP).length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center text-gray-300 px-4 py-2">
                                                No data available for the selected date
                                            </td>
                                        </tr>
                                    ) : (
                                        Object.keys(currentDateDataP).map((key) => {
                                            const categoryDetails = currentDateDataP[key];
                                            return Object.keys(categoryDetails).map((subKey) => {
                                                const categoryDetail = categoryDetails[subKey];
                                                if (Array.isArray(categoryDetail.data) && categoryDetail.data.length > 0) {
                                                    return categoryDetail.data.map((item, index) => (
                                                        <tr key={`${item.invoiceNo}-${index}`}>
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
                                                return null;
                                            });
                                        })
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="5" className="text-center text-gray-300 px-4 py-2">
                                            Total Number of Bags: {Object.keys(currentDateDataP).reduce((total, key) => {
                                                const categoryDetails = currentDateDataP[key];
                                                return total + Object.keys(categoryDetails).reduce((subTotal, subKey) => {
                                                    const categoryDetail = categoryDetails[subKey];
                                                    if (Array.isArray(categoryDetail.data) && categoryDetail.data.length > 0) {
                                                        return subTotal + categoryDetail.data.reduce((sum, item) => sum + item.numofbags, 0);
                                                    }
                                                    return subTotal;
                                                }, 0);
                                            }, 0)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="5" className="text-center text-gray-300 px-4 py-2">
                                            Total Weight of Bags: {Object.keys(currentDateDataP).reduce((total, key) => {
                                                const categoryDetails = currentDateDataP[key];
                                                return total + Object.keys(categoryDetails).reduce((subTotal, subKey) => {
                                                    const categoryDetail = categoryDetails[subKey];
                                                    if (Array.isArray(categoryDetail.data) && categoryDetail.data.length > 0) {
                                                        return subTotal + categoryDetail.data.reduce((sum, item) => sum + item.numofbags * item.sizeofbag, 0);
                                                    }
                                                    return subTotal;
                                                }, 0);
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
