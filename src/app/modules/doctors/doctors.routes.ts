import { Router } from "express";
import { doctorsController } from "./doctors.controllers";

const router = Router();

/* creating medical history routes */
router.post("/create-medicalhistory", doctorsController.createMedicalHistory);

router.get("/", doctorsController.getAllDocController);
router.get("/:userId", doctorsController.findDocByIdController);
router.put("/", doctorsController.updateDocByIdController);
router.get("/:id/appointedtime", doctorsController.appointedTimeOfDoc);

export const doctorRoutes = router;
