import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema({
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
  saleDays: [{ type: mongoose.Types.ObjectId, ref: "SaleDispatcher" }],
});

export default mongoose.model("Sale", SaleSchema);
