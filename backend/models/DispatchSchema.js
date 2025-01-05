import mongoose from "mongoose";

const dispatchteaSchema = new mongoose.Schema({
  invoicenumber: {
    type: String,
    required: true,
  },
  sizeofbag: {
    type: Number,
    min: 0,
    required: true,
  },
  numofbags: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  broker: {
    type: String,
    required: true,
  }
});

const categorySchema = new mongoose.Schema({
  data: [dispatchteaSchema],
  totalNet: { type: Number, required: true },
});
const dispatchDetailsSchema = new mongoose.Schema({
  saleNumber: { type: Number, min: 0, required: true },
  details: { type: String, required: true },
  BOP1A: categorySchema,
  FBOP: categorySchema,
  BOP1A: categorySchema,
  FBOP: categorySchema,
  FBOPF1: categorySchema,
  OPA: categorySchema,
  OP: categorySchema,
  PEKOE: categorySchema,
  PEKOE1: categorySchema,
  BOP: categorySchema,
  BOPSp: categorySchema,
  BOP1: categorySchema,
  BOPA: categorySchema,
  BOPF: categorySchema,
  FBOP1: categorySchema,
  FBOPF: categorySchema,
  OP1: categorySchema,
  BP: categorySchema,
  FBOPFSp: categorySchema,
  FFEXSP: categorySchema,
  FFEXSP1: categorySchema,
});

export default mongoose.model("DispatchDetails", dispatchDetailsSchema);
