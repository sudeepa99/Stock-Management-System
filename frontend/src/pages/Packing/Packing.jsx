import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

import { BASE_URL } from "../../config";

import Packing1 from "./Packing1.jsx";
import Packing2 from "./Packing2.jsx";

const Packing = () => {
  const [loading, setLoading] = useState(false);
  const [madeTea, setMadeTea] = useState(null);
  const [error, setError] = useState("");
  const [getEndDate, setGetEndDate] = useState(null);
  const [formData, setFormData] = useState({
    saleNo: "",
    startDate: "",
    endDate: "",
    details: "packing",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (name === "startDate") {
      if (Number(value) > Number(formData.endDate)) {
        setError("Start date cannot exceed the end date.");
        toast.error(err.message);
      } else {
        setError(""); // Clear error if condition is not met
      }
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/packing/sale`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setLoading(false);
      toast.success(data.message);
      setGetEndDate(false);
      setMadeTea(false);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  const getMadeTeaF = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/packing/made-tea`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMadeTea(data.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const getEndDateF = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/packing/date`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setGetEndDate(data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEndDateF();
    getMadeTeaF();
  }, []);

  return (
    <div className="p-6 bg-[#f5fff8] min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {getEndDate ? (
          <form
            className="bg-white rounded-xl shadow-lg border p-8"
            onSubmit={submitHandler}
          >
            {/* Header Section */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Sale Details
              </h2>
              <p className="text-gray-600 text-lg">
                Please enter the following details to continue the process.
              </p>
            </div>

            {/* Sale Number Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Sale Number
              </label>
              <input
                type="text"
                name="saleNo"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-lg"
                value={formData.saleNo}
                onChange={handleInputChange}
                required
                placeholder="Enter sale number"
              />
            </div>

            {/* Date Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Catalogue Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Catalogue End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                  min={
                    formData.startDate || new Date().toISOString().split("T")[0]
                  }
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-700 text-sm">
                <strong>Note:</strong> Ensure the end date is not earlier than
                the start date.
              </p>
            </div>

            {/* Submit Button - Fixed */}
            <div className="flex justify-center">
              <button
                disabled={loading}
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center justify-center min-w-[180px] shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <HashLoader size={20} color="#ffffff" /> : "Submit"}
              </button>
            </div>
          </form>
        ) : madeTea ? (
          <Packing2 />
        ) : (
          <Packing1 />
        )}
      </div>
    </div>
  );
};

export default Packing;
