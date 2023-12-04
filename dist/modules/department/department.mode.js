"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Define a Mongoose schema for TDepartment
const DepartmentSchema = new mongoose_1.Schema({
    departmentId: {
        type: String,
        required: [true, "Department id is required!"],
        unique: true,
    },
    departmentName: {
        type: String,
        required: [true, "Department name is required!"],
        unique: true,
    },
    allDoctors: [{ type: String, ref: "Doctors", unique: true }],
    licences: { type: String, required: true, unique: true },
    allMedicalHistory: [{ type: String, ref: "MedicalHistory", unique: true }],
});
// Create and export the Mongoose model based on the schema
const Department = mongoose_1.default.model("Department", DepartmentSchema);
exports.default = Department;
