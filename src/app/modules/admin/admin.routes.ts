import { Router } from "express";
import { userRole } from "../../interfaces/interfaces";
import validateRequest from "../../middleware/ZodValidator";
import auth from "../../middleware/auth";
import validateMultipleDocuemnt from "../../middleware/validateMultipleDocuemnt";
import TestValidation from "../Test/Test.validation";
import DepartmentValidation from "../department/departmentValidation";
import medicalTestReportValidation from "../medicalTestReport/medicalTestReport.validation";
import specializationsValidation from "../specializations/specialization.validation";
import { adminController } from "./admin.controllers";

const router = Router();

/* creating department routes */
router.post(
  "/create-department",
  auth(userRole.superAdmin, userRole.admin),
  validateRequest(DepartmentValidation),
  adminController.createDepartment,
);

/* creating  bulk specialization routes */
router.post(
  "/create-bulk-specialization",
  validateMultipleDocuemnt(specializationsValidation),
  adminController.createSpecialization,
);

/* creating specialization routes */
router.post(
  "/create-specialization",
  validateRequest(specializationsValidation),
  adminController.createSpecialization,
);

// /* creating department routes */
// router.post("/create-bulk-department", adminController.createBulkDepartment);

/* creating test routes */
router.post(
  "/create-test",
  auth(userRole.admin),
  validateRequest(TestValidation),
  adminController.createTest,
);

/* creating test report routes */
router.post(
  "/create-test-report",
  auth(userRole.admin),
  validateRequest(medicalTestReportValidation),
  adminController.createTestReport,
);

/**
 * @routes get all admin
 */

router.get("/", adminController.findAllAdmin);

export const adminRoutes = router;
