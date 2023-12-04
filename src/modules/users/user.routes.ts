import { Router } from "express";
import validateRequest from "../../middleware/ZodValidator";

import { AdminValidation } from "../admin/admin.validation";
import { userControllers } from "./user.controllers";

const router = Router();

/* 1. creating admin */
router.post(
  "/create-admin",
  validateRequest(AdminValidation),
  userControllers.createAdmin,
);

/*  2. create doctor */
router.post("/create-doctor", userControllers.createDoctor);

/* 3. create Nurse */

router.post("/create-nurse", userControllers.createNurse);

/* 4. create patient */

router.post("/create-patient", userControllers.createPatient);

/* 5. create staff */

router.post("/create-staff", userControllers.createStaff);

router.get("/", userControllers.getAllUser);
router.get("/:userId", userControllers.getUserById);
router.delete("/:userId", userControllers.deleteUserById);
router.put("/", userControllers.updateUserById);

export const userRoutes = router;
