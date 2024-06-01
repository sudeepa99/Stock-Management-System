import express from "express";
import {createPackingDispatcher} from '../Controllers/packingDispatcher.js'

const router = express.Router();

router.post("/packingDist",createPackingDispatcher);
export default router;

