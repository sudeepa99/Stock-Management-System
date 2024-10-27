import Admin from "../models/AdminSchema.js";

export const updateAdmin = async (req,res) => {
    const id = req.params.id;
     
    try{
        const updatedAdmin = await Admin.findByIdAndUpdate(
            id,
            {$set: req.body},
            {new: true}
        );

        res
        .status(200)
        .json({
            success: true,
            message: "Successfully updated",
            data: updatedPacking,
        });
    } catch (err){
        res.status(500).json({success: false,message:"Failed to update"});
    }
};
