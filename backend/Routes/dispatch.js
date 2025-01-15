import express from "express";
import { dispatchDetails, findByInvoiceNo, getWeeklyDispatchDetails, getWeeklyDispatchDetailsDefault } from "../Controllers/dispatchController.js";
import { authenticate, restrict } from "../utils/verifyToken.js"; // Import your middlewares

const router = express.Router();

// Protect the routes with authenticate and authorize middleware
router.post("/details", authenticate, restrict(['admin']), dispatchDetails);
router.get("/invoice/:invoicenumber", authenticate, restrict(['admin']), findByInvoiceNo);
router.get("/weekly", getWeeklyDispatchDetails);
router.get("/weekly/default", getWeeklyDispatchDetailsDefault);
export default router;
