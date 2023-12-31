"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffRoutes = void 0;
const express_1 = require("express");
const ZodValidator_1 = __importDefault(require("../../middleware/ZodValidator"));
const medicalHistory_Validation_1 = require("../MedicalHistory/medicalHistory.Validation");
const staff_controller_1 = __importDefault(require("./staff.controller"));
const router = (0, express_1.Router)();
/* 1. creating Medical test report */
router.post("/create-medical-test", (0, ZodValidator_1.default)(medicalHistory_Validation_1.medicalValidation), staff_controller_1.default.createMedicalReports);
/* delete apointment by id */
router.delete("/delete-appointment/:id", staff_controller_1.default.createMedicalReports);
exports.staffRoutes = router;
