import DispatchDetails from "../models/DispatchSchema.js";

export const dispatchdetails = async (req, res) => {
    const { date, details, updates } = req.body;

    try {
        console.log('Request Body:', req.body);

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

        let record = await DispatchDetails.findOne({ date });

        const teaCategories = [
            'BOP1A', 'FBOP', 'FBOPF1', 'OPA', 'OP', 'PEKOE', 'PEKOE1',
            'BOP', 'BOPSp', 'BOP1', 'BOPA', 'BOPF', 'FBOP1', 'FBOPF',
            'OP1', 'BP', 'FBOPFSp', 'FFEXSP', 'FFEXSP1'
        ];

        const oneTeaCatogory= ['BOP1A', 'FBOP', 'FBOPF1', 'OPA', 'OP', 'PEKOE','PEKOE1'];

        if (record) {
            for (const update of updates) {

                const { teacategory, invoicenumber, sizeofbag, numofbags } = update;

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
                console.log(teacategory); 
                if (existingEntry) {
                    const sameSizeofBagEntries = teaCategoryArray.filter(entry => entry.numofbags === existingEntry.numofbags);
                    const sizeofbagValues = sameSizeofBagEntries.map(entry => entry.sizeofbag);
                    if(sizeofbagValues.length<19){
                        console.log("Gread! You have updated");    
                        teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });}
                    else{
                        console.log("Sorry! You already exceeded the number of bags");
                    }
                } else {
                    console.log(`You added new ${numofbags} bag entry`);
                    teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });
                }
            }

            await record.save();

            return res.status(200).json({
                success: true,
                message: 'Successfully updated',
                data: record,
            });
        } else {
            // Create a new record
            const newRecord = {
                date,
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
        console.error('Error:', err);
        return res.status(500).json({ success: false, err: err.message });
    }
};
