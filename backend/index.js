import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Route imports
import authRoute from "./Routes/auth.js";
import packingRoute from "./Routes/packing.js";
import dispatchRoute from "./Routes/dispatch.js";
import reportsRoute from "./Routes/report.js";

// Middleware imports
import { errorHandler } from "./middleware/errorHandler.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 8000;

// Configure CORS
const corsOptions = {
    origin: true,
    // origin: process.env.CLIENT_URL || '*', // Customize the origin for security
    // credentials: true, // Allow credentials (cookies, authorization headers)
};

// Define a simple root route for health checks
app.get("/", (req, res) => {
    res.status(200).send("API is working");
});

// Database connection setup
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
        });
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        // Optional retry mechanism
        setTimeout(connectDB, 5000);
    }
};

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/packing", packingRoute);
app.use("/api/v1/dispatch", dispatchRoute);
app.use("/api/v1/report", reportsRoute);

app.use(errorHandler);

// Start the server
app.listen(port, async () => {
    await connectDB();
    console.log(`Server is running on port ${port}`);
});
