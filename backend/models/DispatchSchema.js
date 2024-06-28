import mongoose from "mongoose";

const dispatchteaSchema = new mongoose.Schema({
  invoicenumber: {
    type: String,
    required: true,
  },
  sizeofbag: {
    type: Number,
    min: 0,
    max: 999,
    required: true,
  },
  numofbags: {
    type: String,
    required: true,
  },
});

const dispatchDetailsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  BOP1A: [dispatchteaSchema],
  FBOP: [dispatchteaSchema],
  FBOPF1: [dispatchteaSchema],
  OPA: [dispatchteaSchema],
  OP: [dispatchteaSchema],
  PEKOE: [dispatchteaSchema],
  PEKOE1: [dispatchteaSchema],
  BOP: [dispatchteaSchema],
  BOPSp: [dispatchteaSchema],
  BOP1: [dispatchteaSchema],
  BOPA: [dispatchteaSchema],
  BOPF: [dispatchteaSchema],
  FBOP1: [dispatchteaSchema],
  FBOPF: [dispatchteaSchema],
  OP1: [dispatchteaSchema],
  BP: [dispatchteaSchema],
  FBOPFSp: [dispatchteaSchema],
  FFEXSP: [dispatchteaSchema],
  FFEXSP1: [dispatchteaSchema],

});

export default mongoose.model("DispatchDetails", dispatchDetailsSchema);
