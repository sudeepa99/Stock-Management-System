import express from "express";
import { saleDetails, packingdetails, getAllPackingDetails, updatepackingdetails, getDateDetails, getMadeTea, getSaleDetails, getPackingDetails } from "../Controllers/packingController.js";


const router = express.Router();

router.post("/saledetails", saleDetails);
router.post("/packingdetails", packingdetails);
router.get("/getAllPacking", getAllPackingDetails);
router.put("/update", updatepackingdetails);
router.get("/getDateDetails", getDateDetails);
router.get("/getMade", getMadeTea);

router.get("/saleDetail", getSaleDetails);
router.get("/packingDetail", getPackingDetails);

export default router;

