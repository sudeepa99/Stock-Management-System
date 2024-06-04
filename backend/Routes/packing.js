import express from "express";
import {packingdetails} from "../Controllers/packingController.js";
import {createPackingDispatcher} from '../Controllers/packingDispatcher.js'
 

const router = express.Router();

router.post("/packingdetails",packingdetails);
router.use("/:packingId/packingDist", createPackingDispatcher);

export default router;

