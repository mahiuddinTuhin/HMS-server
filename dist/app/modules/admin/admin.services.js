"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminServices = void 0;
const FindQueryBuilder_1 = __importDefault(require("../../builder/FindQueryBuilder"));
const customError_1 = __importDefault(require("../../errors/customError"));
const otherIdgenerator_1 = __importDefault(require("../../utils/otherIdgenerator"));
const department_mode_1 = __importDefault(require("../department/department.mode"));
const medicalTest_model_1 = require("../medicalTest/medicalTest.model");
const admin_constant_1 = require("./admin.constant");
const admin_mode_1 = require("./admin.mode");
/* creating department */
const createDepartment = async (data) => {
    try {
        data.id = (await (0, otherIdgenerator_1.default)(department_mode_1.default)) || `Dep001`;
        const newDepartment = await department_mode_1.default.create(data);
        return newDepartment;
    }
    catch (error) {
        throw new customError_1.default("Failed to create department by admin!", 400);
    }
};
/* creating labratory */
const createLabratory = async (data) => {
    try {
        data.id = (await (0, otherIdgenerator_1.default)(medicalTest_model_1.MedicalTest)) || `Lab001.01`;
        console.log({ labratoryData: data });
        const newLabratory = await medicalTest_model_1.MedicalTest.create(data);
        return newLabratory;
    }
    catch (error) {
        throw new customError_1.default("Failed to create new Lab data!", 400);
    }
};
/**
 * @find_all_admin service
 */
const findAllAdmin = async (query) => {
    /* query for all admin */
    const adminQuery = new FindQueryBuilder_1.default(admin_mode_1.Admin.find(), query)
        .populate("user")
        .search(admin_constant_1.nonPatientSearchableField)
        .filter()
        .sort()
        .pagination()
        .limit()
        .fields();
    const result = await adminQuery?.modelQuery;
    return result;
};
exports.adminServices = {
    createDepartment,
    createLabratory,
    findAllAdmin,
};
