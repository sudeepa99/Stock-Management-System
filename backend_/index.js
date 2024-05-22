const express =require('express');
const mongoose= require('mongoose')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb+srv://shashikaladilini11:shashikalanisal@cluster0.s5cehoy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
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
  
  const ViewerModel=mongoose.model("Viewer", ViewerSchema);
app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    ViewerModel.findOne({email:email}).then(viewer=>{
        if (viewer) {
            if (viewer.password===password) {
                res.json("Login Successfully")
            } else {
                res.json("The password is incorrect")
            }
        } else {
            res.json("No record existed")
        }
    })
})
app.listen(3001,()=>{
    console.log("Server is Running");
})
