"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRoutes = void 0;
const express_1 = require("express");
const doctors_controllers_1 = require("./doctors.controllers");
const router = (0, express_1.Router)();
/* creating appointment routes */
router.post("/create-appointment", doctors_controllers_1.doctorsController.createAppointment);
router.get("/", doctors_controllers_1.doctorsController.findDocByIdController);
router.get("/:userId", doctors_controllers_1.doctorsController.findDocByIdController);
router.put("/", doctors_controllers_1.doctorsController.updateDocByIdController);
exports.doctorRoutes = router;
