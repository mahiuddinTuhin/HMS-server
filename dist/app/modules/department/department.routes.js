"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const department_controller_1 = __importDefault(require("./department.controller"));
const router = (0, express_1.Router)();
/* find  all problems */
router.get("/problems", department_controller_1.default.findAllProblems);
/* find  all symptoms */
router.get("/symptoms", department_controller_1.default.findAllSymptoms);
/* find all specialization  */
router.get("/specializations", department_controller_1.default.findAllSpecializations);
/* find specialization by id  */
router.get("/specializations/:specializationId", department_controller_1.default.findSpecializationById);
/* find a department by id */
router.get("/:depId", department_controller_1.default.findDepartmentById);
/* find  all department */
router.get("/", department_controller_1.default.findAllDepartment);
const departmentRouter = router;
exports.default = departmentRouter;
