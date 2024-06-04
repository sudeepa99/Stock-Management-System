import mongoose from "mongoose";

const packingDispatcherSchema = new mongoose.Schema(
  {
    packing: {
      type: mongoose.Types.ObjectId,
      ref: "Packing",
    },
    admin: {
      type: mongoose.Types.ObjectId,
      ref: "Admin",
    },
    reviewText: {
      type: String,
      required: true,
    }
},
);

export default mongoose.model("packingDispatcherSchema", packingDispatcherSchema);