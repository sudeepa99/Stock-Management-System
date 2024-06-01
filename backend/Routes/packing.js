import express from "express";
import {packingdetails} from "../Controllers/packingController.js";


const router = express.Router();

router.post("/packingdetails",packingdetails)
export default router;

