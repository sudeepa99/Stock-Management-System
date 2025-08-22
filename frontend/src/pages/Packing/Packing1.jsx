import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

import { BASE_URL } from "../../config";

import Packing2 from "./Packing2.jsx";

const Packing1 = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [getMadeTea, setMadeTea] = useState("");
  const [getTrue, setGetTrue] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    greenleaves: "",
    madetea: "",
    details: "packing",
    date: new Date().toISOString().substr(0, 10),
  });

  const today = new Date().toLocaleDateString();

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
      setGetTrue(!data.data);
      toast.success(result.message);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "madetea" && Number(value) > Number(formData.greenleaves)) {
      setError(
        "Amount of tea made cannot exceed the amount of green leaves received."
      );
    } else {
      setError("");
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/packing/details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      const { message } = await res.json();
      if (!res.ok) throw new Error(message);

      toast.success(message);
      await getMadeTeaF(); // Update getMadeTea after submission
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-8 max-w-2xl mx-auto">
      {getTrue ? (
        <form onSubmit={submitHandler} className="space-y-6">
          {/* Header Section */}
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold text-gray-800">{today}</h2>
            <p className="text-gray-600 mt-2">
              Please enter the following details to continue the process.
            </p>
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Green Leaf Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Amount of green leaf received (kg)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="greenleaves"
                  placeholder="0.00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  value={formData.greenleaves}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                />
                <span className="absolute right-3 top-3 text-gray-500">kg</span>
              </div>
            </div>

            {/* Tea Made Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Amount of tea made (kg)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="madetea"
                  placeholder="0.00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  value={formData.madetea}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  max={formData.greenleaves}
                />
                <span className="absolute right-3 top-3 text-gray-500">kg</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700 text-sm">
              <strong>Note:</strong> The amount of tea made should not exceed
              the green leaves received.
            </p>
          </div>

          {/* Submit Button - Fixed */}
          <div className="flex justify-center pt-4">
            <button
              disabled={loading}
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors flex items-center justify-center min-w-[150px] shadow-md hover:shadow-lg transition-shadow"
            >
              {loading ? <HashLoader size={20} color="#ffffff" /> : "Submit"}
            </button>
          </div>
        </form>
      ) : (
        <Packing2 />
      )}
    </div>
  );
};

export default Packing1;
