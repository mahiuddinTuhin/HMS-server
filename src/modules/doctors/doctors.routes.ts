import { Router } from "express";
import { doctorsController } from "./doctors.controllers";

const router = Router();

router.get("/", doctorsController.findDocByIdController);
router.get("/:userId", doctorsController.findDocByIdController);
router.put("/", doctorsController.updateDocByIdController);

export const doctorRoutes = router;
