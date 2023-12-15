import { Router } from "express";
import departmentController from "./department.controller";

const router = Router();

router.get("/", departmentController.findAllDepartment);
router.get("/:depId", departmentController.findDepartmentById);

const departmentRouter = router;

export default departmentRouter;
