import { Router } from "express";
import { userRole } from "../../interfaces/interfaces";
import validateRequest from "../../middleware/ZodValidator";
import auth from "../../middleware/auth";
import appointmentValidation from "../appointment/appointment.validation";
import { patientController } from "./patient.controller";

const router = Router();

/* 1. creating appointment */
router.post(
  "/create-appointment",
  auth(userRole.patient),
  validateRequest(appointmentValidation),
  patientController.ceateAppointment,
);

/* delete apointment by id */
router.delete(
  "/delete-appointment/:id",
  patientController.deleteAppointmentById,
);

export const patientRoutes = router;
