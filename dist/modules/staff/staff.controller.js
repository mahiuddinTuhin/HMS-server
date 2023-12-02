"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const ResponseToServer_1 = require("../../util/ResponseToServer");
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const customError_1 = __importDefault(require("../../util/customError"));
const staff_services_1 = require("./staff.services");
/* creating appointment  controller by doctor */
const createDiagnosis = (0, catchAsync_1.default)(async (req, res) => {
    const diagnosisData = req.body;
    const newDiagnosis = await staff_services_1.staffServices.createDiagnosis(diagnosisData);
    if (newDiagnosis) {
        (0, ResponseToServer_1.ResponseToServer)(req, res, true, http_status_codes_1.StatusCodes.OK, newDiagnosis);
    }
    else {
        throw new customError_1.default("Creating diagnosis failed from staff controller!", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
});
exports.staffControllers = { createDiagnosis };
