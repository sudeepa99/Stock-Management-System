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
  
  
  const ViewerModel=mongoose.model("Viewer", ViewerSchema);
  const AdminModel=mongoose.model("Admin", AdminsSchema);

  app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    ViewerModel.findOne({email:email}).then(viewer=>{
        if (viewer) {
            if (viewer.password===password) {
                res.json("Viewer Login Successfully")
            } else {
                res.json("The password is incorrect")
            }
        } else {
            res.json("No record existed")
        }
    })
})
app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    AdminModel.findOne({email:email}).then(admin=>{
        if (admin) {
            if (admin.password===password) {
                res.json("Admin Login Successfully")
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
