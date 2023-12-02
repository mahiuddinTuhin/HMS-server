import { Router } from "express";
import validateRequest from "../../middleware/ZodValidator";

import { AdminValidation } from "../admin/admin.validation";
import { ZDoctors } from "../doctors/doctors.validation";
import { userControllers } from "./user.controllers";

const router = Router();

router.post("/create-patient", userControllers.createPatient);

/* creating admin */
router.post(
  "/create-admin",
  validateRequest(AdminValidation),
  userControllers.createAdmin,
);

router.post(
  "/create-doctor",
  validateRequest(ZDoctors),
  userControllers.createDoctor,
);

router.get("/", userControllers.getAllUser);
router.get("/:userId", userControllers.getUserById);
router.delete("/:userId", userControllers.deleteUserById);
router.put("/", userControllers.updateUserById);

export const userRoutes = router;
