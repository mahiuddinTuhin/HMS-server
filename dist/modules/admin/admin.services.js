"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const customError_1 = __importDefault(require("../../util/customError"));
const department_mode_1 = __importDefault(require("../department/department.mode"));
const labrotory_model_1 = __importDefault(require("../labratory/labrotory.model"));
/* creating department */
const createDepartment = async (data) => {
    try {
        const newDepartment = await department_mode_1.default.create(data);
        if (!newDepartment) {
            throw new customError_1.default("Creating department failed! from data model.", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        return newDepartment;
    }
    catch (error) {
        throw new customError_1.default(`Creating department failed from services!: ${error}`, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
};
/* creating labratory */
const createLabratory = async (data) => {
    try {
        const newLabratory = await labrotory_model_1.default.create(data);
        if (!newLabratory) {
            throw new customError_1.default("Creating department failed! from data model.", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        return newLabratory;
    }
    catch (error) {
        throw new customError_1.default(`Creating department failed from services!: ${error}`, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
};
exports.adminServices = { createDepartment, createLabratory };
