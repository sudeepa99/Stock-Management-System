import mongoose from "mongoose";

const PackingSchema = new mongoose.Schema({
  
  startDate:{type:Date , required :true},
  endDate:{type:Date , required :true},
  saleNo:{
    type: Number,
    min : 0,
    max : 999
    }

});

export default mongoose.model("Packing", PackingSchema);