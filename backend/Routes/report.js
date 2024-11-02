import express from "express";
import { report } from "../Controllers/report.js";

const router = express.Router();

/**
 * Route to retrieve report data
 * @route GET /api/report
 * @desc Fetches report data based on specified criteria
 */
router.get("/", report);

export default router;
