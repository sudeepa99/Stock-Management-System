import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import "./report.css";

const Reports = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMadeTeaF = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/packing/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.message);

      setData(responseData.data || []); // Ensure data is an array
      toast.success("Data fetched successfully");
    } catch (err) {
      toast.error(err.message);
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
            <div className="catalogue-list">
              {data.length > 0 ? (
                data.map((dataItem) => (
                  <div key={dataItem._id} className="catalogue-item mb-4">
                    <label className="text-[#fd3a3a]">Sale Number:</label>
                    <span className="mt-3 text-center">{dataItem.saleNumber}</span>
                    <div></div>
                    <label className="text-[#cdf63a]">Catalogue Date</label>
                    <span className="mt-3 text-center">
                      {new Date(dataItem.date).toLocaleDateString()}
                    </span>
                    <div></div>
                    <label className="text-[#D5D767]">Greenleaves</label>
                    <span className="mt-3 text-center">{dataItem.greenleaves}</span>
                    <div></div>
                    <label className="text-[#D5D767]">Made Tea</label>
                    <span className="mt-3 text-center">{dataItem.madetea}</span>
                    <div></div>
                    <label className="text-[#D5D767]">Details</label>
                    <span className="mt-3 text-center">{dataItem.details}</span>
                    {/* Render BOP items if available */}
                    {dataItem.BOP.length > 0 && (
                      <div>
                        <h4 className="text-[#D5D767]">BOP Details</h4>
                        {dataItem.BOP.map((bopItem) => (
                          <div key={bopItem._id} className="mt-2">
                            <span>Tea Category: {bopItem.teacategory}</span><br />
                            <span>Size of Bag: {bopItem.sizeofbag}</span><br />
                            <span>Number of Bags: {bopItem.numofbags}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Render FBOP items if available */}
                    {dataItem.FBOP.length > 0 && (
                      <div>
                        <h4 className="text-[#D5D767]">FBOP Details</h4>
                        {dataItem.FBOP.map((fbopItem) => (
                          <div key={fbopItem._id} className="mt-2">
                            <span>Tea Category: {fbopItem.teacategory}</span><br />
                            <span>Size of Bag: {fbopItem.sizeofbag}</span><br />
                            <span>Number of Bags: {fbopItem.numofbags}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Repeat the above pattern for other tea categories */}
                    {/* Example for BOP1 */}
                    {dataItem.BOP1.length > 0 && (
                      <div>
                        <h4 className="text-[#D5D767]">BOP1 Details</h4>
                        {dataItem.BOP1.map((bop1Item) => (
                          <div key={bop1Item._id} className="mt-2">
                            <span>Tea Category: {bop1Item.teacategory}</span><br />
                            <span>Size of Bag: {bop1Item.sizeofbag}</span><br />
                            <span>Number of Bags: {bop1Item.numofbags}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {dataItem.BOP1.length > 0 && (
                      <div>
                        <h4 className="text-[#D5D767]">BOP1 Details</h4>
                        {dataItem.BOP1.map((bop1Item) => (
                          <div key={bop1Item._id} className="mt-2">
                            <span>Tea Category: {bop1Item.teacategory}</span><br />
                            <span>Size of Bag: {bop1Item.sizeofbag}</span><br />
                            <span>Number of Bags: {bop1Item.numofbags}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {dataItem.BOP1A.length > 0 && (
                      <div>
                        <h4 className="text-[#D5D767]">BOP1A Details</h4>
                        {dataItem.BOP1A.map((bop1AItem) => (
                          <div key={bop1AItem._id} className="mt-2">
                            <span>Tea Category: {bop1AItem.teacategory}</span><br />
                            <span>Size of Bag: {bop1AItem.sizeofbag}</span><br />
                            <span>Number of Bags: {bop1AItem.numofbags}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {dataItem.FBOP.length > 0 && (
                      <div>
                        <h4 className="text-[#D5D767]">FBOP Details</h4>
                        {dataItem.FBOP.map((fbopItem) => (
                          <div key={fbopItem._id} className="mt-2">
                            <span>Tea Category: {fbopItem.teacategory}</span><br />
                            <span>Size of Bag: {fbopItem.sizeofbag}</span><br />
                            <span>Number of Bags: {fbopItem.numofbags}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {dataItem.FBOPF1.length > 0 && (
                      <div>
                        <h4 className="text-[#D5D767]">FBOPF1 Details</h4>
                        {dataItem.FBOPF1.map((fbopf1Item) => (
                          <div key={fbopf1Item._id} className="mt-2">
                            <span>Tea Category: {fbopf1Item.teacategory}</span><br />
                            <span>Size of Bag: {fbopf1Item.sizeofbag}</span><br />
                            <span>Number of Bags: {fbopf1Item.numofbags}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {dataItem.OPA.length > 0 && (
                      <div>
                        <h4 className="text-[#D5D767]">OPA Details</h4>
                        {dataItem.OPA.map((opaItem) => (
                          <div key={opaItem._id} className="mt-2">
                            <span>Tea Category: {opaItem.teacategory}</span><br />
                            <span>Size of Bag: {opaItem.sizeofbag}</span><br />
                            <span>Number of Bags: {opaItem.numofbags}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {dataItem.OP.length > 0 && (
                      <div>
                        <h4 className="text-[#D5D767]">OP Details</h4>
                        {dataItem.OP.map((opItem) => (
                          <div key={opItem._id} className="mt-2">
                            <span>Tea Category: {opItem.teacategory}</span><br />
                            <span>Size of Bag: {opItem.sizeofbag}</span><br />
                            <span>Number of Bags: {opItem.numofbags}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {dataItem.PEKOE.length > 0 && (
                      <div>
                        <h4 className="text-[#D5D767]">PEKOE Details</h4>
                        {dataItem.PEKOE.map((pekoeItem) => (
                          <div key={pekoeItem._id} className="mt-2">
                            <span>Tea Category: {pekoeItem.teacategory}</span><br />
                            <span>Size of Bag: {pekoeItem.sizeofbag}</span><br />
                            <span>Number of Bags: {pekoeItem.numofbags}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {dataItem.PEKOE1.length > 0 && (
                      <div>
                        <h4 className="text-[#D5D767]">PEKOE1 Details</h4>
                        {dataItem.PEKOE1.map((pekoe1Item) => (
                          <div key={pekoe1Item._id} className="mt-2">
                            <span>Tea Category: {pekoe1Item.teacategory}</span><br />
                            <span>Size of Bag: {pekoe1Item.sizeofbag}</span><br />
                            <span>Number of Bags: {pekoe1Item.numofbags}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {dataItem.BOP.length > 0 && (
                      <div>
                        <h4 className="text-[#D5D767]">BOP Details</h4>
                        {dataItem.BOP.map((bopItem) => (
                          <div key={bopItem._id} className="mt-2">
                            <span>Tea Category: {bopItem.teacategory}</span><br />
                            <span>Size of Bag: {bopItem.sizeofbag}</span><br />
                            <span>Number of Bags: {bopItem.numofbags}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {dataItem.BOPSp.length > 0 && (
                      <div>
                        <h4 className="text-[#D5D767]">BOP Sp Details</h4>
                        {dataItem.BOPSp.map((bopSpItem) => (
                          <div key={bopSpItem._id} className="mt-2">
                            <span>Tea Category: {bopSpItem.teacategory}</span><br />
                            <span>Size of Bag: {bopSpItem.sizeofbag}</span><br />
                            <span>Number of Bags: {bopSpItem.numofbags}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {dataItem.BOPA.length > 0 && (
                      <div>
                        <h4 className="text-[#D5D767]">BOPA Details</h4>
                        {dataItem.BOPA.map((bopaItem) => (
                          <div key={bopaItem._id} className="mt-2">
                            <span>Tea Category: {bopaItem.teacategory}</span><br />
                            <span>Size of Bag: {bopaItem.sizeofbag}</span><br />
                            <span>Number of Bags: {bopaItem.numofbags}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {dataItem.BOPF.length > 0 && (
                      <div>
                        <h4 className="text-[#D5D767]">BOPF Details</h4>
                        {dataItem.BOPF.map((bopfItem) => (
                          <div key={bopfItem._id} className="mt-2">
                            <span>Tea Category: {bopfItem.teacategory}</span><br />
                            <span>Size of Bag: {bopfItem.sizeofbag}</span><br />
                            <span>Number of Bags: {bopfItem.numofbags}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {dataItem.FBOP1.length > 0 && (
                      <div>
                        <h4 className="text-[#D5D767]">FBOP1 Details</h4>
                        {dataItem.FBOP1.map((fbop1Item) => (
                          <div key={fbop1Item._id} className="mt-2">
                            <span>Tea Category: {fbop1Item.teacategory}</span><br />
                            <span>Size of Bag: {fbop1Item.sizeofbag}</span><br />
                            <span>Number of Bags: {fbop1Item.numofbags}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {dataItem.FBOPF.length > 0 && (
                      <div>
                        <h4 className="text-[#D5D767]">FBOPF Details</h4>
                        {dataItem.FBOPF.map((fbopfItem) => (
                          <div key={fbopfItem._id} className="mt-2">
                            <span>Tea Category: {fbopfItem.teacategory}</span><br />
                            <span>Size of Bag: {fbopfItem.sizeofbag}</span><br />
                            <span>Number of Bags: {fbopfItem.numofbags}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {dataItem.OP1.length > 0 && (
                      <div>
                        <h4 className="text-[#D5D767]">OP1 Details</h4>
                        {dataItem.OP1.map((op1Item) => (
                          <div key={op1Item._id} className="mt-2">
                            <span>Tea Category: {op1Item.teacategory}</span><br />
                            <span>Size of Bag: {op1Item.sizeofbag}</span><br />
                            <span>Number of Bags: {op1Item.numofbags}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {dataItem.BP.length > 0 && (
                      <div>
                        <h4 className="text-[#D5D767]">BP Details</h4>
                        {dataItem.BP.map((bpItem) => (
                          <div key={bpItem._id} className="mt-2">
                            <span>Tea Category: {bpItem.teacategory}</span><br />
                            <span>Size of Bag: {bpItem.sizeofbag}</span><br />
                            <span>Number of Bags: {bpItem.numofbags}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {dataItem.FBOPFSp.length > 0 && (
                      <div>
                        <h4 className="text-[#D5D767]">FBOPF Sp Details</h4>
                        {dataItem.FBOPFSp.map((fbopfSpItem) => (
                          <div key={fbopfSpItem._id} className="mt-2">
                            <span>Tea Category: {fbopfSpItem.teacategory}</span><br />
                            <span>Size of Bag: {fbopfSpItem.sizeofbag}</span><br />
                            <span>Number of Bags: {fbopfSpItem.numofbags}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {dataItem.FFEXSP.length > 0 && (
                      <div>
                        <h4 className="text-[#D5D767]">FF EX SP Details</h4>
                        {dataItem.FFEXSP.map((ffexspItem) => (
                          <div key={ffexspItem._id} className="mt-2">
                            <span>Tea Category: {ffexspItem.teacategory}</span><br />
                            <span>Size of Bag: {ffexspItem.sizeofbag}</span><br />
                            <span>Number of Bags: {ffexspItem.numofbags}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add similar sections for OPA, OP, PEKOE, etc. */}
                  </div>
                ))
              ) : (
                <p>No data available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
