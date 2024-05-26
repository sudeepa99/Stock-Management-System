import mongoose from "mongoose";
const AdminsSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
  });

  export default mongoose.model("Admin", AdminsSchema);