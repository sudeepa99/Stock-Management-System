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
    type: Number,
    required: true,

  },
});

const categorySchema = new mongoose.Schema({
  data: [teaSchema],
  totalNet: { type: Number, required: true },
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

export default mongoose.model("packingDetails", packingDetailsSchema);
