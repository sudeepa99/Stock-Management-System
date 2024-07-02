import express from "express";
import {report} from "../Controllers/report.js";


const router = express.Router();

router.get("/report",report);

export default router;

