"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminServices = void 0;
const FindQueryBuilder_1 = __importDefault(require("../../builder/FindQueryBuilder"));
const customError_1 = __importDefault(require("../../errors/customError"));
const generateServiceId_1 = __importDefault(require("../../utils/generateServiceId"));
const department_model_1 = __importDefault(require("../department/department.model"));
const mongoose_1 = __importStar(require("mongoose"));
const Test_model_1 = __importDefault(require("../Test/Test.model"));
const specializations_model_1 = __importDefault(require("../specializations/specializations.model"));
const admin_constant_1 = require("./admin.constant");
const admin_mode_1 = require("./admin.mode");
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @creating_department
 */
const createDepartment = async (payload) => {
    payload.id = await (0, generateServiceId_1.default)(department_model_1.default);
    const newDepartment = await department_model_1.default.create(payload);
    return newDepartment;
};
/**
 * @creating_medical_test
 */
const createTest = async (data) => {
    try {
        data.id = await (0, generateServiceId_1.default)(Test_model_1.default);
        const newTest = await Test_model_1.default.create(data);
        return newTest;
    }
    catch (error) {
        // console.log({ error });
        // console.log({ error });
        throw new customError_1.default("Failed to create new Test service!", 400);
    }
};
/**
 * @creating_specialization
 */
const createSpecialization = async (payload) => {
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newSpecializations = await Promise.all(payload?.map(async (data) => {
            data.id = await (0, generateServiceId_1.default)(specializations_model_1.default);
            const specialization = await specializations_model_1.default.create([data], {
                session,
            });
            return specialization[0];
        }));
        // updating department for mupltiple specialization
        if (newSpecializations) {
            await Promise.all(newSpecializations?.map(async (spec) => {
                const departmentId = new mongoose_1.Types.ObjectId(spec?.department);
                console.log({ departmentId });
                await department_model_1.default.findByIdAndUpdate({
                    _id: departmentId,
                }, {
                    $push: {
                        specializations: spec?._id,
                    },
                }, {
                    session,
                });
            }));
        }
        await session.commitTransaction();
        session.endSession();
        return newSpecializations;
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new customError_1.default(error?.message, 400);
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
    createTest,
    findAllAdmin,
    createSpecialization,
};
