import express from "express";
import { updateAdmin} from "../Controllers/adminController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

// // Nested route for reviews

// // Get single doctor by ID
// router.get('/:id', getSingleDoctor);

// // // Get doctor profile
// // router.get('/profile/me', authenticate, restrict(['doctor']), getDoctorProfile);

// // // Get all doctors

// router.get('/', getAllDoctor);

// // Update doctor by ID
 router.put('/:id', authenticate, restrict(["admin"]), updateAdmin);

// // Delete doctor by ID
//  router.delete('/:id', authenticate, restrict(["doctor"]), deleteDoctor);

export default router;

