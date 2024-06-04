const express =require('express');
const mongoose= require('mongoose')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb+srv://shashikaladilini11:shashikalanisal@cluster0.s5cehoy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')





app.listen(3001,()=>{
    console.log("Server is Running");
})
