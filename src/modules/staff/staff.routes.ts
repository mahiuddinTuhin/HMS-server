import { Router } from "express";
import { staffControllers } from "./staff.controller";

const router = Router();

/* creating diagnosis report */
router.post("/create-diagnosis", staffControllers.createDiagnosis);
export const staffRouter = router;
