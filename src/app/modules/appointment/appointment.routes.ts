import { Router } from "express";
import appointmentController from "./appointment.controller";

const router = Router();

router.delete("/delete/:userId", appointmentController.deleteAppointment);

const appointmentRouter = router;

export default appointmentRouter;
