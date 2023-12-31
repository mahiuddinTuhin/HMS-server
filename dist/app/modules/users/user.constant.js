"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleBasedModel = void 0;
const admin_mode_1 = require("../admin/admin.mode");
const doctors_model_1 = require("../doctors/doctors.model");
const nurse_model_1 = __importDefault(require("../nurse/nurse.model"));
const patient_model_1 = require("../patients/patient.model");
const staff_model_1 = __importDefault(require("../staff/staff.model"));
exports.roleBasedModel = {
    admin: admin_mode_1.Admin,
    staff: staff_model_1.default,
    patient: patient_model_1.Patient,
    doctor: doctors_model_1.Doctor,
    nurse: nurse_model_1.default,
};
