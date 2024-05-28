import express from "express";
import {register,login ,packingdetails} from "../Controllers/authController.js";


const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/packingdetails",packingdetails)
export default router;

