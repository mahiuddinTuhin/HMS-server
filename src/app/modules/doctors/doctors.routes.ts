import { Router } from "express";
import { userRole } from "../../interfaces/interfaces";
import validateRequest from "../../middleware/ZodValidator";
import auth from "../../middleware/auth";
import { medicalValidation } from "../MedicalHistory/medicalHistory.Validation";
import { doctorsController } from "./doctors.controllers";

const router = Router();

/* creating medical history routes */
router.post(
  "/create-medicalhistory",
  auth(userRole.doctor),
  validateRequest(medicalValidation),
  doctorsController.createMedicalHistory,
);

/* find doctor's data by symptoms  */
router.get("/symptoms", doctorsController.findDoctorBySymptoms);

router.get("/:id/appointedtime", doctorsController.appointedTimeOfDoc);
router.get(
  "/:userId",
  auth(userRole.doctor),
  doctorsController.findDocByIdController,
);

router.get("/", doctorsController.getAllDocController);
router.put("/", doctorsController.updateDocByIdController);

export const doctorRoutes = router;
