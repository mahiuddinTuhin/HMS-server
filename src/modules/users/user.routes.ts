import { Router } from "express";
import validateRequest from "../../middleware/ZodValidator";

import { ZDoctors } from "../doctors/doctors.validation";
import { userControllers } from "./user.controllers";
import { userZValidation } from "./users.zodValidation";

const router = Router();

router.post(
  "/create-patient",
  validateRequest(userZValidation),
  userControllers.createPatient,
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
