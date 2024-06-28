import mongoose from "mongoose";

const teaSchema = new mongoose.Schema({
  teacategory: {
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
