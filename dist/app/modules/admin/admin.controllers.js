"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const http_status_codes_1 = require("http-status-codes");
const http_status_1 = __importDefault(require("http-status"));
const ResponseToServer_1 = require("../../utils/ResponseToServer");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const admin_services_1 = require("./admin.services");
/* creating department controller */
const createDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const departmentData = req.body;
    const newDepartment = await admin_services_1.adminServices.createDepartment(departmentData);
    return (0, ResponseToServer_1.responseToRequest)(res, {
        status: http_status_1.default?.OK,
        success: true,
        message: "Department Created Successfully!",
        data: newDepartment,
    });
});
/* creating Labratory controller */
const createLabratory = (0, catchAsync_1.default)(async (req, res) => {
    const labratoryData = req.body;
    const newLab = await admin_services_1.adminServices.createLabratory(labratoryData);
    return (0, ResponseToServer_1.responseToRequest)(res, {
        status: http_status_1.default?.OK,
        success: true,
        message: "Labratory Data Created Successfully!",
        data: newLab,
    });
});
/**
 *  @find all admin router
 */
const findAllAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const allAdmin = await admin_services_1.adminServices.findAllAdmin(req.query);
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, http_status_codes_1.StatusCodes.OK, allAdmin);
});
exports.adminController = {
    createDepartment,
    createLabratory,
    findAllAdmin,
};
