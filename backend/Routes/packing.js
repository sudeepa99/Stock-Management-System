import express from "express";
import {saleDetails, packingdetails,getAllPackingDetails,updatepackingdetails,packing_details} from "../Controllers/packingController.js";


const router = express.Router();

router.post("/saledetails",saleDetails);
router.post("/packingdetails",packingdetails);
router.get("/getAllPacking",getAllPackingDetails);
router.put("/update",updatepackingdetails);
router.post("/packing_details",packing_details);

export default router;

