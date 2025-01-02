import Packing from "../models/SaleSchema.js";
import PackingDetailsSchema from "../models/PackingDetailsSchema.js";
import TeaCategoriesConst from "../Constants/TeaCategoryConst.js";
import DispatchDetails from "../models/DispatchSchema.js";

//Create a new sale
export const saleDetails = async (req, res) => {
    const { saleNo, startDate, endDate, details } = req.body;
    try {
        let packing_ = null;

        if (details === "packing") {
            packing_ = await Packing.findOne({ saleNo });
        }

        if (packing_) {
            return res.status(400).json({ message: "Packing already exists" });
        }
        if (details === "packing") {
            packing_ = new Packing({
                saleNo,
                startDate,
                endDate,
                details,
            });
        }

        if (packing_) {
            if (startDate < endDate) {
                await packing_.save();
                return res
                    .status(200)
                    .json({ success: true, message: "Packing successfully created" });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Invalid details or unable to create packing",
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid details or unable to create packing",
            });
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, err: err.message });
    }
};

// Create Endpoint  for Recieved tea and made tea
export const packingDetails = async (req, res) => {
    const { date, greenleaves, madetea, details } = req.body;
    const packing = await Packing.findOne().sort({ $natural: -1 });
    try {
        if (details !== "packing") {
            return res
                .status(400)
                .json({ success: false, message: "Invalid details" });
        }
        let record = await PackingDetailsSchema.findOne({ date });
        record = new PackingDetailsSchema({
            date,
            details,
            greenleaves,
            madetea,
            saleNumber: packing.saleNo,
            // Initialize all tea categories
            BOP1A: { data: [], totalNet: 0 },
            FBOP: { data: [], totalNet: 0 },
            FBOPF1: { data: [], totalNet: 0 },
            OPA: { data: [], totalNet: 0 },
            OP: { data: [], totalNet: 0 },
            PEKOE: { data: [], totalNet: 0 },
            PEKOE1: { data: [], totalNet: 0 },
            BOP: { data: [], totalNet: 0 },
            BOPSp: { data: [], totalNet: 0 },
            BOP1: { data: [], totalNet: 0 },
            BOPA: { data: [], totalNet: 0 },
            BOPF: { data: [], totalNet: 0 },
            FBOP1: { data: [], totalNet: 0 },
            FBOPF: { data: [], totalNet: 0 },
            OP1: { data: [], totalNet: 0 },
            BP: { data: [], totalNet: 0 },
            FBOPFSp: { data: [], totalNet: 0 },
            FFEXSP: { data: [], totalNet: 0 },
            FFEXSP1: { data: [], totalNet: 0 },
        });

        await record.save();

        return res.status(200).json({
            success: true,
            message: "Packing details successfully saved",
            data: record,
        });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

// Retrieve Endpoint for Packing details
// Function to update the tea category
const updateTeaCategory = async (documentId, teacategory, newItem) => {
    console.log(teacategory);

    try {
        const updatedDocument = await PackingDetailsSchema.findOneAndUpdate(
            { _id: documentId },
            {
                $push: { [`${teacategory}.data`]: newItem },
                $inc: { [`${teacategory}.totalNet`]: newItem.totalNet },
            },
            { new: true, useFindAndModify: false }
        );
        return updatedDocument;
    } catch (err) {
        console.error("Error updating tea category:", err);
        throw err;
    }
};

export const updatePackingDetails = async (req, res) => {
    const { teacategory, teacategoryData } = req.body;
    try {
        const currentDate = new Date().toISOString().split("T")[0];
        const document = await PackingDetailsSchema.findOne({ date: currentDate });
        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document with the current date not found",
            });
        }
        const teaCategories = TeaCategoriesConst;
        if (teaCategories.includes(teacategory)) {
            const latestPacking = await PackingDetailsSchema.findOne({
                [`${teacategory}.data.invoiceNo`]: { $exists: true },
            }).sort({ [`${teacategory}.data.invoiceNo`]: -1 });
            const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
            let newInvoiceNo;
            if (
                latestPacking &&
                latestPacking[teacategory] &&
                latestPacking[teacategory].data.length > 0
            ) {
                const existingInvoices = latestPacking[teacategory].data.map(
                    (subdocument) => {
                        const parts = subdocument.invoiceNo.split("-");
                        return parts.length === 3 ? parseInt(parts[2]) : 0;
                    }
                );
                const maxInvoiceNumber = Math.max(...existingInvoices, 0);
                newInvoiceNo = `${datePart}-${teacategory}-${(maxInvoiceNumber + 1)
                    .toString()
                    .padStart(3, "0")}`;
            } else {
                newInvoiceNo = `${datePart}-${teacategory}-001`;
            }
            const newItem = {
                ...teacategoryData,
                invoiceNo: newInvoiceNo,
                totalNet: teacategoryData.sizeofbag * teacategoryData.numofbags,
            };

            const updatedDocument = await updateTeaCategory(
                document._id,
                teacategory,
                newItem
            );
            return res.status(200).json({
                success: true,
                message: "Successfully updated",
                data: updatedDocument,
            });
        } else {
            return res
                .status(400)
                .json({ success: false, message: "Invalid teacategory provided" });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

//Get the latest packin details
export const getPackingDetails = async (req, res) => {
    try {
        const today = new Date().toISOString().split("T")[0];

        const packingDetails = await PackingDetailsSchema.findOne({ date: today });

        if (!packingDetails) {
            return res.status(404).json({
                success: false,
                message: "No packing details found for today.",
            });
        }

        return res.status(200).json({ success: true, data: packingDetails });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

//FoR Report
export const getAllPackingDetails = async (req, res) => {
    try {
        const packingD = await PackingDetailsSchema.find({}).select("-password");
        res
            .status(200)
            .json({ success: true, message: "Packing  found", data: packingD });
    } catch (err) {
        res.status(404).json({ success: false, message: "Not Found" });
    }
};

// For Packaging
export const getDateDetails = async (req, res) => {
    try {
        const packing = await Packing.findOne().sort({ $natural: -1 });

        if (!packing) {
            return res.status(200).json({ data: true });
        }

        const endDateGet = packing.endDate;
        const saleDate = new Date(endDateGet);
        const formattedDate = saleDate.toISOString().split("T")[0];
        const currentDate = new Date().toISOString().split("T")[0];

        const getDate = formattedDate <= currentDate;

        return res.status(200).json({ data: getDate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

//For packing
export const getMadeTea = async (req, res) => {
    try {
        const today = new Date().toISOString().split("T")[0];

        const packing = await PackingDetailsSchema.findOne({ date: today });

        if (!packing || !packing.madetea) {
            console.warn("No tea made for today:", today);
            return res.status(204).json({ data: false });
        }

        return res.status(200).json({ data: true });
    } catch (err) {
        console.error("Error fetching made tea data:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export const getSaleDetails = async (req, res) => {
    try {
        const today = new Date().toISOString().split("T")[0];

        const saleDetails = await Packing.findOne({
            startDate: { $lte: today },
            endDate: { $gte: today },
        });

        const packingDetails = await PackingDetailsSchema.findOne({ date: today });

        if (!saleDetails && !packingDetails) {
            return res.status(404).json({
                success: false,
                message: "No packing or sale details found for today.",
            });
        }

        console.log(saleDetails);


        const dispatchDetails = await DispatchDetails.findOne({ saleNumber: saleDetails.saleNo });

        const allDetails = {
            saleDetails: saleDetails || null,
            packingDetails: packingDetails || null,
            dispatchDetails: dispatchDetails || null,
        };

        return res.status(200).json({
            success: true,
            data: allDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:
                "An error occurred while fetching sale details. Please try again later.",
        });
    }
};
