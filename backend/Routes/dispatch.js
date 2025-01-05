import express from "express";
import { dispatchDetails, findByInvoiceNo, getWeeklyDispatchDetails } from "../Controllers/dispatchController.js";

const router = express.Router();

router.post("/details", dispatchDetails);
router.get("/invoice/:invoicenumber", findByInvoiceNo);
router.get("/weekly", getWeeklyDispatchDetails);
export default router;
