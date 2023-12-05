import { Router } from "express";
import { adminController } from "./admin.controllers";

const router = Router();

/* creating department routes */
router.post("/create-department", adminController.createDepartment);

/* creating labratory routes */
router.post("/create-labratory", adminController.createLabratory);

/**
 * @routes get all admin
 */

router.get("/", adminController.findAllAdmin);

export const adminRoutes = router;
