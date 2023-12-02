import { Router } from "express";
import { doctorsController } from "./doctors.controllers";

const router = Router();

/* creating appointment routes */
router.post("/create-appointment", doctorsController.createAppointment);

router.get("/", doctorsController.findDocByIdController);
router.get("/:userId", doctorsController.findDocByIdController);
router.put("/", doctorsController.updateDocByIdController);

export const doctorRoutes = router;
