import { Router } from "express";
import { adminController } from "./admin.controllers";

const router = Router();

router.post("/create-department", adminController.createDepartment);

export const adminRoutes = router;
