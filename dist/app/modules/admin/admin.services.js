"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminServices = void 0;
const FindQueryBuilder_1 = __importDefault(require("../../app/builder/FindQueryBuilder"));
const department_mode_1 = __importDefault(require("../department/department.mode"));
const labrotory_model_1 = __importDefault(require("../labratory/labrotory.model"));
const admin_constant_1 = require("./admin.constant");
const admin_mode_1 = require("./admin.mode");
/* creating department */
const createDepartment = async (data) => {
    const newDepartment = await department_mode_1.default.create(data);
    return newDepartment;
};
/* creating labratory */
const createLabratory = async (data) => {
    const newLabratory = await labrotory_model_1.default.create(data);
    return newLabratory;
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
