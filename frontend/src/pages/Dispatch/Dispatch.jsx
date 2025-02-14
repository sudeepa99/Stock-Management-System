import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import "./Dispatch.css";

const Dispatch = () => {
  const [loading, setLoading] = useState(false);
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

  // Handle input changes for dynamic form updates
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

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
          toast.success(result.message);
        } else {
          toast.error("Invoice number not found.");
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
  };

  // Submission handler
  const submitHandler = async (event) => {
    event.preventDefault();
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
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="main-container" onSubmit={submitHandler}>
        <p className="b1">Date</p>
        <p className="b2">
          Please enter the following details to continue the process.
        </p>
        <div className="mb-5">
          <label className="made-tea">Invoice Number</label>
          <br />
          <input
            type="text"
            name="invoicenumber"
            className="control2"
            value={formData.invoicenumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-5">
          <label className="green-leaf">Broker</label>
          <br />
          <select
            name="broker"
            value={formData.broker}
            onChange={handleInputChange}
            className="tea_category"
            required
          >
            <option value="">Select the Broker</option>
            {Object.keys(brokers).map((grade) => (
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
            required
          >
            <option value="">Select a category</option>
            <option value="BOP1A">BOP1A</option>
            <option value="FBOP">FBOP</option>
            <option value="FBOPF1">FBOPF1</option>
            <option value="OPA">OPA</option>
            <option value="OP">OP</option>
            <option value="PEKOE">PEKOE</option>
            <option value="PEKOE1">PEKOE1</option>
            <option value="BOP">BOP</option>
            <option value="BOPSp">BOP Sp</option>
            <option value="BOP1">BOP1</option>
            <option value="BOPA">BOPA</option>
            <option value="BOPF">BOPF</option>
            <option value="FBOP1">FBOP1</option>
            <option value="FBOPF">FBOPF</option>
            <option value="OP1">OP1</option>
            <option value="BP">BP</option>
            <option value="FBOPFSp">FBOPF Sp</option>
            <option value="FFEXSP">FF EX SP</option>
            <option value="FFEXSP1">FF EX SP 1</option>
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
            readOnly
          />
        </div>
        <div className="mb-5">
          <label className="made-tea">Number of Bags</label>
          <br />
          {formData.teacategory === "FBOPFSp" ||
            formData.teacategory === "FFEXSP" ||
            formData.teacategory === "FFEXSP1" ? (
            <input
              type="number"
              name="numofbags"
              placeholder="10"
              className="control2"
              onChange={handleInputChange}
              value={formData.numofbags}
              required
            />
          ) : (
            <select
              name="numofbags"
              value={formData.numofbags}
              onChange={handleInputChange}
              className="bags_no"
            >
              <option value="">Select number of bags</option>
              <option
                value="Below 10B"
                className={disable10b ? "red-option" : "black-option"}
                disabled={disable10b}
              >
                Below 10B
              </option>
              <option value="10B">10B</option>
              <option
                value="15B"
                className={
                  disable20b30b || formData.teacategory === "PEKOE1"
                    ? "red-option"
                    : "black-option"
                }
                disabled={disable20b30b || formData.teacategory === "PEKOE1"}
              >
                15B
              </option>
              <option value="20B">20B</option>
              <option
                value="30B"
                className={
                  disable20b30b || formData.teacategory === "BP"
                    ? "red-option"
                    : "black-option"
                }
                disabled={disable20b30b || formData.teacategory === "BP"}
              >
                30B
              </option>
              <option value="40B">40B</option>
            </select>
          )}
        </div>
        <div className="bg-[#54ed50] w-[150px] text-center rounded-[5px] text-[23px] desktop:ml-[43%] mt-3 laptop:ml-[41%] ">
          <button disabled={loading} type="submit">
            {loading ? <HashLoader size={35} color="#ffffff" /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dispatch;
