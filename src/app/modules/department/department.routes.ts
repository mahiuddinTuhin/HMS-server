import { Router } from "express";
import departmentController from "./department.controller";

const router = Router();

/* find  all department */
router.get("/", departmentController.findAllDepartment);

/* find a department by id */
router.get("/:depId", departmentController.findDepartmentById);
/* find all specialization  */
router.get("/specializations", departmentController.findAllSpecializations);

const departmentRouter = router;

export default departmentRouter;
