import express from "express";
import {dispatchdetails} from "../Controllers/dispatchController.js";


const router = express.Router();

router.post("/dispatchdetails",dispatchdetails);

export default router;

