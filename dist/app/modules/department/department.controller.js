"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseToServer_1 = require("../../utils/ResponseToServer");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const department_service_1 = __importDefault(require("./department.service"));
const findAllDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const allDepartment = await department_service_1.default.findAllDepartment();
    (0, ResponseToServer_1.responseToRequest)(res, {
        success: true,
        status: 200,
        message: "Successfully retrieved all department.",
        data: allDepartment,
    });
});
const findDepartmentById = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params?.depId;
    const department = await department_service_1.default.findDepartmentById(id);
    (0, ResponseToServer_1.responseToRequest)(res, {
        success: true,
        status: 200,
        message: "Successfully retrieved department.",
        data: department,
    });
});
const findAllSpecializations = (0, catchAsync_1.default)(async (req, res) => {
    const allSpecializations = await department_service_1.default.findAllSpecializatios();
    (0, ResponseToServer_1.responseToRequest)(res, {
        success: true,
        status: 200,
        message: "Successfully retrieved all specializations.",
        data: allSpecializations,
    });
});
const findSpecializationById = (0, catchAsync_1.default)(async (req, res) => {
    const id = req?.params?.specializationId;
    const SpecializationById = await department_service_1.default.findSpecializatioById(id);
    (0, ResponseToServer_1.responseToRequest)(res, {
        success: true,
        status: 200,
        message: "Successfully retrieved specialization by id.",
        data: SpecializationById,
    });
});
const findAllProblems = (0, catchAsync_1.default)(async (req, res) => {
    const AllProblems = await department_service_1.default.findAllProblems();
    (0, ResponseToServer_1.responseToRequest)(res, {
        success: true,
        status: 200,
        message: "Successfully retrieved all problems.",
        data: AllProblems,
    });
});
const findAllSymptoms = (0, catchAsync_1.default)(async (req, res) => {
    const AllSymptoms = await department_service_1.default.findAllSymptoms();
    (0, ResponseToServer_1.responseToRequest)(res, {
        success: true,
        status: 200,
        message: "Successfully retrieved all problems.",
        data: AllSymptoms,
    });
});
const departmentController = {
    findAllDepartment,
    findAllSpecializations,
    findDepartmentById,
    findSpecializationById,
    findAllProblems,
    findAllSymptoms,
};
exports.default = departmentController;
