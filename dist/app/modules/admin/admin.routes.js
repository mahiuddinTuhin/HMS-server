"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const ZodValidator_1 = __importDefault(require("../../middleware/ZodValidator"));
const validateMultipleDocuemnt_1 = __importDefault(require("../../middleware/validateMultipleDocuemnt"));
const Test_validation_1 = __importDefault(require("../Test/Test.validation"));
const departmentValidation_1 = __importDefault(require("../department/departmentValidation"));
const specialization_validation_1 = __importDefault(require("../specializations/specialization.validation"));
const admin_controllers_1 = require("./admin.controllers");
const router = (0, express_1.Router)();
/* creating department routes */
router.post("/create-department", (0, ZodValidator_1.default)(departmentValidation_1.default), admin_controllers_1.adminController.createDepartment);
/* creating  bulk specialization routes */
router.post("/create-bulk-specialization", (0, validateMultipleDocuemnt_1.default)(specialization_validation_1.default), admin_controllers_1.adminController.createSpecialization);
/* creating specialization routes */
router.post("/create-specialization", (0, ZodValidator_1.default)(specialization_validation_1.default), admin_controllers_1.adminController.createSpecialization);
// /* creating department routes */
// router.post("/create-bulk-department", adminController.createBulkDepartment);
/* creating test routes */
router.post("/create-test", (0, ZodValidator_1.default)(Test_validation_1.default), admin_controllers_1.adminController.createTest);
/**
 * @routes get all admin
 */
router.get("/", admin_controllers_1.adminController.findAllAdmin);
exports.adminRoutes = router;
