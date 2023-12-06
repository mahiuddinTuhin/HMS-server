"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const http_status_codes_1 = require("http-status-codes");
const ResponseToServer_1 = require("../../app/util/ResponseToServer");
const catchAsync_1 = __importDefault(require("../../app/util/catchAsync"));
const admin_services_1 = require("./admin.services");
/* creating department controller */
const createDepartment = (0, catchAsync_1.default)(async (req, res) => {
    const departmentData = req.body;
    const newDepartment = await admin_services_1.adminServices.createDepartment(departmentData);
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, http_status_codes_1.StatusCodes.OK, newDepartment);
});
/* creating Labratory controller */
const createLabratory = (0, catchAsync_1.default)(async (req, res) => {
    const labratoryData = req.body;
    const newLab = await admin_services_1.adminServices.createLabratory(labratoryData);
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, http_status_codes_1.StatusCodes.OK, newLab);
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
