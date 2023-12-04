"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const http_status_codes_1 = require("http-status-codes");
const ResponseToServer_1 = require("../../util/ResponseToServer");
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const customError_1 = __importDefault(require("../../util/customError"));
const admin_services_1 = require("./admin.services");
/* creating department controller */
const createDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const departmentData = req.body;
    const newDepartment = await admin_services_1.adminServices.createDepartment(departmentData);
    if (newDepartment) {
        (0, ResponseToServer_1.ResponseToServer)(req, res, true, http_status_codes_1.StatusCodes.OK, newDepartment);
    }
    else {
        throw new customError_1.default("Creating department failed from controller!", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
});
/* creating Labratory controller */
const createLabratory = (0, catchAsync_1.default)(async (req, res) => {
    const labratoryData = req.body;
    const newLab = await admin_services_1.adminServices.createLabratory(labratoryData);
    if (newLab) {
        (0, ResponseToServer_1.ResponseToServer)(req, res, true, http_status_codes_1.StatusCodes.OK, newLab);
    }
    else {
        throw new customError_1.default("Creating department failed from controller!", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
});
exports.adminController = { createDepartment, createLabratory };
