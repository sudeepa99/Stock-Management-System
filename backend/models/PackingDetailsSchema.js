import mongoose from "mongoose";

const categoryDetailsSchema = new mongoose.Schema(
  {

   
    details: { type: String },
    // Fields from categoryDetails
    teacategory: { type: String },
    sizeofbag: { type: Number },
    numofbags: { type: Number },
   

},
);

const packingDetailsShema = new mongoose.Schema({
   // Fields from packingdetails
  greenleaves: { type: Number },
  madetea: { type: Number },
  details: { type: String, required: true },
  date: { type: Date,  },
  categoryDetails: categoryDetailsSchema
});



export default mongoose.model("packingDetails", packingDetailsShema);