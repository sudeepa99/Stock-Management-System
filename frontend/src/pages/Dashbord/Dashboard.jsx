import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { useContext } from "react";

import { authContext } from "../../context/AuthContext";
import { BASE_URL } from "../../config";

const Dashboard = () => {
  const [brokerData, setBrokerData] = useState([]);
  const [dispatchData, setDispatchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const today = new Date().toLocaleDateString();
  const [endDate, setEndDate] = useState(today);
  const { user } = useContext(authContext);
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
          throw new Error(
            responseData.message || "Failed to fetch made tea data"
          );
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const responseData = await res.json();

        if (!res.ok) {
          throw new Error(
            responseData.message || "Failed to fetch dispatch data"
          );
        }

        // Process dispatch data for bar chart
        const dispatchDataProcessed = Object.keys(responseData.data || {}).map(
          (date) => {
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
          }
        );

        setDispatchData(dispatchDataProcessed);
      } catch (err) {
        console.error(err);
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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  const COLORS = ["#ffb400", "#0020ff", "#A020F0"];

  useEffect(() => {
    getMadeTeaF();
  }, []);

  return (
    <div className="bg-[#f5fff8] min-h-screen p-6">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">
            Current Status – {today}
          </h1>
          {user ? (
            <p className="text-gray-600">
              Hello, <span className="font-semibold">{user.name}</span>
            </p>
          ) : (
            <p className="text-gray-500">Please log in</p>
          )}
        </div>

        {/* Sale Details */}
        <div className="bg-white shadow-sm rounded-xl p-4 mb-6 border">
          <p className="text-gray-600">Date: {today}</p>
          <p className="text-gray-600">
            Sale Number:{" "}
            {data?.saleDetails?.saleNo ? (
              <span className="font-semibold text-green-600">
                {data.saleDetails.saleNo}
              </span>
            ) : (
              <span className="text-red-500">Please add new sale</span>
            )}
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
            <h3 className="text-sm text-gray-500">Catalogue Start Date</h3>
            <p className="mt-2 font-semibold text-green-600">
              {data?.saleDetails.startDate
                ? new Date(data.saleDetails.startDate).toLocaleDateString()
                : "-"}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
            <h3 className="text-sm text-gray-500">Catalogue End Date</h3>
            <p className="mt-2 font-semibold text-green-600">
              {data?.saleDetails.endDate
                ? new Date(data.saleDetails.endDate).toLocaleDateString()
                : "-"}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
            <h3 className="text-sm text-gray-500">Green Leaf</h3>
            <p className="mt-2 font-semibold text-green-600">
              {data?.packingDetails?.greenleaves ?? "-"}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
            <h3 className="text-sm text-gray-500">Tea Made</h3>
            <p className="mt-2 font-semibold text-green-600">
              {data?.packingDetails?.madetea ?? "-"}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
            <h3 className="text-sm text-gray-500">Update End Date</h3>
            <form onSubmit={submitHandler} className="mt-2">
              <input
                type="date"
                className="border rounded-lg px-2 py-1 text-sm w-full"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white rounded-lg py-1 text-sm"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border rounded-xl shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Broker Details
            </h2>
            {chartData && chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    dataKey="value"
                    outerRadius={100}
                    innerRadius={40}
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ payload }) => {
                      if (payload && payload.length > 0) {
                        const { name, numBags } = payload[0].payload;
                        return (
                          <div className="bg-white p-2 border rounded shadow">
                            <p className="font-semibold">{name}</p>
                            <p>Number of bags: {numBags}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-500">No broker data available</p>
              </div>
            )}
          </div>

          <div className="bg-white border rounded-xl shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Dispatch Data Overview
            </h2>
            {dispatchData && dispatchData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dispatchData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="totalBags"
                    stroke="#00B050"
                    strokeWidth={2}
                    name="Total Bags"
                  />
                  <Line
                    type="monotone"
                    dataKey="totalWeight"
                    stroke="#0020ff"
                    strokeWidth={2}
                    name="Total Weight (kg)"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-500">No dispatch data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
