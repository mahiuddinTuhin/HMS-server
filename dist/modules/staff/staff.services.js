"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = require("http-status-codes");
const customError_1 = __importDefault(require("../../util/customError"));
const diagnosis_model_1 = require("../diagnosis/diagnosis.model");
/* creating an appointment by doctor */
const createDiagnosis = async (data) => {
    try {
        const newDiagnosis = await diagnosis_model_1.Diagnosis.create(data);
        if (!newDiagnosis) {
            throw new customError_1.default("Creating diagnosis failed! from staff services.", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        return newDiagnosis;
    }
    catch (error) {
        throw new customError_1.default(`Creating diagnosis failed from staff services!: ${error}`, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
};
exports.staffServices = {
    createDiagnosis,
};
