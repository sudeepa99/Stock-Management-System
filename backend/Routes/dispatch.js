import express from "express";
import { dispatchDetails, findByInvoiceNo } from "../Controllers/dispatchController.js";

const router = express.Router();

router.post("/details", dispatchDetails);
router.get("/invoice/:invoicenumber", findByInvoiceNo);
export default router;
