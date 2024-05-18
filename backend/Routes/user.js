import express from "express";
import { updateUser, deleteUser, getAllUser, getSingleUser, getUserProfile } from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get('/:id', authenticate, restrict(["viewer"]), getSingleUser);
router.get('/', authenticate, restrict(["admin"]), getAllUser);
router.put('/:id', authenticate, restrict(["viewer"]), updateUser);
router.delete('/:id', authenticate, restrict(["viewer"]), deleteUser);
router.get("/profile/me", authenticate, restrict(["viewer"]), getUserProfile);

export default router;