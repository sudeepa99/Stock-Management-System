import mongoose from "mongoose";

const teaSchema = new mongoose.Schema({
  teaMark: {
    type: String,
    required: true,

  },
  invoiceNo: {
    type: String,
    required: true,
  },
  teacategory: {
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
});

const packingDetailsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  greenleaves: {
    type: Number,
    min: 0,

  },
  madetea: {
    type: Number,
    min: 0,

  },
  saleNumber: {
    type: Number,
    min: 0,
    required: true,
  },
  details: {
    type: String,
  },

  BOP1A: [teaSchema],
  FBOP: [teaSchema],
  FBOPF1: [teaSchema],
  OPA: [teaSchema],
  OP: [teaSchema],
  PEKOE: [teaSchema],
  PEKOE1: [teaSchema],
  BOP: [teaSchema],
  BOPSp: [teaSchema],
  BOP1: [teaSchema],
  BOPA: [teaSchema],
  BOPF: [teaSchema],
  FBOP1: [teaSchema],
  FBOPF: [teaSchema],
  OP1: [teaSchema],
  BP: [teaSchema],
  FBOPFSp: [teaSchema],
  FFEXSP: [teaSchema],
  FFEXSP1: [teaSchema],

});

export default mongoose.model("packingDetails", packingDetailsSchema);
