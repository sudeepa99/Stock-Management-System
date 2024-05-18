import express from "express";
import cookieparser from "cookie-parser";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import adminRoute from "./Routes/admin.js";
import { errorHandler } from './middleware/errorHandler.js'; // Use ES Module import syntax

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: true,
};

app.get('/', (req, res) => {
    res.send('API is working');
});

// Database connection
mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.Mongo_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB database is connected');
    } catch (err) {
        console.error('MongoDB database connection failed:', err); // Log the error for debugging
    }
};

// Middleware
app.use(express.json());
app.use(cookieparser());
app.use(cors(corsOptions));
app.use('/api/v1/auth', authRoute); // domain/api/v1/auth/register
app.use('/api/v1/users', userRoute);
app.use('/api/v1/admins', adminRoute);
app.use(errorHandler); // Ensure this is an ES Module import


app.listen(port, () => {
    connectDB();
    console.log("Server is running on port " + port);
});
