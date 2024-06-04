import PackingDispatcher from "../models/PackingDispatcherSchema.js"
import Packing from "../models/PackingSchema.js";

// get all PackingDispatchers
export const getAllPackingDispatchers = async (req, res) => {

    try {
        const PackingDispatchers = await PackingDispatcher.find({});

            return res.status(200).json({ success: true, message: "successful",data:PackingDispatchers });
        }
     catch (err) {
        res.status(404).json({ success: false, message: "No  found" });
    }
};

// create PackingDispatcher
export const createPackingDispatcher = async(req,res)=>{
    if(!req.body.Packing) req.body.Packing=req.params.PackingId
    if(!req.body.admin) req.body.user=req.params.adminId
    const newPackingDispatcher = new PackingDispatcher(req.body);
    try {
        const savedPackingDispatcher = await newPackingDispatcher.save();
    
        // After creating a new PackingDispatcher, update the PackingDispatcher array of the tour
        await Packing.findByIdAndUpdate(req.body.Packing, {
          $push: { PackingDispatchers: savedPackingDispatcher._id },
        });
    
        res.status(200).json({
          success: true,
          message: "PackingDispatcher submitted",
          data: savedPackingDispatcher,
        });
      }
      catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({
            success: false,
            message: 'Internal Server Error', // Provide a more generic message
            error: error.message // Optionally include the actual error message
        });
    }
}    