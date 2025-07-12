import React, { useState } from "react";
import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import "./packing.css";

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
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
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
    <form className="main-container" onSubmit={submitHandler} noValidate>
      <p className="b1">{today}</p>
      <p className="b2">
        Please enter the following details to continue the process.
      </p>
      <div className="mb-5">
        <label className="green-leaf">Invoice Number</label>
        <br />
        <input
          type="number"
          name="invoiceNo"
          placeholder="0001"
          className="control2"
          value={formData.invoiceNo}
          min={minSize || 1}
          onChange={handleInputChange}
          noValidate
        />
      </div>
      <div className="mb-5">
        <label className="green-leaf">Tea Mark</label>
        <br />
        <select
          name="teaMark"
          value={formData.teaMark}
          onChange={handleInputChange}
          className="tea_category"
          disabled={!formData.invoiceNo}
        >
          <option value="">Select the tea category</option>
          {Object.keys(teaMarks).map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-5">
        <label className="green-leaf">Tea Category</label>
        <br />
        <select
          name="teacategory"
          value={formData.teacategory}
          onChange={handleInputChange}
          className="tea_category"
          disabled={!formData.invoiceNo || !formData.teaMark}
        >
          <option value="">Select the tea category</option>
          {Object.keys(teaGrades).map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">  
        <label className="made-tea">Weight of Bag</label>
        <br />
        <input
          type="number"
          name="sizeofbag"
          placeholder="kg"
          className="control2"
          value={formData.sizeofbag}
          min={minSize || 0}
          onChange={handleInputChange}
          disabled={!formData.invoiceNo || !formData.teaMark || !formData.teacategory}
          noValidate
        />
        {/* Display error message here */}
         {error && (
          <p className="error-msg" style={{ color: "red" }}>
            {error}
          </p>
        )}{" "}
      </div>

      <div className="mb-5">
  <label className="made-tea">Num Of Bag</label>
  <br />
  <input
    type="number"
    name="numofbags"
    placeholder="0"
    className="control2"
    value={formData.numofbags}
    onChange={handleInputChange}
    disabled={
      !formData.invoiceNo || 
      !formData.teaMark || 
      !formData.teacategory || 
      !formData.sizeofbag
    }
    min="1"
    noValidate
  />
  {formData.numofbags <= 0 && formData.numofbags !== '' && (
    <div className="error-message" style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
      Number of bags must be greater than 0
    </div>
  )}
</div>

      <div className="bg-[#54ed50] w-[150px] text-center rounded-[5px] text-[23px] desktop:ml-[43%] mt-3 laptop:ml-[41%] ">
        <button disabled={loading} type="submit">
          {loading ? <HashLoader size={35} color="#ffffff" /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default Packing2;
