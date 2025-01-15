import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import { BASE_URL } from "../../../config";

const DispatchReport = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]); // Data from API
    const [selectedSaleNumber, setSelectedSaleNumber] = useState(""); // Selected Sale Number
    const [filteredData, setFilteredData] = useState(null); // Data filtered by Sale Number
    const [selectedDate, setSelectedDate] = useState(""); // Selected Date
    const rowsPerPage = 5; // Rows per page
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination  
    const [currentPageP, setCurrentPageP] = useState(1); // Current page for pagination  

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

    const handleSaleNumberChange = async (e) => {
        const saleNumber = e.target.value;
        setSelectedSaleNumber(saleNumber);
        setSelectedDate(""); // Reset date when sale number changes
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

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setCurrentPage(1); // Reset to the first page on date change
    };

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
                <div className="a1">
                    <div>
                        <div className="flex-col gap-3">
                            <p className="b1">Yearly Report</p>
                        </div>
                        <div className="flex flex-row gap-4 my-4">
                            <label className="text-lg">Select Sale Number:</label>
                            <select
                                value={selectedSaleNumber}
                                onChange={handleSaleNumberChange}
                                className="border text-[#070706] px-4 py-2"
                            >
                                <option value="">--Select--</option>
                                {data.map((item, index) => (
                                    <option key={index} value={item.saleDetailsAll.saleNumber}>
                                        {item.saleDetailsAll.saleNumber}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {filteredData && (
                        <div>
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row items-start justify-center h-40 max-w-md gap-8 px-4 pt-4 rounded-lg bg-slate-900">
                                    <div className="flex flex-col justify-center">
                                        <label className="text-[#d4cc3d]">
                                            Catalogue Start Date
                                        </label>
                                        <span className="mt-3 text-center">
                                            {filteredData.startDate
                                                ? new Date(filteredData.startDate).toLocaleDateString()
                                                : ""}
                                        </span>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <label className="text-[#D5D767]">
                                            Catalogue End Date
                                        </label>
                                        <span className="mt-3 text-center">
                                            {filteredData.endDate
                                                ? new Date(filteredData.endDate).toLocaleDateString()
                                                : ""}
                                        </span>
                                    </div>
                                    <div className="absolute flex flex-row top-[15px] right-[10px]">
                                        <select
                                            name="selectDate"
                                            className="px-4 py-2 border text-[#131919]"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                        >
                                            <option value="">Select a Date</option>
                                            {availableDates.map((date) => (
                                                <option key={date} value={date}>
                                                    {date}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p>Dispatch Details</p>
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
                            <div>
                                <p>Packing Details</p>
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
                                            <th className="px-4 py-2 border text-[#50EDED] border-gray-300">
                                                Weight of Bag
                                            </th>
                                            <th className="px-4 py-2 border text-[#50EDED] border-gray-300">
                                                Num of Bags
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(currentDateDataP).length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="text-center text-gray-500 px-4 py-2">
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
                                                    return null; // If no data, return null to avoid rendering issues.
                                                });
                                            })
                                        )}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="5" className="text-center text-gray-500 px-4 py-2">
                                                Total Number of Bags:  {Object.keys(currentDateDataP).reduce((total, key) => {
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
                                            <td colSpan="5" className="text-center text-gray-500 px-4 py-2">
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
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DispatchReport;
