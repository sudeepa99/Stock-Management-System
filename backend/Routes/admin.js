import express from "express";
import { updateAdmin} from "../Controllers/adminController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

// // Nested route for PackingDispatchers

// // Get single Packing by ID
// router.get('/:id', getSinglePacking);

// // // Get Packing profile
// // router.get('/profile/me', authenticate, restrict(['Packing']), getPackingProfile);

// // // Get all Packings

// router.get('/', getAllPacking);

// // Update Packing by ID
 router.put('/:id', authenticate, restrict(["admin"]), updateAdmin);

// // Delete Packing by ID
//  router.delete('/:id', authenticate, restrict(["Packing"]), deletePacking);

export default router;

