import DispatchSchema from "../models/DispatchSchema";
export const dispatchdetails = async (req, res) => {
    const { date, details } = req.body;
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
            });
        }

        if (record) {
            await record.save();
            return res.status(200).json({ success: true, message: 'Dispatch successfully created' });
        } else {
            console.log('Invalid details or unable to create dispatch:', { date,  details });
            return res.status(400).json({ success: false, message: 'Invalid details or unable to create dispatch' });
        }

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, err: err.message });
    }
};