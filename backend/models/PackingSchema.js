import mongoose from "mongoose";

const PackingSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  saleNo: {
    type: Number,
    min: 0,
    max: 999,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  saleDays: { type: [Date], required: true }, // Ensure this line is added
});

export default mongoose.model("Packing", PackingSchema);
