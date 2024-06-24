import mongoose from "mongoose";

const ViewerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["viewer"],
      default: "viewer",
    },
  });

  export default mongoose.model("Viewer", ViewerSchema);