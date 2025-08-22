import React, { useState } from "react";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

import { BASE_URL } from "../../config.js";

const Packing2 = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    teacategory: "",
    sizeofbag: "",
    details: "packing",
    numofbags: "",
    teaMark: "",
    invoiceNo: "",
  });
  const [error, setError] = useState("");
  const [minSize, setMinSize] = useState(null);
  const [maxSize, setMaxSize] = useState(null);

  const today = new Date().toLocaleDateString();
  const teaMarks = {
    NeluwmWattha: "Neluwm Wattha",
    Cecilian: "Cecilian",
  };
  const teaGrades = {
    BOP1A: { min: 25, max: 35 },
    FBOP: { min: 32, max: 45 },
    FBOPF1: { min: 36, max: 52 },
    OPA: { min: 20, max: 30 },
    OP: { min: 22, max: 32 },
    PEKOE: { min: 28, max: 45 },
    PEKOE1: { min: 32, max: 47 },
    BOP: { min: 38, max: 53 },
    BOPSp: { min: 38, max: 52 },
    BOP1: { min: 30, max: 40 },
    BOPA: { min: 30, max: 45 },
    BOPF: { min: 40, max: 56 },
    FBOP1: { min: 30, max: 42 },
    FBOPF: { min: 30, max: 50 },
    OP1: { min: 26, max: 36 },
    BP: { min: 35, max: 60 },
    FBOPFSp: { min: 30, max: 55 },
    FFEXSP: { min: 20, max: 52 },
    FFEXSP1: { min: 20, max: 52 },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error if the field is valid, otherwise set error
    if (name === "teacategory") {
      const selectedTeaGrade = teaGrades[value];
      if (selectedTeaGrade) {
        setMinSize(selectedTeaGrade.min);
        setMaxSize(selectedTeaGrade.max);
        setError(""); // Clear error on valid category selection
      } else {
        setMinSize(null);
        setMaxSize(null);
      }
    } else if (name === "sizeofbag") {
      if (value && (value < minSize || value > maxSize)) {
        setError(
          `Please enter a valid bag size between ${minSize} and ${maxSize} kg.`
        );
      } else {
        setError(""); // Clear error if the input is within range
      }
    }
  };

  const validateForm = () => {
    const { teacategory, sizeofbag, numofbags } = formData;

    if (!teacategory) {
      setError("Please select a tea category.");
      return false;
    }
    if (!sizeofbag || sizeofbag < minSize || sizeofbag > maxSize) {
      setError(
        `Please enter a valid bag size between ${minSize} and ${maxSize} kg.`
      );
      return false;
    }
    if (!numofbags) {
      setError("Please select the number of bags.");
      return false;
    }
    return true;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }
    setLoading(true);
    try {
      const payload = {
        teacategory: formData.teacategory,
        teacategoryData: {
          teacategory: formData.teacategory,
          sizeofbag: parseInt(formData.sizeofbag, 10),
          numofbags: parseInt(formData.numofbags),
          teaMark: formData.teaMark,
          invoiceNo: formData.invoiceNo,
        },
      };
      const res = await fetch(`${BASE_URL}/packing/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setLoading(false);
      toast.success(data.message);

      setFormData({
        teacategory: "",
        sizeofbag: "",
        details: "packing",
        numofbags: "",
        teaMark: "",
        invoiceNo: "",
      });
      setMinSize(null);
      setMaxSize(null);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border p-8 max-w-2xl mx-auto">
      <form onSubmit={submitHandler} noValidate className="space-y-6">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{today}</h2>
          <p className="text-gray-600 text-lg">
            Please enter the following details to continue the process.
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Invoice Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Invoice Number
            </label>
            <input
              type="number"
              name="invoiceNo"
              placeholder="0001"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              value={formData.invoiceNo}
              min="1"
              onChange={handleInputChange}
            />
          </div>

          {/* Tea Mark */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tea Mark
            </label>
            <select
              name="teaMark"
              value={formData.teaMark}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              disabled={!formData.invoiceNo}
            >
              <option value="">Select tea mark</option>
              {Object.entries(teaMarks).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          {/* Tea Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tea Category
            </label>
            <select
              name="teacategory"
              value={formData.teacategory}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              disabled={!formData.invoiceNo || !formData.teaMark}
            >
              <option value="">Select tea category</option>
              {Object.keys(teaGrades).map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>

          {/* Weight of Bag */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Weight of Bag (kg)
            </label>
            <input
              type="number"
              name="sizeofbag"
              placeholder="0.00"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              value={formData.sizeofbag}
              min={minSize || 0}
              max={maxSize || 100}
              step="0.01"
              onChange={handleInputChange}
              disabled={
                !formData.invoiceNo ||
                !formData.teaMark ||
                !formData.teacategory
              }
            />
            {minSize && maxSize && (
              <p className="text-sm text-gray-500 mt-1">
                Valid range: {minSize} - {maxSize} kg
              </p>
            )}
          </div>

          {/* Number of Bags */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Bags
            </label>
            <input
              type="number"
              name="numofbags"
              placeholder="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              value={formData.numofbags}
              onChange={handleInputChange}
              disabled={
                !formData.invoiceNo ||
                !formData.teaMark ||
                !formData.teacategory ||
                !formData.sizeofbag
              }
              min="1"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            disabled={loading}
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center justify-center min-w-[180px] shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <HashLoader size={20} color="#ffffff" /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Packing2;
