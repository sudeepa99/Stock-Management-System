import express from "express";
import {dispatchdetails} from "../Controllers/dispatchController.js";


const router = express.Router();

router.post("/dispatchdetails",dispatchdetails);
//router.put("/updatedispatch",updatedispatchgdetails);

export default router;

