import mongoose from "mongoose";

const dispatchteaSchema = new mongoose.Schema({
  invoicenumber:{
    type: Number,
  },
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

const dispatchDetailsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
 
  details: {
    type: String,
  },
  BOP1A: dispatchteaSchema,
  FBOP: dispatchteaSchema,
  FBOPF1: dispatchteaSchema,
  OPA: dispatchteaSchema,
  OP: dispatchteaSchema,
  PEKOE: dispatchteaSchema,
  PEKOE1: dispatchteaSchema,
  BOP: dispatchteaSchema,
  BOPSp: dispatchteaSchema,
  BOP1: dispatchteaSchema,
  BOPA: dispatchteaSchema,
  BOPF: dispatchteaSchema,
  FBOP1: dispatchteaSchema,
  FBOPF: dispatchteaSchema,
  OP1: dispatchteaSchema,
  BP: dispatchteaSchema,
  FBOPFSp: dispatchteaSchema,
  FFEXSP: dispatchteaSchema,
  teacategory: {
    type: String,
  },
});

export default mongoose.model("dispatchDetailsSchema", dispatchDetailsSchema);
