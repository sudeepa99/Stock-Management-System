import express from "express";
import { report } from "../Controllers/report.js";

const router = express.Router();

router.get("/", report);

export default router;
