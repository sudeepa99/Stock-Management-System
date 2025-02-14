import React, { useState, useEffect } from "react";
import {
    PieChart, Pie, Cell, Tooltip, Legend, BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid, ResponsiveContainer
} from "recharts";
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
    const [brokerData, setBrokerData] = useState([]);
    const [dispatchData, setDispatchData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
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

                // Process broker data
                const brokerDetails = [
                    ...(responseData.data.brokerFarbasDetails || []),
                    ...(responseData.data.brokerMercantileDetails || []),
                    ...(responseData.data.brokerJKeelsDetails || []),
                ];

                const brokerDataProcessed = brokerDetails.reduce((acc, item) => {
                    const broker = item.data.broker || "Unknown"; // Extract broker from nested structure
                    const numBags =
                        item.data.numofbags === "10B"
                            ? 10
                            : item.data.numofbags === "20B"
                                ? 20
                                : item.data.numofbags === "15B"
                                    ? 15
                                    : item.data.numofbags === "30B"
                                        ? 30
                                        : item.data.numofbags === "40B"
                                            ? 40
                                            : 0;

                    const totalWeight = numBags * (item.data.sizeofbag || 0); // Ensure sizeofbag is handled safely

                    if (!acc[broker]) {
                        acc[broker] = {
                            broker,
                            totalBags: 0,
                            totalWeight: 0,
                        };
                    }

                    acc[broker].totalBags += numBags;
                    acc[broker].totalWeight += totalWeight;

                    return acc;
                }, {});

                setBrokerData(Object.values(brokerDataProcessed));
            } catch (err) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };

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

                // Process dispatch data for bar chart
                const dispatchDataProcessed = Object.keys(responseData.data || {}).map((date) => {
                    const dateData = responseData.data[date] || [];
                    const totalBags = dateData.reduce((acc, item) => {
                        let numBags = parseInt(item.data.numofbags.replace("B", "")) || 0;
                        return acc + numBags;
                    }, 0);
                    const totalWeight = dateData.reduce((acc, item) => {
                        let numBags = parseInt(item.data.numofbags.replace("B", "")) || 0;
                        return acc + numBags * item.data.sizeofbag;
                    }, 0);
                    return { date, totalBags, totalWeight };
                });

                setDispatchData(dispatchDataProcessed);
            } catch (err) {
            } finally {
                setLoading(false);
            }
        };

        getMadeTeaF();
        getDispatchData();
    }, []); // Empty dependency array to run only on mount

    const chartData = Object.values(brokerData).map((broker) => ({
        name: broker.broker,
        value: broker.totalWeight, // Use totalWeight or totalBags as needed
    }));

    // Colors for the pie chart
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0", "#FF6384"];

    return (
        <div className="container">
            {loading ? (
                <HashLoader color="#36d7b7" />
            ) : (
                <div className="sub-container">
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
                    <div className="flex flex-wrap justify-center gap-9 m-7 ">
                        <div className="flex justify-center items-start gap-6">
                            {/* Pie Chart - 25% Width */}
                            <div className="flex flex-col items-center " style={{ width: "25%", top: "200px", borderRadius: "15px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>
                                <h2 className="text-xl text-center mb-8">Broker Details</h2>
                                {chartData && chartData.length > 0 ? (
                                    <PieChart width={300} height={300}>
                                        <Pie
                                            data={chartData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            innerRadius={40}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                ) : (
                                    <div style={{ width: "300px", height: "300px", display: "flex", justifyContent: "center" }}><p className="text-gray-500 mt-4">Opps! No data available</p></div>
                                )}
                            </div>

                            {/* Bar Chart - 75% Width */}
                            <div className="flex flex-col items-center " style={{ width: "75%", width: "750px", height: "480px", color: "#fff", borderRadius: "15px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>
                                <h2 className="text-xl text-center mb-4">Dispatch Data Overview</h2>
                                {dispatchData && dispatchData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={450}>
                                        <BarChart data={dispatchData}>
                                            <XAxis
                                                dataKey="date"
                                                interval={0}
                                                tick={{ angle: -90, textAnchor: "end" }}
                                                height={90}
                                                style={{ color: "red" }}
                                            />
                                            <YAxis />
                                            <Tooltip
                                                contentStyle={{
                                                    border: "1px solid #ddd",
                                                    background: "none",
                                                    borderRadius: "8px",
                                                    boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                                                }}
                                                wrapperStyle={{
                                                    outline: "none",
                                                }}
                                                itemStyle={{
                                                    background: "none",
                                                    fontSize: "14px",
                                                }}
                                                labelStyle={{
                                                    background: "none",
                                                    color: "#888",
                                                    fontWeight: "bold",
                                                    fontSize: "16px",
                                                }}
                                                labelFormatter={(label) => `Date: ${label}`}
                                                separator=" | "
                                                cursor={{
                                                    fill: "none",
                                                    stroke: "#000",
                                                    strokeWidth: 2,
                                                }}
                                                isAnimationActive={false}
                                            />
                                            <Bar dataKey="totalBags" fill="#8884d8" name="Total Bags" />
                                            <Bar dataKey="totalWeight" fill="#82ca9d" name="Total Weight (kg)" />
                                            <Legend
                                                contentStyle={{
                                                    border: "1px solid #ccc",
                                                    background: "none",
                                                    color: "#000",
                                                }}
                                                wrapperStyle={{ outline: "none" }}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <p className="text-gray-500 mt-4">This will show when you add new sale details.</p>
                                )}
                            </div>
                        </div>



                    </div>

                </div>
            )}
        </div>
    );
};

export default ReportMainPage;
