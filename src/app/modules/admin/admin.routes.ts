import { Router } from "express";
import validateRequest from "../../middleware/ZodValidator";
import DepartmentValidation from "../department/departmentValidation";
import LaboratoryValidation from "../medicalTest/medicalTest.validation";
import { adminController } from "./admin.controllers";

const router = Router();

/* creating department routes */
router.post(
  "/create-department",
  validateRequest(DepartmentValidation),
  adminController.createDepartment,
);

/* creating labratory routes */
router.post(
  "/create-labratory",
  validateRequest(LaboratoryValidation),
  adminController.createLabratory,
);

/**
 * @routes get all admin
 */

router.get("/", adminController.findAllAdmin);

export const adminRoutes = router;
