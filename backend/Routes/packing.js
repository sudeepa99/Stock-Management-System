import express from "express";
import {
    saleDetails,
    packingDetails,
    getAllPackingDetails,
    updatePackingDetails,
    getDateDetails,
    getMadeTea,
    getSaleDetails,
    getPackingDetails,
    updateEndDate,
    getWeeklyPackingDetails,
} from "../Controllers/packingController.js";

const router = express.Router();
router.post("/sale", saleDetails);
router.post("/details", packingDetails);
router.get("/all", getAllPackingDetails);
router.put("/update", updatePackingDetails);
router.get("/date", getDateDetails);
router.get("/made-tea", getMadeTea);
router.get("/sale", getSaleDetails);
router.get("/detail", getPackingDetails);
router.put("/end-date", updateEndDate);
router.get("/weekly", getWeeklyPackingDetails);
export default router;
