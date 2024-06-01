import Packing from '../models/PackingSchema.js'

export const packingdetails = async (req, res) => {
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

      const parsedStartDate = new Date(startDate);
      const parsedEndDate = new Date(endDate);

      const strippedStartDate = new Date(parsedStartDate.setUTCHours(0, 0, 0, 0));
      const strippedEndDate = new Date(parsedEndDate.setUTCHours(0, 0, 0, 0));

    
      const saleDays = [];
      let currentDate = strippedStartDate;
      while (currentDate <= strippedEndDate) {
          saleDays.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
      }

      if (details === 'packing') {
          packing_ = new Packing({
              saleNo,
              startDate,
              endDate,
              details,
              saleDays,
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