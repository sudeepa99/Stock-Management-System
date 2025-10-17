import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";

const ReportMainPage = () => {
  const [loading, setLoading] = useState(false);
  const [packingData, setPackingData] = useState([]);
  const [dispatchData, setDispatchData] = useState([]);
  const [currentPageP, setCurrentPageP] = useState(1);
  const [currentPageD, setCurrentPageD] = useState(1);
  const [copiedInvoice, setCopiedInvoice] = useState(null);

  const rowsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Mock data — replace this with your actual API calls
      setPackingData([
        {
          invoiceNo: "INV001",
          teaMark: "Ceylon A",
          teacategory: "BOP",
          sizeofbag: "25kg",
          numofbags: 10,
        },
        {
          invoiceNo: "INV002",
          teaMark: "Ceylon B",
          teacategory: "Dust",
          sizeofbag: "30kg",
          numofbags: 8,
        },
      ]);
      setDispatchData([
        {
          invoiceNo: "INV101",
          broker: "John Tea Exports",
          weight: "250kg",
          numofbags: 10,
          date: "2025-10-17",
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const totalPagesP = Math.ceil(packingData.length / rowsPerPage);
  const totalPagesD = Math.ceil(dispatchData.length / rowsPerPage);

  const currentPackingData = packingData.slice(
    (currentPageP - 1) * rowsPerPage,
    currentPageP * rowsPerPage
  );
  const currentDispatchData = dispatchData.slice(
    (currentPageD - 1) * rowsPerPage,
    currentPageD * rowsPerPage
  );

  const handlePageChange = (setter, newPage, total) => {
    if (newPage >= 1 && newPage <= total) setter(newPage);
  };

  const handleCopy = (invoiceNo) => {
    navigator.clipboard.writeText(invoiceNo);
    setCopiedInvoice(invoiceNo);
    setTimeout(() => setCopiedInvoice(null), 1200);
  };

  const today = new Date().toLocaleDateString();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0c0f12]/80">
        <HashLoader color="#50EDED" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5fff8] text-gray-200 px-8 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Reports Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          View and manage your daily, weekly, and yearly reports
        </p>
      </div>

      {/* Report Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Weekly", icon: "fa-calendar-week", link: "/reportW" },
          { label: "Yearly", icon: "fa-calendar-alt", link: "/reportY" },
          { label: "Broker", icon: "fa-user-tie", link: "/reportB" },
          { label: "Daily", icon: "fa-calendar-day", link: "/reportD" },
        ].map((btn) => (
          <Link key={btn.label} to={btn.link}>
            <div className="bg-white  border  rounded-xl shadow-xm p-4 text-center">
              <p className="text-black text-sm mb-1">{btn.label} Report</p>
              <button className="bg-[#54ED50] hover:bg-[#3de03a] text-black rounded-md w-full py-2 font-semibold flex justify-center items-center gap-2 transition-all duration-150">
                <i className={`fas ${btn.icon} text-lg`}></i> {btn.label}
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* Packing Table */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#1f2833] mb-10">
        <h2 className="text-2xl font-semibold text-black mb-2">
          Today's Packing Details
        </h2>
        <p className="text-black text-sm mb-4">Updated as of {today}</p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
            <thead className="bg-white border-b border-[#2b363f]">
              <tr>
                {[
                  "Invoice No",
                  "Tea Mark",
                  "Tea Category",
                  "Weight of Bag",
                  "Num of Bags",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-black font-medium"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentPackingData.length > 0 ? (
                currentPackingData.map((item) => (
                  <tr
                    key={item.invoiceNo}
                    className="border-b border-[#1f2833] hover:bg-green-600 transition"
                  >
                    <td
                      onClick={() => handleCopy(item.invoiceNo)}
                      className="px-4 py-2 cursor-pointer"
                    >
                      {item.invoiceNo}
                      {copiedInvoice === item.invoiceNo && (
                        <span className="ml-2 text-green-500 text-xs">
                          Copied!
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2">{item.teaMark}</td>
                    <td className="px-4 py-2">{item.teacategory}</td>
                    <td className="px-4 py-2">{item.sizeofbag}</td>
                    <td className="px-4 py-2">{item.numofbags}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-4 text-center text-red-400"
                  >
                    Today still no packing details
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() =>
              handlePageChange(setCurrentPageP, currentPageP - 1, totalPagesP)
            }
            disabled={currentPageP === 1}
            className="px-3 py-2 rounded-lg bg-[#171d23] border border-[#2b363f] text-gray-300 hover:bg-[#222933] hover:text-[#50EDED] disabled:opacity-40 transition"
          >
            ← Prev
          </button>
          <button
            onClick={() =>
              handlePageChange(setCurrentPageP, currentPageP + 1, totalPagesP)
            }
            disabled={currentPageP === totalPagesP}
            className="px-3 py-2 rounded-lg bg-[#171d23] border border-[#2b363f] text-gray-300 hover:bg-[#222933] hover:text-[#50EDED] disabled:opacity-40 transition"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Dispatch Table */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#1f2833]">
        <h2 className="text-2xl font-semibold text-black mb-2">
          Today's Dispatch Details
        </h2>
        <p className="text-black text-sm mb-4">Updated as of {today}</p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
            <thead className="bg-white border-b border-[#2b363f]">
              <tr>
                {["Invoice No", "Broker", "Weight", "No. of Bags", "Date"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-black font-medium"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {currentDispatchData.length > 0 ? (
                currentDispatchData.map((item) => (
                  <tr
                    key={item.invoiceNo}
                    className="border-b border-black hover:bg-[#1b222b] transition"
                  >
                    <td className="px-4 py-2">{item.invoiceNo}</td>
                    <td className="px-4 py-2">{item.broker}</td>
                    <td className="px-4 py-2">{item.weight}</td>
                    <td className="px-4 py-2">{item.numofbags}</td>
                    <td className="px-4 py-2">{item.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-4 text-center text-red-400"
                  >
                    Today still no dispatch details
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() =>
              handlePageChange(setCurrentPageD, currentPageD - 1, totalPagesD)
            }
            disabled={currentPageD === 1}
            className="px-3 py-2 rounded-lg bg-[#171d23] border border-[#2b363f] text-gray-300 hover:bg-[#222933] hover:text-[#50EDED] disabled:opacity-40 transition"
          >
            ← Prev
          </button>
          <button
            onClick={() =>
              handlePageChange(setCurrentPageD, currentPageD + 1, totalPagesD)
            }
            disabled={currentPageD === totalPagesD}
            className="px-3 py-2 rounded-lg bg-[#171d23] border border-[#2b363f] text-gray-300 hover:bg-[#222933] hover:text-[#50EDED] disabled:opacity-40 transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportMainPage;
