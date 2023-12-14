import { Router } from "express";
import departmentController from "./department.controller";

const router = Router();

router.get("/", departmentController.findAllDepartment);

const departmentRouter = router;

export default departmentRouter;
