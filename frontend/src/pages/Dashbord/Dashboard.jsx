import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications
import { BASE_URL } from "../../config";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMadeTeaF = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/packing/saleDetail`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.message);
      setData(responseData.data);
      console.log(responseData);

      // toast.success('Data fetched successfully'); // Move the success toast here
    } catch (err) {
      // toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMadeTeaF();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <HashLoader color="#36d7b7" />
      ) : (
        <div className="a1">
          <div>
            <p className="b1">Current Status</p>
            <div className="absolute flex flex-row top-[15px] right-[10px]">
              <label className="sale">Sale Number - </label>
              <span className="text-xl ">{data?.saleDetails.saleNo}</span>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-start justify-center h-40 max-w-md gap-8 px-4 pt-4 rounded-lg bg-slate-900">
              <div className="flex flex-col justify-center">
                <label className="text-[#D5D767]">Catalogue Start Date</label>
                <span className="mt-3 text-center">
                  {data?.saleDetails.startDate
                    ? new Date(data.saleDetails.startDate).toLocaleDateString()
                    : ""}
                </span>
              </div>
              <div className="flex flex-col justify-center">
                <label className="text-[#D5D767]">Catalogue End Date</label>
                <span className="mt-3 text-center">
                  {data?.saleDetails.endDate
                    ? new Date(data.saleDetails.endDate).toLocaleDateString()
                    : ""}
                </span>
              </div>
            </div>
            <div className="flex flex-row items-start justify-center h-40 max-w-md gap-8 px-4 pt-4 rounded-lg bg-slate-900">
              <div className="mb-5">
                <label className="text-[#50EDED] text-center">
                  Amount of green leaf received
                </label>
                <span className="mt-3">
                  {data?.packingDetails &&
                    data.packingDetails.greenleaves !== null
                    ? data.packingDetails.greenleaves
                    : "Not add data"}
                </span>
              </div>
              <div className="mb-5">
                <label className="text-[#50EDED] text-center">
                  Amount of tea made
                </label>
                <span className="mt-3">
                  {data?.packingDetails && data.packingDetails.madetea !== null
                    ? data.packingDetails.madetea
                    : "Not add data"}
                </span>
              </div>
            </div>
          </div>

          {/* Ensure BOP1A array has at least one element before accessing */}
          {data?.packingDetails && (
            <table className="min-w-full mt-10 border border-collapse border-gray-300">
              <thead>
                <tr className="bg-transparent">
                  <th className="px-4 py-2 border text-[#50EDED] border-gray-300">
                    Invoice No
                  </th>
                  <th className="px-4 py-2 border text-[#50EDED] border-gray-300">
                    Tea Mark
                  </th>
                  <th className="px-4 py-2 border text-[#50EDED] border-gray-300">
                    Tea Category
                  </th>
                  <th className="px-4 py-2 text-[#50EDED] border border-gray-300">
                    Waight of Bag
                  </th>
                  <th className="px-4 py-2 text-[#50EDED] border border-gray-300">
                    Num Of Bags
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data.packingDetails).map((key) => {
                  const categoryDetails = data.packingDetails[key];

                  if (
                    Array.isArray(categoryDetails) &&
                    categoryDetails.length > 0
                  ) {
                    return categoryDetails.map((item) => (
                      <tr key={item._id} className="">
                        <td className="px-4 py-2 border border-gray-300">
                          {item.invoiceNo}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {item.teaMark}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {item.teacategory}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {item.sizeofbag}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {item.numofbags}
                        </td>
                      </tr>
                    ));
                  }
                  return null;
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
