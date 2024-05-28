import mongoose from "mongoose";

const PackingSchema = new mongoose.Schema({
  
  startDate:{type:Date },
  endDate:{type:Date },
  saleNo:{
    type: Number,
    min : 0,
    max : 999
    },
  details: {
    type: String,
  },

});

export default mongoose.model("Packing", PackingSchema);