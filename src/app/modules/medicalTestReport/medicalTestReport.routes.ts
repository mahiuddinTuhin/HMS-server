import { Router } from "express";
import departmentController from "./medicalTestReport.controller";

const router = Router();

/* find  all problems */
router.get("/problems", departmentController.findAllProblems);

/* find  all symptoms */
router.get("/symptoms", departmentController.findAllSymptoms);

/* find all specialization  */
router.get("/specializations", departmentController.findAllSpecializations);

/* find specialization by id  */
router.get(
  "/specializations/:specializationId",
  departmentController.findSpecializationById,
);

/* find a department by id */
router.get("/:depId", departmentController.findDepartmentById);

/* find  all department */
router.get("/", departmentController.findAllDepartment);

const medicalTestReportRouter = router;

export default medicalTestReportRouter;
