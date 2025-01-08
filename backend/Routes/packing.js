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
import { authenticate, restrict } from "../utils/verifyToken.js";

const router = express.Router();
router.post("/sale", authenticate, restrict(['admin']), saleDetails);
router.post("/details", authenticate, restrict(['admin']), packingDetails);
router.get("/all", getAllPackingDetails);
router.put("/update", authenticate, restrict(['admin']), updatePackingDetails);
router.get("/date", getDateDetails);
router.get("/made-tea", getMadeTea);
router.get("/sale", getSaleDetails);
router.get("/detail", getPackingDetails);
router.put("/end-date", authenticate, restrict(['admin']), updateEndDate);
router.get("/weekly", getWeeklyPackingDetails);
export default router;
