import DispatchDetails from "../models/DispatchSchema.js";
import Packing from "../models/PackingSchema.js";

export const dispatchdetails = async (req, res) => {

    const { date, details, updates } = req.body;
    const packing = await Packing.findOne().sort({ $natural: -1 });
    const saleNumber = packing.saleNo;

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

        let record = await DispatchDetails.findOne({ saleNumber });

        const teaCategories = [
            'BOP1A', 'FBOP', 'FBOPF1', 'OPA', 'OP', 'PEKOE', 'PEKOE1',
            'BOP', 'BOPSp', 'BOP1', 'BOPA', 'BOPF', 'FBOP1', 'FBOPF',
            'OP1', 'BP', 'FBOPFSp', 'FFEXSP', 'FFEXSP1'
        ];
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
                if (existingEntry) {
                    const sameSizeofBagEntries = teaCategoryArray.filter(entry => entry.numofbags === existingEntry.numofbags);
                    const sizeofbagValues = sameSizeofBagEntries.map(entry => entry.sizeofbag);
                    if (teacategory ==='BOP1A'||  teacategory === 'FBOP'|| teacategory === 'FBOPF'|| teacategory === 'OPA'|| teacategory === 'OP'|| teacategory === 'PEKOE'|| teacategory === 'PEKOE') {
                        if((numofbags==="10B"&&sizeofbagValues.length<3)&& (numofbags==="20B"&&sizeofbagValues.length<2)){
                        console.log("10B * 2 20 B");
                        console.log("Gread! You have updated");    
                        teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });}
                        else if((numofbags==="10B"&&sizeofbagValues.length<2)&& (numofbags==="20B"&&sizeofbagValues.length<1)){
                        console.log("10B * 1 20 B * 2");
                        console.log("Gread! You have updated");    
                        teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });}
                        else if((numofbags==="10B"&&sizeofbagValues.length<4)&& (numofbags==="20B"&&sizeofbagValues.length==0)){
                        console.log("10B * 3");
                        console.log("Gread! You have updated");    
                        teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });}
                        else if((numofbags==="10B"&&sizeofbagValues.length==0)&& (numofbags==="20B"&&sizeofbagValues.length<4)){
                            console.log("10B * 3");
                            console.log("Gread! You have updated");    
                            teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });}
                        else{
                            return res.status(400).json({
                                success: false,
                                message: 'You cannot add more than',
                            });
                        }
                    }
                    else if(teacategory === 'BOP'|| teacategory ==='BOPSp'|| teacategory === 'BOPF'|| teacategory === 'FBOP1'|| teacategory === 'FBOPF'|| teacategory === 'OP1'){
                        //10 , 20
                        if((numofbags==="10B"&&sizeofbagValues.length<2)&& (numofbags==="15B"&&sizeofbagValues.length==0)){
                            console.log("10B * 1 15b 0");
                            console.log("Gread! You have updated");    
                            teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });}
                            else if((numofbags==="10B"&&sizeofbagValues.length==0)&& (numofbags==="15B"&&sizeofbagValues.length<2)){
                            console.log("10B * 0 15B * 1");
                            console.log("Gread! You have updated");    
                            teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });}
                            // 20 30
                            if((numofbags==="20B"&&sizeofbagValues.length<3)&& (numofbags==="30B"&&sizeofbagValues.length==0)){
                            console.log("20 * 2");
                            console.log("Gread! You have updated");    
                            teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });}
                            else if((numofbags==="20B"&&sizeofbagValues.length==0)&& (numofbags==="30B"&&sizeofbagValues.length<3)){
                            console.log("30 * 2");
                            console.log("Gread! You have updated");    
                            teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });}
                            else if((numofbags==="20B"&&sizeofbagValues.length<2)&& (numofbags==="30B"&&sizeofbagValues.length<2)){
                            console.log("Gread! You have updated");    
                            console.log("20 , 30");
                            teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });}
                            else{
                                return res.status(400).json({
                                    success: false,
                                    message: 'You cannot add more than',
                                });
                            }
                    }
                    else if(teacategory === 'BP'){
                        // 10 15
                        if((numofbags==="10B"&&sizeofbagValues.length<2)&& (numofbags==="15B"&&sizeofbagValues.length==0)){
                            console.log("10B * 1 15b 0");
                            console.log("Gread! You have updated");    
                            teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });}
                            else if((numofbags==="10B"&&sizeofbagValues.length==0)&& (numofbags==="15B"&&sizeofbagValues.length<2)){
                            console.log("10B * 0 15B * 1");
                            console.log("Gread! You have updated");    
                            teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });}
                            //20
                            else if((numofbags==="20B"&&sizeofbagValues.length<3)){
                            console.log("20 2");
                            console.log("Gread! You have updated");    
                            teaCategoryArray.push({ invoicenumber, sizeofbag, numofbags });}
                            else{
                                return res.status(400).json({
                                    success: false,
                                    message: 'You cannot add more than',
                                });
                            }
                    }
                    else if(teacategory === 'FBOPFSp'|| teacategory === 'FFEXSP'||teacategory === 'FFEXSP1'){
                        if (sizeofbagValues.length < 2) {
                            if ((numofbags === "10B" && sizeofbagValues.includes("10B")) ||
                                (numofbags === "15B" && sizeofbagValues.includes("15B")) ||
                                (numofbags === "20B" && sizeofbagValues.includes("20B")) ||
                                (numofbags === "30B" && sizeofbagValues.includes("30B")) ||
                                (numofbags === "10B Below" && sizeofbagValues.includes("10B Below"))) {
                                console.log("You have exceeded the limit. You cannot add this bag type again.");
                            } else {
                                sizeofbagValues.push(numofbags);
                                console.log("Bag added successfully.");
                            }
                        } else {
                            console.log("You have reached the maximum number of bags.");
                        }
                    }
                    else{
                        return res.status(400).json({
                            success: false,
                            message: 'Invalid details provided',
                        });
                    }

                } else {
                    console.log("You have reached the maximum number of bags.");
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
        console.error('Error:', err);
        return res.status(500).json({ success: false, err: err.message });
    }
};
