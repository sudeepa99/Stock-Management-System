import DispatchDetails from "../models/DispatchSchema.js";
import Packing from "../models/SaleSchema.js";
import PackingDetailsSchema from "../models/PackingDetailsSchema.js";
import TeaCategoriesConst from "../Constants/TeaCategoryConst.js";

export const findByInvoiceNo = async (req, res) => {
    const { invoicenumber } = req.params;

    try {
        const record = await PackingDetailsSchema.aggregate([
            {
                $match: {
                    $or: [
                        { "BOP1A.data.invoiceNo": invoicenumber },
                        { "FBOP.data.invoiceNo": invoicenumber },
                        { "FBOPF1.data.invoiceNo": invoicenumber },
                        { "OPA.data.invoiceNo": invoicenumber },
                        { "OP.data.invoiceNo": invoicenumber },
                        { "PEKOE.data.invoiceNo": invoicenumber },
                        { "PEKOE1.data.invoiceNo": invoicenumber },
                        { "BOP.data.invoiceNo": invoicenumber },
                        { "BOPSp.data.invoiceNo": invoicenumber },
                        { "BOP1.data.invoiceNo": invoicenumber },
                        { "BOPA.data.invoiceNo": invoicenumber },
                        { "BOPF.data.invoiceNo": invoicenumber },
                        { "FBOP1.data.invoiceNo": invoicenumber },
                        { "FBOPF.data.invoiceNo": invoicenumber },
                        { "OP1.data.invoiceNo": invoicenumber },
                        { "BP.data.invoiceNo": invoicenumber },
                        { "FBOPFSp.data.invoiceNo": invoicenumber },
                        { "FFEXSP.data.invoiceNo": invoicenumber },
                        { "FFEXSP1.data.invoiceNo": invoicenumber },
                    ],
                },
            },
            {
                $project: {
                    result: {
                        $switch: {
                            branches: [
                                {
                                    case: { $in: [invoicenumber, "$BOP1A.data.invoiceNo"] },
                                    then: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$BOP1A.data",
                                                    as: "item",
                                                    cond: { $eq: ["$$item.invoiceNo", invoicenumber] },
                                                },
                                            },
                                            0,
                                        ],
                                    },
                                },
                                {
                                    case: { $in: [invoicenumber, "$FBOP.data.invoiceNo"] },
                                    then: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$FBOP.data",
                                                    as: "item",
                                                    cond: { $eq: ["$$item.invoiceNo", invoicenumber] },
                                                },
                                            },
                                            0,
                                        ],
                                    },
                                },
                                {
                                    case: { $in: [invoicenumber, "$FBOPF1.data.invoiceNo"] },
                                    then: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$FBOPF1.data",
                                                    as: "item",
                                                    cond: { $eq: ["$$item.invoiceNo", invoicenumber] },
                                                },
                                            },
                                            0,
                                        ],
                                    },
                                },
                                {
                                    case: { $in: [invoicenumber, "$OPA.data.invoiceNo"] },
                                    then: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$OPA.data",
                                                    as: "item",
                                                    cond: { $eq: ["$$item.invoiceNo", invoicenumber] },
                                                },
                                            },
                                            0,
                                        ],
                                    },
                                },
                                {
                                    case: { $in: [invoicenumber, "$OP.data.invoiceNo"] },
                                    then: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$OP.data",
                                                    as: "item",
                                                    cond: { $eq: ["$$item.invoiceNo", invoicenumber] },
                                                },
                                            },
                                            0,
                                        ],
                                    },
                                },
                                {
                                    case: { $in: [invoicenumber, "$PEKOE.data.invoiceNo"] },
                                    then: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$PEKOE.data",
                                                    as: "item",
                                                    cond: { $eq: ["$$item.invoiceNo", invoicenumber] },
                                                },
                                            },
                                            0,
                                        ],
                                    },
                                },
                                {
                                    case: { $in: [invoicenumber, "$PEKOE1.data.invoiceNo"] },
                                    then: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$PEKOE1.data",
                                                    as: "item",
                                                    cond: { $eq: ["$$item.invoiceNo", invoicenumber] },
                                                },
                                            },
                                            0,
                                        ],
                                    },
                                },
                                {
                                    case: { $in: [invoicenumber, "$BOP.data.invoiceNo"] },
                                    then: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$BOP.data",
                                                    as: "item",
                                                    cond: { $eq: ["$$item.invoiceNo", invoicenumber] },
                                                },
                                            },
                                            0,
                                        ],
                                    },
                                },
                                {
                                    case: { $in: [invoicenumber, "$BOPSp.data.invoiceNo"] },
                                    then: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$BOPSp.data",
                                                    as: "item",
                                                    cond: { $eq: ["$$item.invoiceNo", invoicenumber] },
                                                },
                                            },
                                            0,
                                        ],
                                    },
                                },
                                {
                                    case: { $in: [invoicenumber, "$BOP1.data.invoiceNo"] },
                                    then: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$BOP1.data",
                                                    as: "item",
                                                    cond: { $eq: ["$$item.invoiceNo", invoicenumber] },
                                                },
                                            },
                                            0,
                                        ],
                                    },
                                },
                                {
                                    case: { $in: [invoicenumber, "$BOPA.data.invoiceNo"] },
                                    then: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$BOPA.data",
                                                    as: "item",
                                                    cond: { $eq: ["$$item.invoiceNo", invoicenumber] },
                                                },
                                            },
                                            0,
                                        ],
                                    },
                                },
                                {
                                    case: { $in: [invoicenumber, "$BOPF.data.invoiceNo"] },
                                    then: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$BOPF.data",
                                                    as: "item",
                                                    cond: { $eq: ["$$item.invoiceNo", invoicenumber] },
                                                },
                                            },
                                            0,
                                        ],
                                    },
                                },
                                {
                                    case: { $in: [invoicenumber, "$FBOP1.data.invoiceNo"] },
                                    then: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$FBOP1.data",
                                                    as: "item",
                                                    cond: { $eq: ["$$item.invoiceNo", invoicenumber] },
                                                },
                                            },
                                            0,
                                        ],
                                    },
                                },
                                {
                                    case: { $in: [invoicenumber, "$FBOPF.data.invoiceNo"] },
                                    then: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$FBOPF.data",
                                                    as: "item",
                                                    cond: { $eq: ["$$item.invoiceNo", invoicenumber] },
                                                },
                                            },
                                            0,
                                        ],
                                    },
                                },
                                {
                                    case: { $in: [invoicenumber, "$OP1.data.invoiceNo"] },
                                    then: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$OP1.data",
                                                    as: "item",
                                                    cond: { $eq: ["$$item.invoiceNo", invoicenumber] },
                                                },
                                            },
                                            0,
                                        ],
                                    },
                                },
                                {
                                    case: { $in: [invoicenumber, "$BP.data.invoiceNo"] },
                                    then: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$BP.data",
                                                    as: "item",
                                                    cond: { $eq: ["$$item.invoiceNo", invoicenumber] },
                                                },
                                            },
                                            0,
                                        ],
                                    },
                                },
                                {
                                    case: { $in: [invoicenumber, "$FBOPFSp.data.invoiceNo"] },
                                    then: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$FBOPFSp.data",
                                                    as: "item",
                                                    cond: { $eq: ["$$item.invoiceNo", invoicenumber] },
                                                },
                                            },
                                            0,
                                        ],
                                    },
                                },
                                {
                                    case: { $in: [invoicenumber, "$FFEXSP.data.invoiceNo"] },
                                    then: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$FFEXSP.data",
                                                    as: "item",
                                                    cond: { $eq: ["$$item.invoiceNo", invoicenumber] },
                                                },
                                            },
                                            0,
                                        ],
                                    },
                                },
                                {
                                    case: { $in: [invoicenumber, "$FFEXSP1.data.invoiceNo"] },
                                    then: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$FFEXSP1.data",
                                                    as: "item",
                                                    cond: { $eq: ["$$item.invoiceNo", invoicenumber] },
                                                },
                                            },
                                            0,
                                        ],
                                    },
                                },
                            ],
                            default: null,
                        },
                    },
                },
            },
        ]);

        if (!record || record.length === 0 || !record[0].result) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        res.json(record[0].result);
    } catch (err) {
        return res.status(500).json({ success: false, err: err.message });
    }
};

