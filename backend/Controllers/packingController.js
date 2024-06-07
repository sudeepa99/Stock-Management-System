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
            if (startDate<endDate) {
                await packing_.save();
                console.log(startDate,endDate);
                return res.status(200).json({ success: true, message: 'Packing successfully created' });
            }
            else{
            console.log('Invalid details or unable to create packing:', { saleNo, startDate, endDate, details });
            return res.status(400).json({ success: false, message: 'Invalid details or unable to create packing' });}
        } else {
            console.log('Invalid details or unable to create packing:', { saleNo, startDate, endDate, details });
            return res.status(400).json({ success: false, message: 'Invalid details or unable to create packing' });
        }
  
    } catch (err) {
  
        console.error('Error:', err);
        res.status(500).json({ success: false, err: err.message });
  
    }
  };




  export const categoryDetails = async (req, res) => {
    const { teacategory, sizeofbag, numofbags, details } = req.body;
    try {
        let record = null;

        console.log('Request Body:', req.body);

        if (details === 'packing') {
            record = await PackingDetailsSchema.findOne({ teacategory });
        }

        if (record) {
            return res.status(400).json({ message: 'Packing already exists' });
        }

        if (details === 'packing') {
            record = new PackingDetailsSchema({
                
                details,

                categoryDetails:{teacategory,
                sizeofbag,
                numofbags}
            });
        }

        if (record) {
            await record.save();
            console.log(teacategory, sizeofbag, numofbags, details);
            return res.status(200).json({ success: true, message: 'Packing successfully created' });
        } else {
            console.log('Invalid details or unable to create packing:', { teacategory, sizeofbag, numofbags, details });
            return res.status(400).json({ success: false, message: 'Invalid details or unable to create packing' });
        }

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, err: err.message });
    }
};

export const packingdetails = async (req, res) => {
    const { date, greenleaves, madetea, details } = req.body;
    try {
        let record = null;

        console.log('Request Body:', req.body);

        if (details === 'packing') {
            record = await PackingDetailsSchema.findOne({ date });
        }

        if (record) {
            return res.status(400).json({ message: 'Packing already exists' });
        }

        if (details === 'packing') {
            record = new PackingDetailsSchema({
                date,
                details,
                greenleaves,
                madetea
            });
        }

        if (record) {
            await record.save();
            return res.status(200).json({ success: true, message: 'Packing successfully created' });
        } else {
            console.log('Invalid details or unable to create packing:', { date, greenleaves, madetea, details });
            return res.status(400).json({ success: false, message: 'Invalid details or unable to create packing' });
        }

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, err: err.message });
    }
};


export const updatepackingdetails= async (req,res) => {
    const id = req.params.id;
     
    try{
        const updatepackingdetails = await PackingDetailsSchema.findByIdAndUpdate(
            id,
            {$set: req.body},
            {new: true}
        );

        res
        .status(200)
        .json({
            success: true,
            message: "Successfully updated",
            data: updatepackingdetails,
        });
    } catch (err){
        res.status(500).json({success: false,message:"Failed to update"});
    }
};