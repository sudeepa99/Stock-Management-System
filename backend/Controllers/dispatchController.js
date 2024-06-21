import DispatchSchema from "../models/DispatchSchema.js";


export const dispatchdetails = async (req, res) => {
    const { date, details, teacategory, teacategoryData, invoicenumber } = req.body;

    try {
        let record = null;

        console.log('Request Body:', req.body);

        if (details === 'packing') {
            record = await DispatchSchema.findOne({ date });
        }

        if (record) {
            return res.status(400).json({ message: 'Packing already exists' });
        }

        if (details === 'packing') {
            record = new DispatchSchema({
                date,
                details,
                invoicenumber,
                [teacategory]: teacategoryData
            });
        }

        if (record) {
            await record.save();
            return res.status(200).json({ success: true, message: 'Dispatch successfully created' });
        } else {
            console.log('Invalid details or unable to create dispatch:', { date, details });
            return res.status(400).json({ success: false, message: 'Invalid details or unable to create dispatch' });
        }

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, err: err.message });
    }
};


// export const updatedispatchgdetails = async (req, res) => {
//     const { invoice, teacategory, teacategoryData } = req.body;

//     try {
//         // Get the current date
//         const currentDate = new Date().toISOString().split('T')[0];

//         // Find the document with the current date
//         const document = await PackingDetailsSchema.findOne({ date: currentDate });

//         if (!document) {
//             return res.status(404).json({ success: false, message: 'Document with the current date not found' });
//         }

//         // Define all valid tea categories
//         const teaCategories = [
//             'BOP1A', 'FBOP', 'FBOPF1', 'OPA', 'OP', 'PEKOE', 'PEKOE1',
//             'BOP', 'BOPSp', 'BOP1', 'BOPA', 'BOPF', 'FBOP1', 'FBOPF',
//             'OP1', 'BP', 'FBOPFSp', 'FFEXSP'
//         ];

//         // Check if the provided teacategory is valid
//         if (teaCategories.includes(teacategory)) {
//             // Construct the update field dynamically
//             const updateField = {};
//             updateField[teacategory] = teacategoryData;

//             // Update the document with the new tea category data
//             const updatedPackingDetails = await PackingDetailsSchema.findByIdAndUpdate(
//                 document._id,
//                 { $set: updateField },
//                 { new: true }
//             );

//             return res.status(200).json({
//                 success: true,
//                 message: 'Successfully updated',
//                 data: updatedPackingDetails,
//             });
//         } else {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid teacategory provided',
//             });
//         }
//     } catch (err) {
//         return res.status(500).json({
//             success: false,
//             message: err.message,
//         });
//     }
// };
