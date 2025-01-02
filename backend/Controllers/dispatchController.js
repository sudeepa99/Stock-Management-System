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

        let record = await DispatchDetails.findOne({ saleNumber });
        const teaCategories = TeaCategoriesConst;

        // todo: check if the dispatch record exists
        if (record) {
            const today = new Date().toISOString().split("T")[0];

            for (const update of updates) {
                const { teacategory, invoicenumber, sizeofbag, numofbags, broker } =
                    update;

                const Bop1aToPekoe1 =
                    teacategory === "BOP1A" ||
                    teacategory === "FBOP" ||
                    teacategory === "FBOPF1" ||
                    teacategory === "OPA" ||
                    teacategory === "OP" ||
                    teacategory === "PEKOE" ||
                    teacategory === "PEKOE1";

                const BopSpToOp1 =
                    teacategory === "BOP" ||
                    teacategory === "BOPSp" ||
                    teacategory === "BOP1" ||
                    teacategory === "BOPA" ||
                    teacategory === "BOPF" ||
                    teacategory === "FBOP1" ||
                    teacategory === "FBOPF" ||
                    teacategory === "OP1";

                const Bp = teacategory === "BP";

                const FbopfSpToFfexsp1 =
                    teacategory === "FBOPFSp" ||
                    teacategory === "FFEXSP" ||
                    teacategory === "FFEXSP1";

                if (!teaCategories.includes(teacategory)) {
                    return res.status(400).json({
                        success: false,
                        message: `Invalid teacategory provided: ${teacategory}`,
                    });
                }

                if (!record[teacategory]) {
                    record[teacategory] = [];
                }

                // Convert the Mongoose document to a plain object
                const plainRecord = record.toObject();
                // Check if teacategory is a property of plainRecord
                const isCategory = plainRecord.hasOwnProperty(teacategory);
                // todo: check if the dispatch record exists with the given tea category
                if (isCategory) {
                    const teaCategoryArray = record[teacategory].data;

                    const numofbagsArray = teaCategoryArray.map(
                        (entry) => entry.numofbags
                    );

                    const newEntry = {
                        invoicenumber,
                        sizeofbag,
                        numofbags,
                        date: today,
                        broker,
                    };
                    //  teaCategoryArray.push(newEntry);

                    const isPresent = numofbagsArray.includes(numofbags);

                    const b10 = numofbagsArray.filter((item) => item === "10B").length;
                    const b20 = numofbagsArray.filter((item) => item === "20B").length;
                    const b30 = numofbagsArray.filter((item) => item === "30B").length;
                    const b15 = numofbagsArray.filter((item) => item === "15B").length;
                    const b40 = numofbagsArray.filter((item) => item === "40B").length;
                    const b01 = numofbagsArray.filter((item) => item === "10B Below").length;

                    // todo: the dispatch record exists with the given tea category given num of bags
                    if (isPresent) {
                        //-------------1-----------------//
                        if (Bop1aToPekoe1) {
                            console.log(1);

                            if (numofbags === "10B" && b10 < 3 && b20 == 0) {
                                console.log(2);
                                teaCategoryArray.push(newEntry);
                                await record.save();
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

                                return res.status(200).json({
                                    success: true,
                                    message: `Successfully updated ${teacategory}`,
                                    data: record,
                                });
                            } else if (numofbags === "20B" && b20 < 3 && b10 == 0) {
                                console.log(3);
                                teaCategoryArray.push(newEntry);
                                await record.save();
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

                                return res.status(200).json({
                                    success: true,
                                    message: `Successfully updated ${teacategory}`,
                                    data: record,
                                });
                            } else if ((numofbags === "10B" || numofbags === "20B") && b10 == 2 && b20 == 0) {
                                console.log(4);
                                teaCategoryArray.push(newEntry);
                                await record.save();
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

                                return res.status(200).json({
                                    success: true,
                                    message: `Successfully updated ${teacategory}`,
                                    data: record,
                                });
                            } else if ((numofbags === "10B" || numofbags === "20B") && b10 == 0 && b20 == 2) {
                                console.log(5);
                                teaCategoryArray.push(newEntry);
                                await record.save();
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

                                return res.status(200).json({
                                    success: true,
                                    message: `Successfully updated ${teacategory}`,
                                    data: record,
                                });
                            } else if ((numofbags === "10B" || numofbags === "20B") && b10 == 1 && b20 == 1) {
                                console.log(6);
                                teaCategoryArray.push(newEntry);
                                await record.save();
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

                                return res.status(200).json({
                                    success: true,
                                    message: `Successfully updated ${teacategory}`,
                                    data: record,
                                });
                            } else if (numofbags === "40B") {
                                console.log(7);
                                teaCategoryArray.push(newEntry);
                                await record.save();
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

                                return res.status(200).json({
                                    success: true,
                                    message: `Successfully updated ${teacategory}`,
                                    data: record,
                                });
                            } else {
                                return res.status(500).json({
                                    success: true,
                                    message: "UnSuccessfully updated",
                                    data: record,
                                });
                            }
                        }
                        //---------------2---------------//
                        else if (BopSpToOp1) {
                            if (numofbags === "20B" && b20 == 1 && b30 == 0) {
                                console.log(8);
                                teaCategoryArray.push(newEntry);
                                await record.save();
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

                                return res.status(200).json({
                                    success: true,
                                    message: `Successfully updated ${teacategory}`,
                                    data: record,
                                });
                            } else if (numofbags === "30B" && b30 == 1 && b20 == 0) {
                                console.log(9);
                                teaCategoryArray.push(newEntry);
                                await record.save();
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

                                return res.status(200).json({
                                    success: true,
                                    message: `Successfully updated ${teacategory}`,
                                    data: record,
                                });
                            } else if (b20 == 1 && numofbags === "30B" && b30 == 0) {
                                console.log(10);
                                teaCategoryArray.push(newEntry);
                                await record.save();
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

                                return res.status(200).json({
                                    success: true,
                                    message: `Successfully updated ${teacategory}`,
                                    data: record,
                                });
                            } else if (b20 == 0 && numofbags === "20B" && b30 == 1) {
                                console.log(11);
                                teaCategoryArray.push(newEntry);
                                await record.save();
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

                                return res.status(200).json({
                                    success: true,
                                    message: `Successfully updated ${teacategory}`,
                                    data: record,
                                });
                            } else if (numofbags === "40B") {
                                console.log(12);
                                teaCategoryArray.push(newEntry);
                                await record.save();
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

                                return res.status(200).json({
                                    success: true,
                                    message: `Successfully updated ${teacategory}`,
                                    data: record,
                                });
                            } else {
                                console.log(13);
                                return res.status(400).json({
                                    success: false,
                                    message: "Here is the message",
                                });
                            }
                        }
                        //---------------3-----------------//
                        else if (Bp) {
                            if (numofbags === "20B" && b20 == 1) {
                                console.log(14);
                                teaCategoryArray.push(newEntry);
                                await record.save();
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

                                return res.status(200).json({
                                    success: true,
                                    message: `Successfully updated ${teacategory}`,
                                    data: record,
                                });
                            } else if (numofbags === "40B") {
                                console.log(15);
                                teaCategoryArray.push(newEntry);
                                await record.save();
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

                                return res.status(200).json({
                                    success: true,
                                    message: `Successfully updated ${teacategory}`,
                                    data: record,
                                });
                            } else {
                                console.log(16);
                                return res.status(400).json({
                                    success: false,
                                    message: "Here is the message",
                                });
                            }
                        }
                        //---------------4-----------------//
                        else if (FbopfSpToFfexsp1) {
                            if (
                                (numofbags === "10B" && b10 == 1) ||
                                (numofbags === "15B" && b15 == 1) ||
                                (numofbags === "20B" && b20 == 1) ||
                                (numofbags === "30B" && b30 == 1) ||
                                (numofbags === "40B" && b40 == 1) ||
                                (numofbags === "10B Below" && b01 == 1)
                            ) {
                                console.log(17);
                                return res.status(400).json({
                                    success: false,
                                    message: "Here is the message",
                                });
                            }
                        }
                        else {
                            console.log(18);
                            return res.status(400).json({
                                success: false,
                                message: "Invalid details provided",
                            });
                        }
                    }

                    // todo: the dispatch record exists with the given tea category but not the given num of bags
                    else {
                        if (Bop1aToPekoe1) {
                            console.log(19);

                            if (numofbags === "40B" || (numofbags === "20B" && b10 <= 2 && b20 == 0) || (numofbags === "10B" && b20 <= 2 && b10 == 0)) {
                                console.log(20);
                                teaCategoryArray.push(newEntry);
                                await record.save();
                                await record.save();
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

                                return res.status(200).json({
                                    success: true,
                                    message: `Successfully updated ${teacategory}`,
                                    data: record,
                                });

                            }
                            else if (b10 == 3 || b20 == 3) {
                                console.log(21);
                                console.log("Invalid or insufficient number of bags");
                                return res.status(500).json({
                                    success: true,
                                    message: "UnSuccessfully updated",
                                    data: record,
                                });
                            }
                            else {
                                console.log(22);
                                return res.status(400).json({
                                    success: false,
                                    message: "Invalid details provided",
                                });
                            }
                        } else if (BopSpToOp1) {
                            if ((numofbags === "20B" && b30 == 1) || (numofbags === "30B" && b20 == 1) || numofbags === "40B" || (numofbags === "20B" && b30 == 0) || (numofbags === "30B" && b20 == 0)) {
                                console.log(23);
                                teaCategoryArray.push({
                                    invoicenumber,
                                    sizeofbag,
                                    numofbags,
                                    date: today,
                                    broker,
                                });
                                console.log(`There are bags of 10B - 3 or 20B - 3`);
                                await record.save();

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
                                return res.status(200).json({
                                    success: true,
                                    message: "Successfully updated",
                                    data: record,
                                });
                            }
                            else if (numofbags === "15B" || numofbags === "10B") {
                                console.log(24);
                                return res.status(400).json({
                                    success: false,
                                    message: "You cannot add both 10B and 15B",
                                });
                            }
                            else {
                                console.log(25);
                                return res.status(400).json({
                                    success: false,
                                    message: "BP 15 Cannot be added",
                                });
                            }
                        } else if (Bp) {
                            if (numofbags === "20B" || numofbags === "40B") {
                                console.log(26);
                                teaCategoryArray.push({
                                    invoicenumber,
                                    sizeofbag,
                                    numofbags,
                                    date: today,
                                    broker,
                                });
                                console.log(`There are bags of 10B - 3 or 20B - 3`);
                                await record.save();

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
                                return res.status(200).json({
                                    success: true,
                                    message: "Successfully updated",
                                    data: record,
                                });
                            } else if (numofbags === "15B" || numofbags === "10B") {
                                console.log(27);
                                return res.status(400).json({
                                    success: false,
                                    message: "You cannot add both 10B and 15B",
                                });
                            } else {
                                console.log(28);
                                return res.status(400).json({
                                    success: false,
                                    message: "BP 15 Cannot be added",
                                });
                            }
                        } else if (FbopfSpToFfexsp1) {
                            if (
                                (numofbags === "10B" ||
                                    numofbags === "15B" ||
                                    numofbags === "20B" ||
                                    numofbags === "30B" ||
                                    numofbags === "40B" ||
                                    numofbags === "10B Below") &&
                                b10 == 0 &&
                                b15 == 0 &&
                                b20 == 0 &&
                                b30 == 0 &&
                                b40 == 0 &&
                                b01 == 0
                            ) {
                                console.log(29);
                                teaCategoryArray.push({
                                    invoicenumber,
                                    sizeofbag,
                                    numofbags,
                                    date: today,
                                    broker,
                                });
                                console.log(`There are bags of 10B - 3 or 20B - 3`);
                                await record.save();

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
                                return res.status(200).json({
                                    success: true,
                                    message: "Successfully updated",
                                    data: record,
                                });
                            } else {
                                console.log(30);
                                return res.status(400).json({
                                    success: false,
                                    message: "BP 15 Cannot be added",
                                });
                            }
                        } else {
                            console.log(31);
                            return res.status(400).json({
                                success: false,
                                message: "BP 15 Cannot be added",
                            });
                        }
                    }
                }

                // todo: the dispatch record exists without the given tea category
                else {
                    // Ensure the category field is initialized in the new record
                    if (!record[teacategory]) {
                        record[teacategory] = { data: [], totalNet: 0 };
                    }

                    // Add the update to the respective tea category
                    record[teacategory].data.push({
                        invoicenumber,
                        sizeofbag,
                        numofbags,
                        date: today,
                        broker,
                    });
                    await record.save();

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

                    return res.status(200).json({
                        success: true,
                        message: `Successfully updated ${teacategory}`,
                        data: record,
                    });
                }
            }
        }

        //:what to do add the new dispatch to the database
        else {
            const newRecord = {
                saleNumber,
                details,
            };

            // Iterate through updates to populate tea categories
            for (const update of updates) {
                const { teacategory, invoicenumber, sizeofbag, numofbags, broker } =
                    update;
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
                    date: today,
                    broker,
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
