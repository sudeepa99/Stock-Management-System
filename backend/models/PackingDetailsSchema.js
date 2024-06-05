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
      required: true,
    },
    madetea: {
      type: Number,
      min: 0,
      max: 999,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
},
);

export default mongoose.model("packingDetails", packingDetailsShema);