export const dispatchDetails = async (req, res) => {
    const { details, updates } = req.body;
    const packing = await Packing.findOne().sort({ $natural: -1 });
    const saleNumber = packing.saleNo;
    const today = new Date().toISOString().split("T")[0];


    try {
        if (details !== "packing") {
            return res.status(400).json({
                success: false,
                message: "Invalid details provided",
            });
        }

        if (!Array.isArray(updates)) {
            return res.status(400).json({
                success: false,
                message: "Updates must be an array",
            });
        }
        let record = await DispatchDetails.findOne({ date: today });
        const teaCategories = TeaCategoriesConst;
        if (record) {
            for (const update of updates) {
                const { teacategory, invoicenumber, sizeofbag, numofbags } = update;
                let packingDetailsList = await PackingDetailsSchema.find({
                    saleNumber,
                });

                if (!packingDetailsList) {
                    throw new Error(
                        "Packing details not found for the given sale number"
                    );
                }

                // Determine packing bag count based on numofbags
                const packingBagMap = {
                    "10B": 10,
                    "15B": 15,
                    "20B": 20,
                    "30B": 30,
                    "40B": 40,
                };
                const packingBag = packingBagMap[numofbags] || 0;
                let updated = false;
                for (const packingDetails of packingDetailsList) {
                    const categoryDetails = packingDetails[teacategory].data;
                    if (categoryDetails && Array.isArray(categoryDetails)) {
                        for (let item of categoryDetails) {
                            if (item.invoiceNo === invoicenumber) {
                                const updatedNumOfBags = item.numofbags - packingBag;
                                if (updatedNumOfBags < 0) {
                                    return res
                                        .status(400)
                                        .json({
                                            success: false,
                                            message: `Insufficient bags for invoice ${invoicenumber}`,
                                        });
                                }
                                item.numofbags = updatedNumOfBags;
                                updated = true;
                                break;
                            }
                        }

                        if (updated) break;
                    }
                }
                if (!updated) {
                    return res.status(404).json({
                        success: false,
                        message: `Invoice number ${invoicenumber} not found in any category`,
                    });
                }

                // Save the updated packing details
                for (const packingDetails of packingDetailsList) {
                    //  await packingDetails.save();
                }



                if (!teaCategories.includes(teacategory)) {
                    return res.status(400).json({
                        success: false,
                        message: `Invalid teacategory provided: ${teacategory}`,
                    });
                }

                if (!record[teacategory]) {
                    record[teacategory] = [];
                }
                const teaCategoryArray = record[teacategory].data;

                const existingEntry = teaCategoryArray.find(entry => entry.numofbags === numofbags);
                if (existingEntry) {
                    const sameSizeofBagEntries = teaCategoryArray.filter(entry => entry.numofbags === existingEntry.numofbags);
                    const sizeofbagValues = sameSizeofBagEntries.map(entry => entry.sizeofbag);
                    if (teacategory === 'BOP1A' || teacategory === 'FBOP' || teacategory === 'FBOPF' || teacategory === 'OPA' || teacategory === 'OP' || teacategory === 'PEKOE' || teacategory === 'PEKOE') {
                        if ((numofbags === "10B" && sizeofbagValues.length < 3) && (numofbags === "20B" && sizeofbagValues.length < 2)) {
                            teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });
                        }
                        else if ((numofbags === "10B" && sizeofbagValues.length < 2) && (numofbags === "20B" && sizeofbagValues.length < 1)) {
                            teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });
                        }
                        else if ((numofbags === "10B" && sizeofbagValues.length < 4) && (numofbags === "20B" && sizeofbagValues.length == 0)) {
                            teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });
                        }
                        else if ((numofbags === "10B" && sizeofbagValues.length == 0) && (numofbags === "20B" && sizeofbagValues.length < 4)) {
                            teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });
                        }
                        else {
                            return res.status(400).json({
                                success: false,
                                message: 'For the selected tea category, you cannot add more bags in this size. Please check the size and number of bags allowed for this category and try again.',
                            });
                        }
                    }
                    else if (teacategory === 'BOP' || teacategory === 'BOPSp' || teacategory === 'BOPF' || teacategory === 'FBOP1' || teacategory === 'FBOPF' || teacategory === 'OP1') {
                        //10 , 20
                        if ((numofbags === "10B" && sizeofbagValues.length < 2) && (numofbags === "15B" && sizeofbagValues.length == 0)) {
                            teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });
                        }
                        else if ((numofbags === "10B" && sizeofbagValues.length == 0) && (numofbags === "15B" && sizeofbagValues.length < 2)) {
                            teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });
                        }
                        // 20 30
                        if ((numofbags === "20B" && sizeofbagValues.length < 3) && (numofbags === "30B" && sizeofbagValues.length == 0)) {
                            teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });
                        }
                        else if ((numofbags === "20B" && sizeofbagValues.length == 0) && (numofbags === "30B" && sizeofbagValues.length < 3)) {
                            teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });
                        }
                        else if ((numofbags === "20B" && sizeofbagValues.length < 2) && (numofbags === "30B" && sizeofbagValues.length < 2)) {
                            teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });
                        }
                        else {
                            return res.status(400).json({
                                success: false,
                                message: 'For the selected tea category, you cannot add more bags in this size. Please check the size and number of bags allowed for this category and try again.',
                            });
                        }
                    }
                    else if (teacategory === 'BP') {
                        // 10 15
                        if ((numofbags === "10B" && sizeofbagValues.length < 2) && (numofbags === "15B" && sizeofbagValues.length == 0)) {
                            teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });
                        }
                        else if ((numofbags === "10B" && sizeofbagValues.length == 0) && (numofbags === "15B" && sizeofbagValues.length < 2)) {
                            teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });
                        }
                        //20
                        else if ((numofbags === "20B" && sizeofbagValues.length < 3)) {
                            teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });
                        }
                        else {
                            return res.status(400).json({
                                success: false,
                                message: 'For the selected tea category, you cannot add more bags in this size. Please check the size and number of bags allowed for this category and try again.',
                            });
                        }
                    }
                    else if (teacategory === 'FBOPFSp' || teacategory === 'FFEXSP' || teacategory === 'FFEXSP1') {
                        if (sizeofbagValues.length < 2) {
                            if ((numofbags === "10B" && sizeofbagValues.includes("10B")) ||
                                (numofbags === "15B" && sizeofbagValues.includes("15B")) ||
                                (numofbags === "20B" && sizeofbagValues.includes("20B")) ||
                                (numofbags === "30B" && sizeofbagValues.includes("30B")) ||
                                (numofbags === "10B Below" && sizeofbagValues.includes("10B Below"))) {
                            } else {
                                teaCategoryArray.push(numofbags);
                            }
                        }
                    }
                    else {
                        return res.status(400).json({
                            success: false,
                            message: 'Invalid details provided',
                        });
                    }

                }
            }

            await record.save();

            return res.status(200).json({
                success: true,
                message: 'Successfully updated',
                data: record,
            });
        } else {
            const today = new Date().toISOString().split("T")[0];

            const newRecord = {
                saleNumber,
                date: today,
                details,
            };

            // Iterate through updates to populate tea categories
            for (const update of updates) {
                const { teacategory, invoicenumber, sizeofbag, numofbags } = update;
                let packingDetailsList = await PackingDetailsSchema.find({
                    saleNumber,
                });

                if (!packingDetailsList) {
                    throw new Error(
                        "Packing details not found for the given sale number"
                    );
                }

                // Determine packing bag count based on numofbags
                const packingBagMap = {
                    "10B": 10,
                    "15B": 15,
                    "20B": 20,
                    "30B": 30,
                    "40B": 40,
                };
                const packingBag = packingBagMap[numofbags] || 0;
                let updated = false;
                for (const packingDetails of packingDetailsList) {
                    const categoryDetails = packingDetails[teacategory].data;
                    if (categoryDetails && Array.isArray(categoryDetails)) {
                        for (let item of categoryDetails) {
                            if (item.invoiceNo === invoicenumber) {
                                const updatedNumOfBags = item.numofbags - packingBag;
                                if (updatedNumOfBags < 0) {
                                    return res
                                        .status(400)
                                        .json({
                                            success: false,
                                            message: `Insufficient bags for invoice ${invoicenumber}`,
                                        });
                                }
                                item.numofbags = updatedNumOfBags;
                                updated = true;
                                break;
                            }
                        }

                        if (updated) break;
                    }
                }
                if (!updated) {
                    return res.status(404).json({
                        success: false,
                        message: `Invoice number ${invoicenumber} not found in any category`,
                    });
                }

                // Save the updated packing details
                for (const packingDetails of packingDetailsList) {
                    await packingDetails.save();
                }



                // Validate if teacategory is allowed
                if (!teaCategories.includes(teacategory)) {
                    return res.status(400).json({
                        success: false,
                        message: `Invalid teacategory provided: ${teacategory}`,
                    });
                }

                // Ensure the category field is initialized in the new record
                if (!newRecord[teacategory]) {
                    newRecord[teacategory] = { data: [], totalNet: 0 };
                }

                // Add the update to the respective tea category
                newRecord[teacategory].data.push({
                    invoicenumber,
                    sizeofbag,
                    numofbags,
                });
            }

            // Create a new Mongoose model instance with the populated record
            const newDispatch = new DispatchDetails(newRecord);

            // Save the document to the database
            await newDispatch.save();
            return res.status(200).json({
                success: true,
                message: "Dispatch successfully created",
                data: newDispatch,
            });
        }

    } catch (err) {
        return res.status(500).json({ success: false, err: err.message });
    }
};