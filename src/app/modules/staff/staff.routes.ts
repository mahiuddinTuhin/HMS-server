import { Router } from "express";
import validateRequest from "../../middleware/ZodValidator";
import { medicalValidation } from "../MedicalHistory/medicalHistory.Validation";
import staffControllers from "./staff.controller";

const router = Router();

/* 1. creating Medical test report */
router.post(
  "/create-medical-test",
  validateRequest(medicalValidation),
  staffControllers.createMedicalReports,
);

/* delete apointment by id */
router.delete("/delete-appointment/:id", staffControllers.createMedicalReports);

export const staffRoutes = router;
