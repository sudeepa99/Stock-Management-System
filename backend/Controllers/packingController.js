import Packing from '../models/PackingSchema.js'
import PackingDetailsSchema from '../models/PackingDetailsSchema.js';

export const getAllPackingDetails = async (req, res) => {
    try {
        const packingD = await PackingDetailsSchema.find({}).select('-password');
        res.status(200).json({ success: true, message: "Packing  found", data: packingD });
    } catch (err) {
        res.status(404).json({ success: false, message: "Not Found" });
    }
};

export const getDateDetails = async (req, res) => {
    try {
        const packing = await Packing.findOne().sort({ $natural: -1 });

        if (!packing) {
            return res.status(200).json({ data: true }); // Default value for getDate is true when no document is found
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
export const getMadeTea = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0]; // Define today’s date in YYYY-MM-DD format

        const packing = await PackingDetailsSchema.findOne({ date: today }); // Adjust field as needed
        console.log(packing);

        if (!packing || !packing.madetea) {
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
        // Fetch the latest sale details
        const saleDetails = await Packing.findOne().sort({ $natural: -1 });
        console.log(saleDetails);

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];

        // Fetch packing details for today
        const packingDetails = await PackingDetailsSchema.findOne({ date: today });
        console.log(packingDetails);

        // Combine saleDetails and packingDetails if both are available
        const allDetail = {
            saleDetails,
            packingDetails,
        };

        // Check if any details are available, otherwise return a 404 error
        if (!saleDetails && !packingDetails) {
            return res.status(404).json({ success: false, message: "No packing details found for today." });
        }

        return res.status(200).json({ success: true, data: allDetail });
    } catch (err) {
        console.error('Error fetching sale data:', err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export const getPackingDetails = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0]; // Define today’s date in YYYY-MM-DD format

        const packingDetails = await PackingDetailsSchema.findOne({ date: today });
        console.log(packingDetails);

        if (!packingDetails) {
            return res.status(404).json({ success: false, message: "No packing details found for today." });
        }

        return res.status(200).json({ success: true, data: packingDetails });
    } catch (err) {
        console.error('Error fetching packing details:', err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};




export const saleDetails = async (req, res) => {
    const { saleNo, startDate, endDate, details } = req.body;
    try {
        let packing_ = null;

        console.log('Request Body:', req.body);

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
                // saleDays,
            });
        }


        if (packing_) {
            if (startDate < endDate) {
                await packing_.save();
                console.log(startDate, endDate);
                return res.status(200).json({ success: true, message: 'Packing successfully created' });
            }
            else {
                console.log('Invalid details or unable to create packing:', { saleNo, startDate, endDate, details });
                return res.status(400).json({ success: false, message: 'Invalid details or unable to create packing' });
            }
        } else {
            console.log('Invalid details or unable to create packing:', { saleNo, startDate, endDate, details });
            return res.status(400).json({ success: false, message: 'Invalid details or unable to create packing' });
        }

    } catch (err) {

        console.error('Error:', err);
        res.status(500).json({ success: false, err: err.message });

    }
};

export const updatepackingdetails = async (req, res) => {
    const { teacategory, teacategoryData } = req.body;

    try {

        const currentDate = new Date().toISOString().split('T')[0];

        const document = await PackingDetailsSchema.findOne({ date: currentDate });

        if (!document) {
            return res.status(404).json({ success: false, message: 'Document with the current date not found' });
        }

        const teaCategories = [
            'BOP1A', 'FBOP', 'FBOPF1', 'OPA', 'OP', 'PEKOE', 'PEKOE1',
            'BOP', 'BOPSp', 'BOP1', 'BOPA', 'BOPF', 'FBOP1', 'FBOPF',
            'OP1', 'BP', 'FBOPFSp', 'FFEXSP', 'FFEXSP1'
        ];

        if (teaCategories.includes(teacategory)) {
            const updateField = {};
            updateField[teacategory] = teacategoryData;

            const updatedPackingDetails = await PackingDetailsSchema.findByIdAndUpdate(
                document._id,
                { $set: updateField },
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

export const packingdetails = async (req, res) => {
    const { date, greenleaves, madetea, details, teacategories } = req.body;

    try {
        // Validate request details
        if (details !== 'packing') {
            console.log('Invalid details:', details);
            return res.status(400).json({ success: false, message: 'Invalid details' });
        }

        let record = await PackingDetailsSchema.findOne({ date });

        if (record) {
            record.teacategories = teacategories;
            console.log('Updated existing record:', record);

            await record.save();

        } else {
            record = new PackingDetailsSchema({
                date,
                details,
                greenleaves,
                madetea,
                teacategories
            });

            await record.save();
        }

        return res.status(200).json({ success: true, message: 'Packing details successfully saved', data: record });

    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ success: false, message: err.message });
    }
};


