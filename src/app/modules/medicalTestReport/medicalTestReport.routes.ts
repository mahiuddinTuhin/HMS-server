import { Router } from "express";
import { userRole } from "../../interfaces/interfaces";
import auth from "../../middleware/auth";
import medicalTestReportController from "./medicalTestReport.controller";

const router = Router();

/* find  test report by id */
router.get(
  "/:id",
  auth(userRole.admin, userRole.patient, userRole.doctor),
  medicalTestReportController.findTestReportById,
);

const medicalTestReportRouter = router;

export default medicalTestReportRouter;
