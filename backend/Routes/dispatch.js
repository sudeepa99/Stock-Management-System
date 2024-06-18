import express from "express";
import {dispatchdetails} from "../Controllers/dispatchController.js";


const router = express.Router();

router.post("/dispatchdetails",dispatchdetails);
//router.put("/update",updatepackingdetails);

export default router;

