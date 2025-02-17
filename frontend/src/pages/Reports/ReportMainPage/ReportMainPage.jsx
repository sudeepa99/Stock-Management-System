import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
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
import { toast } from "react-toastify";

import { Link } from 'react-router-dom';
import { BASE_URL } from "../../../config";

const ReportMainPage = () => {

    const [data, setData] = useState(null); // Initialize data state
    const rowsPerPage = 5; // Set number of rows per page
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageP, setCurrentPageP] = useState(1);
    const [loading, setLoading] = useState(false);
    const [copiedInvoice, setCopiedInvoice] = useState(null);

    const handleCopy = (invoiceNo) => {
        navigator.clipboard.writeText(invoiceNo)
            .then(() => {
                setCopiedInvoice(invoiceNo);
                setTimeout(() => setCopiedInvoice(null), 2000);
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
            });
    };


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
            toast.success(responseData.message);
        } catch (err) {
            console.log(5555);

            setTimeout(() => {
                toast.error(err.message);
            }, 2000);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMadeTeaF();
    }, []);

    const getAggregatedData = (details) => {
        if (!details) return [];
        return Object.keys(details).reduce((acc, key) => {
            const categoryDetails = details[key];
            if (Array.isArray(categoryDetails.data)) {
                acc.push(...categoryDetails.data);
            }
            return acc;
        }, []);
    };

    const dispatchDetails = getAggregatedData(data?.dispatchDetails);
    const packingDetails = getAggregatedData(data?.packingDetails);

    const totalPages = Math.ceil(dispatchDetails.length / rowsPerPage);
    const totalPagesP = Math.ceil(packingDetails.length / rowsPerPage);

    const currentDispatchData = dispatchDetails.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const currentPackingData = packingDetails.slice(
        (currentPageP - 1) * rowsPerPage,
        currentPageP * rowsPerPage
    );

    const handlePageChange = (setPage, pageNumber, total) => {
        if (pageNumber > 0 && pageNumber <= total) {
            setPage(pageNumber);
        }
    };

    return (
        <div className="container">
            {loading ? (
                <HashLoader color="#36d7b7" />
            ) : (
                <div className="main-container">
                    <div>
                        <p className="b1">Report</p>
                        <div className="b3">
                            <p className="b3">Today {today}</p>
                        </div>
                        <p className="b2">Here you can see how your dispatch is going</p>
                    </div>
                    <div>

                        <div className="flex flex-row justify-between ">
                            <div className="flex flex-row items-start justify-center h-20 max-w-md gap-1 px-4 pt-1 rounded-lg " style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>
                                <div className="mb-5">
                                    <label className="text-[#50EDED] text-center">
                                        Weekly Report
                                    </label>
                                    <Link to="/reportW">
                                        <button type="button" className="bg-[#54ed50] text-center rounded-[5px] text-[20px] w-[150px] mt-3" >
                                            <i className="fas fa-calendar-week text-xl"></i>
                                            Weekly
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            <div className="flex flex-row items-start justify-center h-20 max-w-md gap-1 px-4 pt-1 rounded-lg " style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>
                                <div className="mb-5">
                                    <label className="text-[#50EDED] text-center">
                                        Yearly Report
                                    </label>

                                    <Link to="/reportY">

                                        <button type="button" className="bg-[#54ED50] text-center rounded-[5px] text-[20px] w-[150px] mt-3">
                                            <i className="fas fa-calendar-alt text-xl "></i>
                                            Yearly
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            <div className="flex flex-row items-start justify-center h-20 max-w-md gap-1 px-4 pt-1 rounded-lg" style={{ boxShadow: "0 0 10px rgba(5, 1, 47, 0.5)" }}>
                                <div className="mb-5">
                                    <label className="text-[#50EDED] text-center">
                                        Broker Report
                                    </label>
                                    <Link to="/reportB">

                                        <button type="button" className="bg-[#54ed50] text-center rounded-[5px] text-[20px] w-[150px] mt-3">
                                            <i className="fas fa-user-tie text-xl "></i>
                                            Broker
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            <div className="flex flex-row items-start justify-center h-20 max-w-md gap-1 px-4 pt-1 rounded-lg " style={{ boxShadow: "0 0 10px rgba(5, 1, 47, 0.5)" }}>
                                <div className="mb-5">
                                    <label className="text-[#50EDED] text-center">
                                        Daily Report
                                    </label>
                                    <Link to="/reportD">
                                        <button type="button" className="bg-[#54ed50] text-center rounded-[5px] text-[20px] w-[150px] h-[30px] mt-3">
                                            <i className="fas fa-calendar-day text-xl "></i>
                                            Daily
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                    <p className="table-name">Today Packing Details</p>
                    <table className="min-w-full mt-10 border border-collapse border-gray-300">
                        <thead>
                            <tr className="bg-transparent">
                                <th className="px-4 py-2 border  text-[#50EDED] border-gray-300 font-light ">Invoice No</th>
                                <th className="px-4 py-2 border  text-[#50EDED] border-gray-300 font-light">Tea Mark</th>
                                <th className="px-4 py-2 border  text-[#50EDED] border-gray-300 font-light">Tea Category</th>
                                <th className="px-4 py-2 text-[#50EDED] border border-gray-300 font-light">Weight of Bag</th>
                                <th className="px-4 py-2 text-[#50EDED] border border-gray-300 font-light">Num of Bags</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.packingDetails == null ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-2 text-center text-red-500 border border-gray-300"
                                    >
                                        Today still didn't packing details
                                    </td>
                                </tr>
                            ) : (
                                currentPackingData.map((item) => (
                                    <tr key={item.invoiceNo}>
                                        <td
                                            className="px-4 py-2 border border-gray-300 cursor-pointer"
                                            onClick={() => handleCopy(item.invoiceNo)}
                                        >
                                            {item.invoiceNo}
                                            {copiedInvoice === item.invoiceNo && (
                                                <span className="ml-2 text-green-500">Copied!</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300">{item.teaMark}</td>
                                        <td className="px-4 py-2 border border-gray-300">{item.teacategory}</td>
                                        <td className="px-4 py-2 border border-gray-300">{item.sizeofbag}</td>
                                        <td className="px-4 py-2 border border-gray-300">{item.numofbags}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-4">
                        <button onClick={() => handlePageChange(setCurrentPageP, currentPageP - 1, totalPagesP)} disabled={currentPageP === 1}
                            className="px-4 py-2 mx-1 border border-gray-300 text-gray-500 disabled:opacity-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.707 4.293a1 1 0 010 1.414L4.414 9H16a1 1 0 110 2H4.414l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button onClick={() => handlePageChange(setCurrentPageP, currentPageP + 1, totalPagesP)} disabled={currentPageP === totalPagesP}
                            className="px-4 py-2 mx-1 border border-gray-300 text-gray-500 disabled:opacity-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 15.707a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <p className="table-name">Sale Dispatch Details</p>
                    <div>
                        <table className="min-w-full mt-10 border border-collapse border-gray-300">
                            <thead>
                                <tr className="bg-transparent">
                                    <th className="px-4 py-2 border  text-[#50EDED] border-gray-300 font-light">
                                        Invoice No
                                    </th>
                                    <th className="px-4 py-2 border  text-[#50EDED] border-gray-300 font-light">
                                        Date
                                    </th>
                                    <th className="px-4 py-2 text-[#50EDED] border border-gray-300 font-light">
                                        Weight of Bag
                                    </th>
                                    <th className="px-4 py-2 text-[#50EDED] border border-gray-300 font-light">
                                        Num of Bags
                                    </th>
                                    <th className="px-4 py-2 text-[#50EDED] border border-gray-300 font-light">
                                        Broker
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.dispatchDetails == null ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-4 py-2 text-center text-red-500 border border-gray-300"
                                        >
                                            New sale not yet dispatched
                                        </td>
                                    </tr>
                                ) : (
                                    currentDispatchData.map((item) => (
                                        <tr key={item._id}>
                                            <td className="px-4 py-2 border border-gray-300">{item.invoicenumber}</td>
                                            <td className="px-4 py-2 border border-gray-300">
                                                {item.date ? new Date(item.date).toLocaleDateString() : ""}
                                            </td>
                                            <td className="px-4 py-2 border border-gray-300">{item.sizeofbag}</td>
                                            <td className="px-4 py-2 border border-gray-300">{item.numofbags}</td>
                                            <td className="px-4 py-2 border border-gray-300">{item.broker}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        {/* Pagination Controls */}
                        <div className="flex justify-center mt-4">
                            <button onClick={() => handlePageChange(setCurrentPage, currentPage - 1, totalPages)} disabled={currentPage === 1}
                                className="px-4 py-2 mx-1 border border-gray-300 text-gray-500 disabled:opacity-50">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.707 4.293a1 1 0 010 1.414L4.414 9H16a1 1 0 110 2H4.414l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button onClick={() => handlePageChange(setCurrentPage, currentPage + 1, totalPages)} disabled={currentPage === totalPages}
                                className="px-4 py-2 mx-1 border border-gray-300 text-gray-500 disabled:opacity-50">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.293 15.707a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default ReportMainPage;
