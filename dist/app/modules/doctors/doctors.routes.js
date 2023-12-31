"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRoutes = void 0;
const express_1 = require("express");
const interfaces_1 = require("../../interfaces/interfaces");
const auth_1 = __importDefault(require("../../middleware/auth"));
const doctors_controllers_1 = require("./doctors.controllers");
const router = (0, express_1.Router)();
/* creating medical history routes */
router.post("/create-medicalhistory", doctors_controllers_1.doctorsController.createMedicalHistory);
/* find doctor's data by symptoms  */
router.get("/symptoms", doctors_controllers_1.doctorsController.findDoctorBySymptoms);
router.get("/:id/appointedtime", doctors_controllers_1.doctorsController.appointedTimeOfDoc);
router.get("/:userId", (0, auth_1.default)(interfaces_1.userRole.doctor), doctors_controllers_1.doctorsController.findDocByIdController);
router.get("/", doctors_controllers_1.doctorsController.getAllDocController);
router.put("/", doctors_controllers_1.doctorsController.updateDocByIdController);
exports.doctorRoutes = router;
