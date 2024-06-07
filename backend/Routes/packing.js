import express from "express";
import {saleDetails, packingdetails,getAllPackingDetails,categoryDetails} from "../Controllers/packingController.js";


const router = express.Router();

router.post("/saledetails",saleDetails);
router.post("/packingdetails",packingdetails);
router.get("/getAllPacking",getAllPackingDetails);
router.post("/categorydetails",categoryDetails);

export default router;

