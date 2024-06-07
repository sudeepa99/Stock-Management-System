import Packing from '../models/PackingSchema.js'
import PackingDetailsSchema from '../models/PackingDetailsSchema.js';

export const packingdetails = async (req, res) => {
  const { date, greenleaves,madetea, details } = req.body;
  try {
      let packing = null;

      console.log('Request Body:', req.body);

      if (details === 'packing') {
          packing = await Packing.findOne({ date });
      }

      if (packing) {
          return res.status(400).json({ message: 'Packing already exists' });
      }
      if (details === 'packing') {
          packing= new PackingDetailsSchema({
            date, greenleaves,madetea, details
          });
      }
     

      if (packing) {
              await packing.save();
              return res.status(200).json({ success: true, message: 'Packing successfully created' });}
       
     else {
          console.log('Invalid details or unable to create packing:', { date, greenleaves,madetea, details });
          return res.status(400).json({ success: false, message: 'Invalid details or unable to create packing' });
      }

  } catch (err) {

      console.error('Error:', err);
      res.status(500).json({ success: false, err: err.message });

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

  export const getAllPackingDetails = async (req, res) => {
    try {
        const packingD = await PackingDetailsSchema.find({}).select('-password');
        res.status(200).json({ success: true, message: "Packing  found", data: packingD });
    } catch (err) {
        res.status(404).json({ success: false, message: "Not Found" });
    }
};