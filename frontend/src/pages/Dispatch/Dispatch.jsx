import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import "./Dispatch.css";

const Dispatch = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    date: new Date().toISOString().substr(0, 10),
    details: "packing",
    teacategory: "",
    sizeofbag: "",
    numofbags: "",
    invoicenumber: "",
    broker: "",
  });
  const navigate = useNavigate();

  // Update these constants for conditionally disabling options
  const disable10b = [
    "BOP1A",
    "FBOP",
    "FBOPF1",
    "OPA",
    "OP",
    "PEKOE",
    "PEKOE1",
    "BOP",
    "BOPSp",
    "BOP1",
    "BOPA",
    "BOPF",
    "FBOP1",
    "FBOPF",
    "OP1",
    "BP",
  ].includes(formData.teacategory);
  const disable20b30b = [
    "BOP1A",
    "FBOP",
    "FBOPF1",
    "OPA",
    "OP",
    "PEKOE",
  ].includes(formData.teacategory);

  const brokers = {
    Farbas: "Farbas",
    Mercantile: "Mercantile",
    JKeels: "JKeels",
  };
  const teaCategories = [
    "BOP1A",
    "FBOP",
    "FBOPF1",
    "OPA",
    "OP",
    "PEKOE",
    "PEKOE1",
    "BOP",
    "BOPSp",
    "BOP1",
    "BOPA",
    "BOPF",
    "FBOP1",
    "FBOPF",
    "OP1",
    "BP",
    "FBOPFSp",
    "FFEXSP",
    "FFEXSP1",
  ];

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.invoicenumber.trim()) {
      newErrors.invoicenumber = "Invoice number is required";
    }

    if (!formData.broker) {
      newErrors.broker = "Broker selection is required";
    }

    if (!formData.teacategory) {
      newErrors.teacategory = "Tea category is required";
    }

    if (!formData.sizeofbag) {
      newErrors.sizeofbag = "Weight of bag is required";
    }

    if (!formData.numofbags) {
      newErrors.numofbags = "Number of bags is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes for dynamic form updates
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for the field being updated
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    if (name === "invoicenumber") {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/dispatch/invoice/${value}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const teacategoryData = await res.json();

        if (res.ok && teacategoryData) {
          const { teacategory, sizeofbag } = teacategoryData;
          setFormData((prev) => ({
            ...prev,
            teacategory,
            sizeofbag,
          }));
          toast.success("Invoice data loaded successfully");
        } else {
          toast.error("Invoice number not found.");
        }
      } catch (err) {
        toast.error("Error fetching invoice data");
      } finally {
        setLoading(false);
      }
    }
  };

  // Submission handler
  const submitHandler = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        date: formData.date,
        details: formData.details,
        updates: [
          {
            teacategory: formData.teacategory,
            invoicenumber: formData.invoicenumber,
            sizeofbag: formData.sizeofbag,
            numofbags: formData.numofbags,
            broker: formData.broker,
          },
        ],
      };

      const res = await fetch(`${BASE_URL}/dispatch/details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const { message } = await res.json();
      if (!res.ok) throw new Error(message);

      toast.success(message);
      navigate("/dispatch");

      setFormData({
        date: new Date().toISOString().substr(0, 10),
        details: "packing",
        teacategory: "",
        sizeofbag: "",
        numofbags: "",
        invoicenumber: "",
        broker: "",
      });
      setErrors({});
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#f5fff8] min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <form
          className="bg-white rounded-xl shadow-lg border p-8"
          onSubmit={submitHandler}
          noValidate
        >
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Dispatch Details
            </h2>
            <p className="text-gray-600 text-lg">
              Please enter the following details to continue the process.
            </p>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Invoice Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Invoice Number *
              </label>
              <input
                type="text"
                name="invoicenumber"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                  errors.invoicenumber ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.invoicenumber}
                onChange={handleInputChange}
                placeholder="Enter invoice number"
                required
              />
              {errors.invoicenumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.invoicenumber}
                </p>
              )}
            </div>

            {/* Broker */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Broker *
              </label>
              <select
                name="broker"
                value={formData.broker}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                  errors.broker ? "border-red-500" : "border-gray-300"
                }`}
                required
              >
                <option value="">Select Broker</option>
                {Object.entries(brokers).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
              {errors.broker && (
                <p className="text-red-500 text-sm mt-1">{errors.broker}</p>
              )}
            </div>

            {/* Tea Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tea Category *
              </label>
              <select
                name="teacategory"
                value={formData.teacategory}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                  errors.teacategory ? "border-red-500" : "border-gray-300"
                }`}
                required
                disabled={true}
              >
                <option value="">Select Category</option>
                {teaCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.teacategory && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.teacategory}
                </p>
              )}
            </div>

            {/* Weight of Bag */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Weight of Bag (kg) *
              </label>
              <input
                type="number"
                name="sizeofbag"
                placeholder="0.00"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                  errors.sizeofbag ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.sizeofbag}
                readOnly
              />
              {errors.sizeofbag && (
                <p className="text-red-500 text-sm mt-1">{errors.sizeofbag}</p>
              )}
            </div>

            {/* Number of Bags */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Bags *
              </label>
              {formData.teacategory === "FBOPFSp" ||
              formData.teacategory === "FFEXSP" ||
              formData.teacategory === "FFEXSP1" ? (
                <input
                  type="number"
                  name="numofbags"
                  placeholder="10"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                    errors.numofbags ? "border-red-500" : "border-gray-300"
                  }`}
                  onChange={handleInputChange}
                  value={formData.numofbags}
                  required
                  min="1"
                />
              ) : (
                <select
                  name="numofbags"
                  value={formData.numofbags}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                    errors.numofbags ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                >
                  <option value="">Select number of bags</option>
                  <option value="Below 10B" disabled={disable10b}>
                    Below 10B {disable10b && "(Not available)"}
                  </option>
                  <option value="10B">10B</option>
                  <option
                    value="15B"
                    disabled={
                      disable20b30b || formData.teacategory === "PEKOE1"
                    }
                  >
                    15B{" "}
                    {(disable20b30b || formData.teacategory === "PEKOE1") &&
                      "(Not available)"}
                  </option>
                  <option value="20B">20B</option>
                  <option
                    value="30B"
                    disabled={disable20b30b || formData.teacategory === "BP"}
                  >
                    30B{" "}
                    {(disable20b30b || formData.teacategory === "BP") &&
                      "(Not available)"}
                  </option>
                  <option value="40B">40B</option>
                </select>
              )}
              {errors.numofbags && (
                <p className="text-red-500 text-sm mt-1">{errors.numofbags}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
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
    </div>
  );
};

export default Dispatch;
