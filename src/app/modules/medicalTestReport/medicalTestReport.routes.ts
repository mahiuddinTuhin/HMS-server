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

/* find  test report by id */
router.get(
  "/allreports/:userId",
  auth(userRole.admin, userRole.patient, userRole.doctor),
  medicalTestReportController.findAllTestReportByUserId,
);

const medicalTestReportRouter = router;

export default medicalTestReportRouter;
