import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

/**
 * Route to register a new user
 * @route POST /api/auth/register
 * @desc Registers a new user
 */
router.post("/register", register);

/**
 * Route to log in an existing user
 * @route POST /api/auth/login
 * @desc Authenticates a user and provides a token
 */
router.post("/login", login);

export default router;
