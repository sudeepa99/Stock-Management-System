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

// export const updatepackingdetails= async (req,res) => {
//     const id = req.params.id;
     
//     try{
//         const updatepackingdetails = await PackingDetailsSchema.findByIdAndUpdate(
//             id,
//             {$set: req.body},
//             {new: true}
//         );

//         res
//         .status(200)
//         .json({
//             success: true,
//             message: "Successfully updated",
//             data: updatepackingdetails,
//         });
//     } catch (err){
//         res.status(500).json({success: false,message:"Failed to update"});
//     }
// };



// export const updatepackingdetails = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const updatepackingdetails = await PackingDetailsSchema.findByIdAndUpdate(
//       id,
//       { $set: req.body },
//       { new: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Successfully updated",
//       data: updatepackingdetails,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to update",
//     });
//   }
// };

// export const updatepackingdetails = async (req, res) => {
//   try {
//     // Get the current date 
//     const currentDate = new Date().toISOString().split('T')[0];

//     // Find the document with the current date
//     const document = await PackingDetailsSchema.findOne({ date: currentDate });

//     if (!document) {
//       return res.status(404).json({
//         success: false,
//         message: "Document with the current date not found",
//       });
//     }

//     // Use the found document's ID to update
//     if (req.body=="OPA") {
//         const updatepackingdetails = await PackingDetailsSchema.findByIdAndUpdate(
//             document._id,
//            OPA: [ { $set: req.body },
//             { new: true }]
//           );
      
//           res.status(200).json({
//             success: true,
//             message: "Successfully updated",
//             data: updatepackingdetails,
//           });  
//     }
    
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to update",
//     });
//   }
// };


// export const updatepackingdetails = async (req, res) => {
//     const {teacategory } = req.body;

//     try {
//       // Get the current date 
//       const currentDate = new Date().toISOString().split('T')[0];
  
//       // Find the document with the current date
//       const document = await PackingDetailsSchema.findOne({ date: currentDate });
  
//       if (!document) {
//         return res.status(404).json({
//           success: false,
//           message: "Document with the current date not found",
//         });
//       }
  
//       // Check if req.body has the expected structure
//       if (teacategory === "OPA") { // Replace `someKey` with the actual key you expect in req.body
//           const updatepackingdetails = await PackingDetailsSchema.findByIdAndUpdate(
//               document._id,
//               { $set: { OPA: req.body } }, // Update the document's OPA field with req.body
//               { new: true } // Return the updated document
//             );
        
//           return res.status(200).json({
//             success: true,
//             message: "Successfully updated",
//             data: updatepackingdetails,
//           });  
//       } else {
//         return res.status(400).json({
//           success: false,
//           message: err,
//         });
//       }
      
//     }  catch (err) {
//         return res.status(500).json({
//           success: false,
//           message: err.message,
//         });
//     }
//   };
  


// export const updatepackingdetails = async (req, res) => {
//   const { teacategory } = req.body;

//   try {
//     // Get the current date
//     const currentDate = new Date().toISOString().split('T')[0];

//     // Find the document with the current date
//     const document = await PackingDetailsSchema.findOne({ date: currentDate });

//     if (!document) {
//       return res.status(404).json({
//         success: false,
//         message: "Document with the current date not found",
//       });
//     }

//     // Check if req.body has the expected structure
//     const teaCategories = [
//       "BOP1A", "FBOP", "FBOPF1", "OPA", "OP", "PEKOE", "PEKOE1",
//       "BOP", "BOPSp", "BOP1", "BOPA", "BOPF", "FBOP1", "FBOPF",
//       "OP1", "BP", "FBOPFSp", "FFEXSP"
//     ];

//     if (teaCategories.includes(teacategory)) {
//       const updateField = {};
//       updateField[teacategory] = req.body;

//       const updatedPackingDetails = await PackingDetailsSchema.findByIdAndUpdate(
//         document._id,
//         { $set: updateField },
//         { new: true }
//       );

//       return res.status(200).json({
//         success: true,
//         message: "Successfully updated",
//         data: updatedPackingDetails,
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid teacategory provided",
//       });
//     }
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };


export const updatepackingdetails = async (req, res) => {
  const { teacategory, teacategoryData } = req.body;

  try {
      // Get the current date
      const currentDate = new Date().toISOString().split('T')[0];

      // Find the document with the current date
      const document = await PackingDetailsSchema.findOne({ date: currentDate });

      if (!document) {
          return res.status(404).json({ success: false, message: 'Document with the current date not found' });
      }

      // Define all valid tea categories
      const teaCategories = [
          'BOP1A', 'FBOP', 'FBOPF1', 'OPA', 'OP', 'PEKOE', 'PEKOE1',
          'BOP', 'BOPSp', 'BOP1', 'BOPA', 'BOPF', 'FBOP1', 'FBOPF',
          'OP1', 'BP', 'FBOPFSp', 'FFEXSP'
      ];

      // Check if the provided teacategory is valid
      if (teaCategories.includes(teacategory)) {
          // Construct the update field dynamically
          const updateField = {};
          updateField[teacategory] = teacategoryData;

          // Update the document with the new tea category data
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