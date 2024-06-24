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

// export const deletePacking = async (req,res) => {
//     const id = req.params.id;
     
//     try{
//         await Packing.findByIdAndDelete(
//             id,
            
//         );

//         res
//         .status(200)
//         .json({
//             success: true,
//             message: "Successfully deleted",
//         });
//     } catch (err){
//         res.status(500).json({success: false,message:"Failed to delete"});
//     }
// };

// export const getSinglePacking = async (req,res) => {
//     const id = req.params.id;
     
//     try{
//         const Packing = await Packing.findById(id).populate('PackingDispatchers').select('-password');

//         res
//         .status(200)
//         .json({
//             success: true,
//             message: "Packing Found",
//             data: Packing,
//         });
//     } catch (err){
//         res.status(404).json({success: false,message:"No Packing found"});
//     }
// };

// export const getAllPacking = async (req,res) => {

     
//     try{

//         const {query} = req.query
//         let Packings;

//         if(query){
//             Packings = await Admin.find({isApproved: 'approved', $or: [
//                 {name: { $regex:query, $options: "i"}},
//                 {specialization: {$regex:query, $options: "i"}},
//             ]}).select("-password");
//         }else{
//             admins = await Admin.find({isApproved:"approved"}).select("-password");
//         }

//         res
//         .status(200)
//         .json({
//             success: true,
//             message: "Admin Found",
//             data: admins,
//         });
//     } catch (err){
//         res.status(404).json({success: false,message:"Not found"});
//     }
// };

