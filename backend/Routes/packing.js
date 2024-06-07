import express from "express";
import {saleDetails, packingdetails,getAllPackingDetails,updatepackingdetails} from "../Controllers/packingController.js";


const router = express.Router();

router.post("/saledetails",saleDetails);
router.post("/packingdetails",packingdetails);
router.get("/getAllPacking",getAllPackingDetails);
router.post("/:id",updatepackingdetails);

export default router;

