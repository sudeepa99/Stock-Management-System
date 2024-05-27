import express from "express";
import {register,login ,packing} from "../Controllers/authController.js";


const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/packing",packing)
export default router;

