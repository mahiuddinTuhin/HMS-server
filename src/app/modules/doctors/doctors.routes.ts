import { Router } from "express";
import { doctorsController } from "./doctors.controllers";

const router = Router();

/* creating medical history routes */
router.post("/create-medicalhistory", doctorsController.createMedicalHistory);

/* find doctor's data by symptoms  */
router.get("/symptoms", doctorsController.findDoctorBySymptoms);

router.get("/:id/appointedtime", doctorsController.appointedTimeOfDoc);
router.get("/:userId", doctorsController.findDocByIdController);
router.get("/", doctorsController.getAllDocController);
router.put("/", doctorsController.updateDocByIdController);

export const doctorRoutes = router;
