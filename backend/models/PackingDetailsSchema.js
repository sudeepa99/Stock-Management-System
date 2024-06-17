import mongoose from "mongoose";

const teaSchema = new mongoose.Schema({
  teacategory: {
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
});

const packingDetailsSchema = new mongoose.Schema({
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
  BOP1A: teaSchema,
  FBOP: teaSchema,
  FBOPF1: teaSchema,
  OPA: teaSchema,
  OP: teaSchema,
  PEKOE: teaSchema,
  PEKOE1: teaSchema,
  BOP: teaSchema,
  BOPSp: teaSchema,
  BOP1: teaSchema,
  BOPA: teaSchema,
  BOPF: teaSchema,
  FBOP1: teaSchema,
  FBOPF: teaSchema,
  OP1: teaSchema,
  BP: teaSchema,
  FBOPFSp: teaSchema,
  FFEXSP: teaSchema,
  teacategory: {
    type: String,
  },
});

export default mongoose.model("packingDetails", packingDetailsSchema);
