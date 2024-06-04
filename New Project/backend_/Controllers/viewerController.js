


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