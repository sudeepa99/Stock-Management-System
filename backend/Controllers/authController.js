import User from '../models/UserSchema.js'
import Admin from '../models/AdminSchema.js'
import Packing from '../models/PackingSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const generateToken = user=>{
    return jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_key,{
        expiresIn: '15d'
    })
}

export const register = async(req,res)=>{

    const {email,password,name,role} = req.body

    try{

        let user=null

        if(role== 'viewer'){
            user=await User.findOne({email})
        }
        else if(role=='admin'){
            user = await Admin.findOne({email})
        }

        //check if user exist
        if(user){
            return res.status(400).json({message:'User already exist'})
        }


        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        if(role=='viewer'){
            user = new User({
                name,
                email,
                password:hashPassword,
                role
            })
        }

        if(role=='admin'){
            user = new Admin({
                name,
                email,
                password:hashPassword,
                role
            })
        }

        await user.save();

        res.status(200).json({success:true,message: 'User successfully created'});



    }catch(err){
        res.status(500).json({success:false,message: 'Internal server error, Try again'});
    }
};

export const login = async(req,res) => {
    const {email,password} = req.body

    try{
        let user = null
        const viewer = await User.findOne({email})
        const admin = await Admin.findOne({email})

        if(viewer){
            user=viewer
        }
        if(admin){
            user=admin
        }

        //checks if user exist or not
        if(!user){
            return res.status(404).json({ message: "User not found"});
        }

        //compare password
        const isPasswordMatch = await bcrypt.compare(req.body.password,user.password)

        if(!isPasswordMatch){
            return res.status(400).json({ status:false,message: "Invalid credentials"})
        }

        //get toke
        const token = generateToken(user);

        const { password,role,appointments, ...rest} = user._doc;

        res
        .status(200)
        .json({
            status:true,
            message: "Successfully login",
            token,
            data: { ...rest},
            role,
        });

    }catch(err){
        res.status(500).json({ status: false, message: "Failed to login"});
    }
};



// export const packing = async (req, res) => {
//     const { saleNo, s_date, e_date } = req.body;

//     // Debugging logs to ensure the request body is received correctly
//     console.log('Request Body:', req.body);

//     // Check if all required fields are provided
//     if (!s_date || !e_date || !saleNo) {
//         return res.status(400).json({ success: false, message: 'Missing required fields' });
//     }

//     // Convert dates to ISO format (assuming input is in MM/DD/YYYY)
//     const startDate = new Date(s_date);
//     const endDate = new Date(e_date);

//     if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
//         return res.status(400).json({ success: false, message: 'Invalid date format' });
//     }

//     try {
//         const packing = new Packing({
//             startDate,
//             endDate,
//             saleNo
//         });

//         console.log('Packing Object:', packing); // Debugging log to verify object creation

//         await packing.save();

//         res.status(200).json({ success: true, message: 'Packing successfully created' });
//     } catch (err) {
//         console.error('Error:', err); // Log the error for debugging purposes
//         res.status(500).json({ success: false, message: 'Internal server error, try again' });
//     }
// };

export const packingdetails = async (req, res) => {
    const { saleNo, startDate, endDate, details } = req.body;

    try {
        let packing_ = null;

        // Debug: Log request body
        console.log('Request Body:', req.body);

        if (details === 'packing') {
            packing_ = await Packing.findOne({ saleNo });
        }

        // Check if packing already exists
        if (packing_) {
            return res.status(400).json({ message: 'Packing already exists' });
        }

        // Create a new packing record if details is 'packing'
        if (details === 'packing') {
            packing_ = new Packing({
                saleNo,
                startDate,  // Correct field name
                endDate,    // Correct field name
                details
            });
        }

        // Check if packing_ was created successfully before saving
        if (packing_) {
            await packing_.save();
            return res.status(200).json({ success: true, message: 'Packing successfully created' });
        } else {
            // Debug: Log invalid details or creation failure
            console.log('Invalid details or unable to create packing:', { saleNo, startDate, endDate, details });
            return res.status(400).json({ success: false, message: 'Invalid details or unable to create packing' });
        }

    } catch (err) {
        // Log the error to the console
        console.error('Error:', err);

        // Send the error response to the client
        res.status(500).json({ success: false, err: err.message });
    }
};

