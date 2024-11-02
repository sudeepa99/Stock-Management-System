import express from "express";
import {
    saleDetails,
    packingDetails,
    getAllPackingDetails,
    updatePackingDetails,
    getDateDetails,
    getMadeTea,
    getSaleDetails,
    getPackingDetails
} from "../Controllers/packingController.js";

const router = express.Router();

// Routes for handling packing and sale operations

/**
 * Route to add sale details
 * @route POST /api/packing/sale
 */
router.post("/sale", saleDetails);

/**
 * Route to add packing details
 * @route POST /api/packing/details
 */
router.post("/details", packingDetails);

/**
 * Route to retrieve all packing details
 * @route GET /api/packing/all
 */
router.get("/all", getAllPackingDetails);

/**
 * Route to update packing details
 * @route PUT /api/packing/update
 */
router.put("/update", updatePackingDetails);

/**
 * Route to get details by date
 * @route GET /api/packing/date
 */
router.get("/date", getDateDetails);

/**
 * Route to get made tea details
 * @route GET /api/packing/made-tea
 */
router.get("/made-tea", getMadeTea);

/**
 * Route to get sale details
 * @route GET /api/packing/sale
 */
router.get("/sale", getSaleDetails);

/**
 * Route to get specific packing detail
 * @route GET /api/packing/detail
 */
router.get("/detail", getPackingDetails);

export default router;
