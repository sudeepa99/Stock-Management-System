import Packing from '../models/SaleSchema.js'
import PackingDetailsSchema from '../models/PackingDetailsSchema.js';
import TeaCategoriesConst from '../Constants/TeaCategoryConst.js';

//Create a new sale 
export const saleDetails = async (req, res) => {
    const { saleNo, startDate, endDate, details } = req.body;
    try {
        let packing_ = null;

        if (details === 'packing') {
            packing_ = await Packing.findOne({ saleNo });
        }

        if (packing_) {
            return res.status(400).json({ message: 'Packing already exists' });
        }
        if (details === 'packing') {
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
                return res.status(200).json({ success: true, message: 'Packing successfully created' });
            }
            else {
                return res.status(400).json({ success: false, message: 'Invalid details or unable to create packing' });
            }
        } else {
            return res.status(400).json({ success: false, message: 'Invalid details or unable to create packing' });
        }

    } catch (err) {

        console.error('Error:', err);
        res.status(500).json({ success: false, err: err.message });

    }
};

// Create Endpoint  for Recieved tea and made tea
export const packingDetails = async (req, res) => {
    const { date, greenleaves, madetea, details, teacategories } = req.body;
    const packing = await Packing.findOne().sort({ $natural: -1 });
    try {
        // Validate request details
        if (details !== 'packing') {
            return res.status(400).json({ success: false, message: 'Invalid details' });
        }
        let record = await PackingDetailsSchema.findOne({ date });
        if (record) {
            record.teacategories = teacategories;
            await record.save();

        } else {
            record = new PackingDetailsSchema({
                date,
                details,
                greenleaves,
                madetea,
                teacategories,
                saleNumber: packing.saleNo,
            });

            await record.save();
        }

        return res.status(200).json({ success: true, message: 'Packing details successfully saved', data: record });

    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

// Retrieve Endpoint for Packing details
export const updatePackingDetails = async (req, res) => {
    const { teacategory, teacategoryData } = req.body;

    try {
        const currentDate = new Date().toISOString().split('T')[0];

        const document = await PackingDetailsSchema.findOne({ date: currentDate });

        if (!document) {
            return res.status(404).json({ success: false, message: 'Document with the current date not found' });
        }

        const teaCategories = TeaCategoriesConst;
        const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
        const categoryCode = teacategory.toUpperCase();

        if (teaCategories.includes(teacategory)) {
            const latestPacking = await PackingDetailsSchema.findOne({
                invoiceNo: { $regex: `^INV-${datePart}-${categoryCode}` },
            }).sort({ $natural: -1 });

            let newInvoiceNo;

            if (latestPacking) {
                // Extract the last sequence number
                const lastSeqNum = parseInt(latestPacking.invoiceNo.split('-')[3]) || 0;
                const sequenceNumber = String(lastSeqNum + 1).padStart(3, '0');
                newInvoiceNo = `INV-${datePart}-${categoryCode}-${sequenceNumber}`;
            } else {
                // First invoice for this date and category
                newInvoiceNo = `INV-${datePart}-${categoryCode}-001`;
            }

            // Create the new tea category data item with the unique invoice number
            const newItem = {
                ...teacategoryData,
                invoiceNo: newInvoiceNo,
            };

            // Update the packing details document by pushing the new item into the specified category array
            const updatedPackingDetails = await PackingDetailsSchema.findOneAndUpdate(
                { _id: document._id },
                { $push: { [teacategory]: newItem } }, // Use $push to add to the array
                { new: true }
            );
            return res.status(200).json({
                success: true,
                message: 'Successfully updated',
                data: updatedPackingDetails,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid teacategory provided',
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

//Get the latest packin details
export const getPackingDetails = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];

        const packingDetails = await PackingDetailsSchema.findOne({ date: today });

        if (!packingDetails) {
            return res.status(404).json({ success: false, message: "No packing details found for today." });
        }

        return res.status(200).json({ success: true, data: packingDetails });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

//FoR Report
export const getAllPackingDetails = async (req, res) => {
    try {
        const packingD = await PackingDetailsSchema.find({}).select('-password');
        res.status(200).json({ success: true, message: "Packing  found", data: packingD });
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
        const formattedDate = saleDate.toISOString().split('T')[0];
        const currentDate = new Date().toISOString().split('T')[0];

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
        const today = new Date().toISOString().split('T')[0];

        const packing = await PackingDetailsSchema.findOne({ date: today });

        if (!packing || !packing.madetea) {
            console.warn('No tea made for today:', today);
            return res.status(204).json({ data: false });
        }

        return res.status(200).json({ data: true });
    } catch (err) {
        console.error('Error fetching made tea data:', err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getSaleDetails = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];

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

        const allDetails = {
            saleDetails: saleDetails || null,
            packingDetails: packingDetails || null,
        };

        return res.status(200).json({
            success: true,
            data: allDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching sale details. Please try again later.",
        });
    }
};











