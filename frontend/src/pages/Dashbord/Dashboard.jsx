import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import { BASE_URL } from "../../config";
import "./Dashboard.css";
import { toast } from "react-toastify";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart, Line,
} from "recharts";
import { FaLock, FaUser } from "react-icons/fa";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";

const Dashboard = () => {

  const [brokerData, setBrokerData] = useState([]);
  const [dispatchData, setDispatchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const today = new Date().toLocaleDateString();
  const [endDate, setEndDate] = useState(today);
  const { user, role, token } = useContext(authContext);
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
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
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

  const chartData = Object.values(brokerData).map((broker) => ({
    name: broker.broker,
    totalBags: broker.totalBags,
    numBags: broker.totalBags, // Add numBags to the data
    value: broker.totalWeight,
  }));

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/packing/end-date`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ endDate }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setLoading(false);
      toast.success(data.message);
      setEndDate(today); // Reset input field to today's date
      getMadeTeaF(); // Refresh the data by calling the get API
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };


  // Colors for the pie chart
  const COLORS = ["#ffb400", "#0020ff", "#A020F0",];

  useEffect(() => {
    getMadeTeaF();
  }, []);

  return (
    <div className="container">
      <div
        className="main-container">
        <div>
          <div className="flex-col gap-3">
            <p className="b1">Current Status {today}</p>
          </div>
          <div>

            <div className="b2">
              <p>Date       : {today}</p>
              <p>Sale Number: {data?.saleDetails?.saleNo ? (
                <p className="text-xl">{data.saleDetails.saleNo}</p>
              ) : (
                <p className="text-x4 text-[#fb3c52] width-full" >Please add new sale</p>
              )}</p>
            </div>
          </div>
          <div className="absolute flex flex-row top-[15px] right-[10px]">
            <FaUser className="text-2xl" />
            {user ? (
              <div>
                <h2>Hello, {user.name}!</h2>
              </div>
            ) : (
              <p>Please log in to access the Dashboard.</p>
            )}
          </div>
        </div>
        {/* <div className="flex flex-wrap justify-center gap-1 w-[100%] mb-8" style={{ width: "800px", marginTop: "50px" }}> */}

        <div className="flex flex-wrap justify-center gap-1 w-[100%] mb-8" style={{ width: "800px", marginTop: "50px" }}>
          <div className="flex justify-center items-start gap-6">
            <div className="flex flex-col items-center " style={{ width: "180px", top: "200px", borderRadius: "15px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>
              <div className="mb-5">
                <label className=" text-center">
                  Catalogue Start Date
                </label>
                <button type="button" className="flex items-center rounded-[5px] text-[16px] w-[150px] mt-3 ">
                  <span className="md-5">
                    {data?.saleDetails.startDate
                      ? new Date(data.saleDetails.startDate).toLocaleDateString()
                      : ""}
                  </span>
                  <i className="fas fa-calendar-alt text-xl dash-button md-8 mr-1 ml-3 text-blue-500"></i>
                  {/* Added margin-right for spacing */}
                </button>

              </div>
            </div>
            <div className="flex flex-col items-center " style={{ width: "180px", top: "200px", borderRadius: "15px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>
              <div className="mb-5">
                <label className=" text-center">
                  Catalogue End Date
                </label>


                <button type="button" className="flex items-center rounded-[5px] text-[16px] w-[150px] mt-3 ">
                  <span className="md-5">

                    {data?.saleDetails.endDate
                      ? new Date(data.saleDetails.endDate).toLocaleDateString()
                      : ""}   </span>
                  <i className="fas fa-calendar-alt text-xl dash-button md-8 mr-1 ml-3 text-blue-500 "></i>
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center " style={{ width: "180px", top: "200px", borderRadius: "15px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>
              <div className="mb-5">
                <label className=" text-center">
                  Amount of green leaf
                </label>
                <button type="button" className="flex items-center rounded-[5px] text-[16px] w-[150px] mt-3 ">
                  <span className="md-5 ml-6">
                    {data?.packingDetails &&
                      data.packingDetails.greenleaves !== null
                      ? data.packingDetails.greenleaves
                      : "Not add data"}</span>
                  {/* SVG for two green leaves */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="dash-button md-8 mr-1 ml-6 text-blue-500"
                    width="24"
                    height="24"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 8.5c0 2.49 1.69 4.65 3.85 6.57.58.48 1.15.93 1.65 1.33.65.54 1.15 1.03 1.5 1.6.34-.57.85-1.06 1.5-1.6.5-.4 1.07-.85 1.65-1.33C17.31 13.15 19 11.99 19 8.5c0-3.37-3.13-6.5-7-6.5zM12 10c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v3c0 .55-.45 1-1 1z"
                    />
                  </svg>
                </button>
              </div>

            </div><div className="flex flex-col items-center " style={{ width: "180px", top: "200px", borderRadius: "15px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>
              <div className="mb-5">
                <label className=" text-center">
                  Amount of tea made
                </label>
                <button type="button" className="flex items-center rounded-[5px] text-[16px] w-[150px] mt-3 ">
                  <span className="md-5 ml-6">
                    {data?.packingDetails && data.packingDetails.madetea !== null
                      ? data.packingDetails.madetea
                      : "Not add data"}
                  </span>              <i className="fas fa-calendar-day text-xl dash-button md-8 mr-1 ml-6 text-blue-500 "></i>
                </button>
              </div>

            </div>
            <div className="flex flex-col items-center " style={{ width: "180px", top: "200px", borderRadius: "15px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>               
  <div className="flex flex-col items-center " style={{ width: "180px", top: "200px", borderRadius: "15px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>               
  <div className="flex flex-col items-center " style={{ width: "180px", top: "200px", borderRadius: "15px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>               
  <div className="mb-5">                 
    <label className="text-center text-white block mb-3">                   
      Update End date                 
    </label>                 
    <form onSubmit={submitHandler}>                   
      <input                     
        type="date"                     
        name="endDate"                     
        className="text-white bg-transparent border border-white rounded-md px-3 py-2 w-full [color-scheme:dark] mb-4"                     
        value={endDate}                     
        required                     
        min={new Date().toISOString().split("T")[0]}                     
        onChange={(e) => setEndDate(e.target.value)}                   
      />                   
      <button 
        disabled={loading} 
        type="submit" 
        className="flex items-center justify-center rounded-[5px] text-[16px] w-[60px] h-[36px] mx-auto bg-[#54ed50] text-black font-medium"
      >                     
        {loading ? <HashLoader size={35} color="#ffffff" /> : "Save"}                   
      </button>                 
    </form>               
  </div>             
</div>            
</div>            
</div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-1 w-[100%] mb-8" style={{ width: "800px", marginTop: "50px" }}>
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
                    fill="#A020F0"
                    dataKey="value"
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ payload }) => {
                      if (payload && payload.length > 0) {
                        const { name, numBags } = payload[0].payload;
                        return (
                          <div className="custom-tooltip">
                            <p>{name}</p>
                            <p>Num of bags:{numBags}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                </PieChart>

              ) : (
                <div style={{ width: "300px", height: "300px", display: "flex", justifyContent: "center" }}><p className="text-gray-500 mt-4">Opps! No data available</p></div>
              )}
            </div>

            {/* Bar Chart - 75% Width */}
            <div
              className="flex flex-col items-center"
              style={{
                width: "750px",
                height: "480px",
                color: "#fff",
                borderRadius: "15px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              <h2 className="text-xl text-center mb-4">Dispatch Data Overview</h2>
              {dispatchData && dispatchData.length > 0 ? (
                <ResponsiveContainer width="100%" height={450}>
                  <LineChart data={dispatchData}>
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
                      wrapperStyle={{ outline: "none" }}
                      itemStyle={{ background: "none", fontSize: "14px" }}
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
                    <Line type="monotone" dataKey="totalBags" stroke="#A020F0" name="Total Bags" />
                    <Line type="monotone" dataKey="totalWeight" stroke="#0020ff" name="Total Weight (kg)" />
                    <Legend
                      contentStyle={{ border: "1px solid #ccc", background: "none", color: "#000" }}
                      wrapperStyle={{ outline: "none" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500 mt-4">This will show when you add new sale details.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Dashboard;
