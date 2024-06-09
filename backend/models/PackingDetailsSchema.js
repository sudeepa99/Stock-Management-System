import mongoose from "mongoose";

const packingDetailsShema = new mongoose.Schema(
  {

    date: {
      type: Date,
      required: true,
    },
    greenleaves: {
      type: Number,
      min: 0,
      max: 999,
    },
    madetea: {
      type: Number,
      min: 0,
      max: 999,
    },
    details: {
      type: String,
    },
    teacategory:{
      type: String,
    },
    sizeofbag: {
      type: Number,
      min: 0,
      max: 999,
    },
    numofbags: {
      type: String,
    },
},
);

export default mongoose.model("packingDetails", packingDetailsShema);