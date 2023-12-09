"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const ZodValidator_1 = __importDefault(require("../../middleware/ZodValidator"));
const departmentValidation_1 = __importDefault(require("../department/departmentValidation"));
const medicalTest_validation_1 = __importDefault(require("../medicalTest/medicalTest.validation"));
const admin_controllers_1 = require("./admin.controllers");
const router = (0, express_1.Router)();
/* creating department routes */
router.post("/create-department", (0, ZodValidator_1.default)(departmentValidation_1.default), admin_controllers_1.adminController.createDepartment);
/* creating labratory routes */
router.post("/create-labratory", (0, ZodValidator_1.default)(medicalTest_validation_1.default), admin_controllers_1.adminController.createLabratory);
/**
 * @routes get all admin
 */
router.get("/", admin_controllers_1.adminController.findAllAdmin);
exports.adminRoutes = router;
