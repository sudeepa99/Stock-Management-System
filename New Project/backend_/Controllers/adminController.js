import Admin from "../models/AdminSchema.js";
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