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
        if (record) {
            const today = new Date().toISOString().split("T")[0];

            console.log(1);

            for (const update of updates) {
                const { teacategory, invoicenumber, sizeofbag, numofbags } = update;

                if (!teaCategories.includes(teacategory)) {
                    return res.status(400).json({
                        success: false,
                        message: `Invalid teacategory provided: ${teacategory}`,
                    });
                }
                console.log(2);

                console.log(record);

                if (!record[teacategory]) {
                    record[teacategory] = [];
                }

                // Convert the Mongoose document to a plain object
                const plainRecord = record.toObject();

                // Log the value of teacategory and the keys of the plainRecord object
                console.log(`Value of teacategory: ${teacategory}`);
                console.log(Object.keys(plainRecord)); // List of property keys in plainRecord

                // Check if teacategory is a property of plainRecord
                const isCategory = plainRecord.hasOwnProperty(teacategory);
                console.log(`is category ${isCategory} ${teacategory}`);



                if (isCategory) {

                    const teaCategoryArray = record[teacategory].data;
                    console.log(teaCategoryArray); //thiyen eka dispatch eke

                    const numofbagsArray = teaCategoryArray.map((entry) => entry.numofbags);
                    console.log(numofbagsArray); // Output all numofbags values

                    const isPresent = numofbagsArray.includes(numofbags);

                    console.log(isPresent); // This will output 'true' if '10B' is in the array, otherwise 'false'
                    if (isPresent) {
                        const b10 = numofbagsArray.filter((item) => item === "10B").length;
                        const b20 = numofbagsArray.filter((item) => item === "20B").length;
                        const b30 = numofbagsArray.filter((item) => item === "30B").length;
                        const b15 = numofbagsArray.filter((item) => item === "15B").length;
                        const b40 = numofbagsArray.filter((item) => item === "40B").length;

                        console.log(`Count of 10B bags: ${b10}`);
                        console.log(`Count of 20B bags: ${b20}`);
                        console.log(`Count of 30B bags: ${b30}`);
                        console.log(`Count of 15B bags: ${b15}`);
                        console.log(`Count of 40B bags: ${b40}`);

                        if (
                            teacategory === "BOP1A" ||
                            teacategory === "FBOP" ||
                            teacategory === "FBOPF1" ||
                            teacategory === "OPA" ||
                            teacategory === "OP" ||
                            teacategory === "PEKOE" ||
                            teacategory === "PEKOE1"
                        ) {
                            if (numofbags === '10B' && b10 < 4 && b20 == 0) {
                                teaCategoryArray.push({
                                    invoicenumber,
                                    sizeofbag,
                                    numofbags,
                                    date: today,
                                });
                                console.log(teaCategoryArray);
                                console.log(`There are bags of 10B - 3 or 20B - 3`);
                            } else if (numofbags === '20B' && b20 < 4 && b10 == 0) {

                            }

                            else if ((numofbags === '10B' || numofbags === '20B') && numofbags === '10B' && b10 == 2 && b20 == 0) {
                                teaCategoryArray.push({
                                    invoicenumber,
                                    sizeofbag,
                                    numofbags,
                                    date: today,
                                });
                                console.log(teaCategoryArray);
                                console.log(`10B-2 20B  0R 10B -3 `);
                            } else if ((numofbags === '10B' || numofbags === '20B') && b10 == 0 && b20 == 2) {
                                teaCategoryArray.push({
                                    invoicenumber,
                                    sizeofbag,
                                    numofbags,
                                    date: today,
                                });
                                console.log(teaCategoryArray);
                                console.log(`10B-1 20B-2  0R 20B -3 `);
                            } else if ((numofbags === '10B' || numofbags === '20B') && b10 == 1 && b20 == 1) {
                                teaCategoryArray.push({
                                    invoicenumber,
                                    sizeofbag,
                                    numofbags,
                                    date: today,
                                });
                                console.log(teaCategoryArray);
                                console.log(`10B-2 20B-1 OR 20B-2 10B-1`);
                            } else if (numofbags === '40B') {
                                teaCategoryArray.push({
                                    invoicenumber,
                                    sizeofbag,
                                    numofbags,
                                    date: today,
                                });
                                console.log(teaCategoryArray);
                                console.log(`40B`);
                            } else {
                                console.log("Invalid or insufficient number of bags");
                                return res.status(500).json({
                                    success: true,
                                    message: "UnSuccessfully updated",
                                    data: record,
                                });
                            }
                        }
                        else if (
                            teacategory === "BOP" ||
                            teacategory === "BOPSp" ||
                            teacategory === "BOPF" ||
                            teacategory === "FBOP1" ||
                            teacategory === "FBOPF" ||
                            teacategory === "OP1"
                        ) {
                            //10 , 20
                            if (
                                numofbags === "10B" &&
                                b10 < 2 &&
                                numofbags === "15B" &&
                                b15 == 0
                            ) {
                                teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });
                            } else if (
                                numofbags === "10B" &&
                                b10 == 0 &&
                                numofbags === "15B" &&
                                b15 < 2
                            ) {
                                teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });
                            }
                            // 20 30
                            if (
                                numofbags === "20B" &&
                                b20 < 3 &&
                                numofbags === "30B" &&
                                b30 == 0
                            ) {
                                teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });
                            } else if (
                                numofbags === "20B" &&
                                b20 == 0 &&
                                numofbags === "30B" &&
                                b30 < 3
                            ) {
                                teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });
                            } else if (
                                numofbags === "20B" &&
                                b20 < 2 &&
                                numofbags === "30B" &&
                                b30 < 2
                            ) {
                                teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });
                            } else {
                                return res.status(400).json({
                                    success: false,
                                    message:
                                        "For the selected tea category, you cannot add more bags in this size. Please check the size and number of bags allowed for this category and try again.",
                                });
                            }
                        }
                        // else if (teacategory === "BP") {
                        //     // 10 15
                        //     if (
                        //         numofbags === "10B" &&
                        //         sizeofbagValues.length < 2 &&
                        //         numofbags === "15B" &&
                        //         sizeofbagValues.length == 0
                        //     ) {
                        //         teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });
                        //     } else if (
                        //         numofbags === "10B" &&
                        //         sizeofbagValues.length == 0 &&
                        //         numofbags === "15B" &&
                        //         sizeofbagValues.length < 2
                        //     ) {
                        //         teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });
                        //     }
                        //     //20
                        //     else if (numofbags === "20B" && sizeofbagValues.length < 3) {
                        //         teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });
                        //     } else {
                        //         return res.status(400).json({
                        //             success: false,
                        //             message:
                        //                 "For the selected tea category, you cannot add more bags in this size. Please check the size and number of bags allowed for this category and try again.",
                        //         });
                        //     }
                        // } else if (
                        //     teacategory === "FBOPFSp" ||
                        //     teacategory === "FFEXSP" ||
                        //     teacategory === "FFEXSP1"
                        // ) {
                        //     if (sizeofbagValues.length < 2) {
                        //         if (
                        //             (numofbags === "10B" && sizeofbagValues.includes("10B")) ||
                        //             (numofbags === "15B" && sizeofbagValues.includes("15B")) ||
                        //             (numofbags === "20B" && sizeofbagValues.includes("20B")) ||
                        //             (numofbags === "30B" && sizeofbagValues.includes("30B")) ||
                        //             (numofbags === "10B Below" &&
                        //                 sizeofbagValues.includes("10B Below"))
                        //         ) {
                        //         } else {
                        //             teaCategoryArray.push(numofbags);
                        //         }
                        //     }
                        // } else {
                        //     return res.status(400).json({
                        //         success: false,
                        //         message: "Invalid details provided",
                        //     });
                        // }
                        //  console.log(record);

                        // Save the document to the database
                        await record.save();

                        return res.status(200).json({
                            success: true,
                            message: "Successfully updated",
                            data: record,
                        });

                    } else {
                        //No existing entry found
                        // console.log(55666);

                        teaCategoryArray.push({
                            invoicenumber,
                            sizeofbag,
                            numofbags,
                            date: today,
                        });
                        // console.log(teaCategoryArray);

                        // console.log(record);

                        // Save the document to the database
                        await record.save();

                        return res.status(200).json({
                            success: true,
                            message: "Successfully updated",
                            data: record,
                        });
                    }
                }
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
                    });


                    await record.save();

                    // Log the entire updated record
                    // console.log(record);

                    return res.status(200).json({
                        success: true,
                        message: "Successfully updated",
                        data: record,
                    });


                }
            }

            let packingDetailsList = await PackingDetailsSchema.find({
                saleNumber,
            });

            if (!packingDetailsList) {
                throw new Error("Packing details not found for the given sale number");
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
        } else {
            const today = new Date().toISOString().split("T")[0];

            const newRecord = {
                saleNumber,
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
