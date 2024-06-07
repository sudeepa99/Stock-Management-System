import mongoose from "mongoose";

const packingDetailsShema = new mongoose.Schema(
  {

    date: { type: Date, required: true },
    details: { type: String, required: true },
    // Fields from categoryDetails
    teacategory: { type: String },
    sizeofbag: { type: Number },
    numofbags: { type: Number },
    // Fields from packingdetails
    greenleaves: { type: Number },
    madetea: { type: Number }

},
);

export default mongoose.model("packingDetails", packingDetailsShema);