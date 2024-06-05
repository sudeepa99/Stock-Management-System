import express from "express";
import {saleDetails, packingdetails} from "../Controllers/packingController.js";


const router = express.Router();

router.post("/saledetails",saleDetails);
router.post("/packingdetails",packingdetails);

export default router;

