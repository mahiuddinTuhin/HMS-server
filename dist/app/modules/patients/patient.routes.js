"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientRoutes = void 0;
const express_1 = require("express");
const ZodValidator_1 = __importDefault(require("../../middleware/ZodValidator"));
const appointment_validation_1 = __importDefault(require("../appointment/appointment.validation"));
const patient_controller_1 = require("./patient.controller");
const router = (0, express_1.Router)();
/* 1. creating appointment */
router.post("/create-appointment", (0, ZodValidator_1.default)(appointment_validation_1.default), patient_controller_1.patientController.ceateAppointment);
/* delete apointment by id */
router.delete("/delete-appointment/:id", patient_controller_1.patientController.deleteAppointmentById);
exports.patientRoutes = router;
