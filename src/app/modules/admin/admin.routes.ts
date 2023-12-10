import { Router } from "express";
import validateRequest from "../../middleware/ZodValidator";
import TestValidation from "../Test/Test.validation";
import DepartmentValidation from "../department/departmentValidation";
import { adminController } from "./admin.controllers";

const router = Router();

/* creating department routes */
router.post(
  "/create-department",
  validateRequest(DepartmentValidation),
  adminController.createDepartment,
);

/* creating test routes */
router.post(
  "/create-test",
  validateRequest(TestValidation),
  adminController.createTest,
);

/**
 * @routes get all admin
 */

router.get("/", adminController.findAllAdmin);

export const adminRoutes = router;
