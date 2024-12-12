import DispatchDetails from "../models/DispatchSchema.js";
import Packing from "../models/SaleSchema.js";
import PackingDetailsSchema from '../models/PackingDetailsSchema.js';
import TeaCategoriesConst from '../Constants/TeaCategoryConst.js';

export const findByInvoiceNo = async (req, res) => {
    const { invoicenumber } = req.params;

    try {
        const record = await PackingDetailsSchema.aggregate([
            {
                $match: {
                    $or: [
                        { "BOP1A.invoiceNo": invoicenumber },
                        { "FBOP.invoiceNo": invoicenumber },
                        { "FBOPF1.invoiceNo": invoicenumber },
                        { "OPA.invoiceNo": invoicenumber },
                        { "OP.invoiceNo": invoicenumber },
                        { "PEKOE.invoiceNo": invoicenumber },
                        { "PEKOE1.invoiceNo": invoicenumber },
                        { "BOP.invoiceNo": invoicenumber },
                        { "BOPSp.invoiceNo": invoicenumber },
                        { "BOP1.invoiceNo": invoicenumber },
                        { "BOPA.invoiceNo": invoicenumber },
                        { "BOPF.invoiceNo": invoicenumber },
                        { "FBOP1.invoiceNo": invoicenumber },
                        { "FBOPF.invoiceNo": invoicenumber },
                        { "OP1.invoiceNo": invoicenumber },
                        { "BP.invoiceNo": invoicenumber },
                        { "FBOPFSp.invoiceNo": invoicenumber },
                        { "FFEXSP.invoiceNo": invoicenumber },
                        { "FFEXSP1.invoiceNo": invoicenumber }
                    ]
                }
            },
            {
                $project: {
                    result: {
                        $switch: {
                            branches: [
                                { case: { $in: [invoicenumber, "$BOP1A.invoiceNo"] }, then: { $arrayElemAt: [{ $filter: { input: "$BOP1A", as: "item", cond: { $eq: ["$$item.invoiceNo", invoicenumber] } } }, 0] } },
                                { case: { $in: [invoicenumber, "$FBOP.invoiceNo"] }, then: { $arrayElemAt: [{ $filter: { input: "$FBOP", as: "item", cond: { $eq: ["$$item.invoiceNo", invoicenumber] } } }, 0] } },
                                { case: { $in: [invoicenumber, "$FBOPF1.invoiceNo"] }, then: { $arrayElemAt: [{ $filter: { input: "$FBOPF1", as: "item", cond: { $eq: ["$$item.invoiceNo", invoicenumber] } } }, 0] } },
                                { case: { $in: [invoicenumber, "$OPA.invoiceNo"] }, then: { $arrayElemAt: [{ $filter: { input: "$OPA", as: "item", cond: { $eq: ["$$item.invoiceNo", invoicenumber] } } }, 0] } },
                                { case: { $in: [invoicenumber, "$OP.invoiceNo"] }, then: { $arrayElemAt: [{ $filter: { input: "$OP", as: "item", cond: { $eq: ["$$item.invoiceNo", invoicenumber] } } }, 0] } },
                                { case: { $in: [invoicenumber, "$PEKOE.invoiceNo"] }, then: { $arrayElemAt: [{ $filter: { input: "$PEKOE", as: "item", cond: { $eq: ["$$item.invoiceNo", invoicenumber] } } }, 0] } },
                                { case: { $in: [invoicenumber, "$PEKOE1.invoiceNo"] }, then: { $arrayElemAt: [{ $filter: { input: "$PEKOE1", as: "item", cond: { $eq: ["$$item.invoiceNo", invoicenumber] } } }, 0] } },
                                { case: { $in: [invoicenumber, "$BOP.invoiceNo"] }, then: { $arrayElemAt: [{ $filter: { input: "$BOP", as: "item", cond: { $eq: ["$$item.invoiceNo", invoicenumber] } } }, 0] } },
                                { case: { $in: [invoicenumber, "$BOPSp.invoiceNo"] }, then: { $arrayElemAt: [{ $filter: { input: "$BOPSp", as: "item", cond: { $eq: ["$$item.invoiceNo", invoicenumber] } } }, 0] } },
                                { case: { $in: [invoicenumber, "$BOP1.invoiceNo"] }, then: { $arrayElemAt: [{ $filter: { input: "$BOP1", as: "item", cond: { $eq: ["$$item.invoiceNo", invoicenumber] } } }, 0] } },
                                { case: { $in: [invoicenumber, "$BOPA.invoiceNo"] }, then: { $arrayElemAt: [{ $filter: { input: "$BOPA", as: "item", cond: { $eq: ["$$item.invoiceNo", invoicenumber] } } }, 0] } },
                                { case: { $in: [invoicenumber, "$BOPF.invoiceNo"] }, then: { $arrayElemAt: [{ $filter: { input: "$BOPF", as: "item", cond: { $eq: ["$$item.invoiceNo", invoicenumber] } } }, 0] } },
                                { case: { $in: [invoicenumber, "$FBOP1.invoiceNo"] }, then: { $arrayElemAt: [{ $filter: { input: "$FBOP1", as: "item", cond: { $eq: ["$$item.invoiceNo", invoicenumber] } } }, 0] } },
                                { case: { $in: [invoicenumber, "$FBOPF.invoiceNo"] }, then: { $arrayElemAt: [{ $filter: { input: "$FBOPF", as: "item", cond: { $eq: ["$$item.invoiceNo", invoicenumber] } } }, 0] } },
                                { case: { $in: [invoicenumber, "$OP1.invoiceNo"] }, then: { $arrayElemAt: [{ $filter: { input: "$OP1", as: "item", cond: { $eq: ["$$item.invoiceNo", invoicenumber] } } }, 0] } },
                                { case: { $in: [invoicenumber, "$BP.invoiceNo"] }, then: { $arrayElemAt: [{ $filter: { input: "$BP", as: "item", cond: { $eq: ["$$item.invoiceNo", invoicenumber] } } }, 0] } },
                                { case: { $in: [invoicenumber, "$FBOPFSp.invoiceNo"] }, then: { $arrayElemAt: [{ $filter: { input: "$FBOPFSp", as: "item", cond: { $eq: ["$$item.invoiceNo", invoicenumber] } } }, 0] } },
                                { case: { $in: [invoicenumber, "$FFEXSP.invoiceNo"] }, then: { $arrayElemAt: [{ $filter: { input: "$FFEXSP", as: "item", cond: { $eq: ["$$item.invoiceNo", invoicenumber] } } }, 0] } },
                                { case: { $in: [invoicenumber, "$FFEXSP1.invoiceNo"] }, then: { $arrayElemAt: [{ $filter: { input: "$FFEXSP1", as: "item", cond: { $eq: ["$$item.invoiceNo", invoicenumber] } } }, 0] } }
                            ],
                            default: null
                        }
                    }
                }
            }
        ]);

        if (!record || record.length === 0 || !record[0].result) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        res.json(record[0].result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching packing details' });
    }
};

export const dispatchDetails = async (req, res) => {
    const { details, updates } = req.body;
    const packing = await Packing.findOne().sort({ $natural: -1 });
    const saleNumber = packing.saleNo;
    try {
        if (details !== 'packing') {
            return res.status(400).json({
                success: false,
                message: 'Invalid details provided',
            });
        }

        if (!Array.isArray(updates)) {
            return res.status(400).json({
                success: false,
                message: 'Updates must be an array',
            });
        }

        let record = await DispatchDetails.findOne({ saleNumber });

        const teaCategories = TeaCategoriesConst;
        if (record) {
            for (const update of updates) {

                const { teacategory, invoicenumber, sizeofbag, numofbags } = update;
                let packingDetails = await PackingDetailsSchema.findOne({ saleNumber });

                if (!packingDetails) {
                    throw new Error('Packing details not found for the given sale number');
                }
                let packingBag = 0;
                if (numofbags == "10B") {
                    packingBag = 10;
                }
                else if (numofbags == "15B") {
                    packingBag = 15;
                } else if (numofbags == "20B") {
                    packingBag = 20;
                } else if (numofbags == "30B") {
                    packingBag = 30;
                } else if (numofbags == "40B") {
                    packingBag = 40;
                }

                // Find the correct category and invoice to update
                let updated = false;
                for (const category of Object.keys(packingDetails.toObject())) {
                    if (Array.isArray(packingDetails[category])) {
                        for (let item of packingDetails[category]) {
                            if (item.invoiceNo === invoicenumber) {
                                const updatedNumOfBags = item.numofbags - packingBag;
                                if (updatedNumOfBags < 0) {
                                    return res.status(400).json({
                                        success: false,
                                        message: `Insufficient bags for invoice ${invoicenumber}`,
                                    });
                                }
                                item.numofbags = updatedNumOfBags;
                                updated = true;
                                break;
                            }
                        }
                    }
                    if (updated) break;
                }

                if (!updated) {
                    return res.status(400).json({
                        success: false,
                        message: `Invoice number not found in any category`,
                    });
                }

                // Save the updated document
                await packingDetails.save();

                if (!teaCategories.includes(teacategory)) {
                    return res.status(400).json({
                        success: false,
                        message: `Invalid teacategory provided: ${teacategory}`,
                    });
                }
                if (!record[teacategory]) {
                    record[teacategory] = [];
                }
                const teaCategoryArray = record[teacategory];
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
                                sizeofbagValues.push(numofbags);
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
            const newRecord = {
                saleNumber,
                details,
            };

            for (const update of updates) {
                const { teacategory, invoicenumber, sizeofbag, numofbags } = update;

                if (!teaCategories.includes(teacategory)) {
                    return res.status(400).json({
                        success: false,
                        message: `Invalid teacategory provided: ${teacategory}`,
                    });
                }

                if (!newRecord[teacategory]) {
                    newRecord[teacategory] = [];
                }

                newRecord[teacategory].push({ invoicenumber, sizeofbag, numofbags });
            }

            const newDispatch = new DispatchDetails(newRecord);

            await newDispatch.save();

            return res.status(200).json({
                success: true,
                message: 'Dispatch successfully created',
                data: newDispatch,
            });
        }

    } catch (err) {
        return res.status(500).json({ success: false, err: err.message });
    }
};
