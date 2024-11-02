import express from "express";
import { dispatchDetails } from "../Controllers/dispatchController.js";

const router = express.Router();

/**
 * Route to add new dispatch details
 * @route POST /api/dispatch/details
 * @desc Adds dispatch information to the database
 */
router.post("/details", dispatchDetails);

export default router;
