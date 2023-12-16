import { Router } from "express";
import validateRequest from "../../middleware/ZodValidator";
import appointmentValidation from "../appointment/appointment.validation";
import { patientController } from "./patient.controller";

const router = Router();

/* 1. creating appointment */
router.post(
  "/create-appointment",
  validateRequest(appointmentValidation),
  patientController.ceateAppointment,
);

/* delete apointment by id */
router.delete(
  "/delete-appointment/:id",
  patientController.deleteAppointmentById,
);

export const patientRoutes = router;
