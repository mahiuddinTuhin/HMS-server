"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = __importDefault(require("mongoose"));
const customError_1 = __importDefault(require("../../errors/customError"));
const userIdGenerator_1 = __importDefault(require("../../utils/userIdGenerator"));
const admin_mode_1 = require("../admin/admin.mode");
const doctors_model_1 = require("../doctors/doctors.model");
const nurse_model_1 = __importDefault(require("../nurse/nurse.model"));
const patient_mdoel_1 = require("../patients/patient.mdoel");
const staff_model_1 = __importDefault(require("../staff/staff.model"));
const user_model_1 = require("./user.model");
const bcrypt = require("bcrypt");
/**
 *
 * @creating_admin_service
 *
 * @returns_new_admin
 */
const createAdminService = async (data) => {
    /* taking necessary data for common user */
    const userData = {
        id: await (0, userIdGenerator_1.default)("Admin"),
        password: data?.password,
        needsPasswordChange: true,
        email: data?.email,
        phone: data?.phone,
        role: "admin",
        isDeleted: false,
        status: "active",
    };
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = await user_model_1.User.create([userData], { session });
        if (!newUser.length) {
            throw new customError_1.default("Failed to create user from service.", 400);
        }
        const { password, needsPasswordChange, role, isDeleted, _id, ...restOfData } = data;
        const adminData = {
            ...restOfData,
            id: newUser[0]?.id,
            user: newUser[0]?._id,
        };
        const newAdmin = await admin_mode_1.Admin.create([adminData], { session });
        if (!newAdmin.length) {
            throw new customError_1.default("Failed to create admin from service.", 400);
        }
        await session.commitTransaction();
        await session.endSession();
        return newAdmin;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }
};
/**
 * @function creating Doctor Services
 *
 */
const createDocService = async (data) => {
    /* taking necessary data for common user */
    const userData = {
        id: await (0, userIdGenerator_1.default)("Doctor"),
        password: data?.password,
        needsPasswordChange: true,
        email: data?.email,
        phone: data?.phone,
        role: "doctor",
        isDeleted: false,
        status: "active",
    };
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = await user_model_1.User.create([userData], { session });
        if (!newUser) {
            throw new customError_1.default("Failed to create user from service.", 400);
        }
        const { password, needsPasswordChange, role, isDeleted, _id, ...restOfData } = data;
        const doctorData = {
            ...restOfData,
            id: newUser[0]?.id,
            user: newUser[0]?._id,
        };
        const newDoctor = await doctors_model_1.Doctor.create([doctorData], { session });
        if (!newDoctor?.length) {
            throw new customError_1.default("Failed to create admin from service.", 400);
        }
        await session.commitTransaction();
        await session.endSession();
        return newDoctor;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }
};
/*  3. create nurse service */
const createNurseService = async (data) => {
    /* taking necessary data for common user */
    const userData = {
        id: await (0, userIdGenerator_1.default)("Nurse"),
        password: data?.password,
        needsPasswordChange: true,
        email: data?.email,
        phone: data?.phone,
        role: "nurse",
        isDeleted: false,
        status: "active",
    };
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = await user_model_1.User.create([userData], { session });
        const { password, needsPasswordChange, role, isDeleted, _id, ...restOfData } = data;
        const nurseData = {
            ...restOfData,
            id: newUser[0]?.id,
            user: newUser[0]?._id,
        };
        const newNurse = await nurse_model_1.default.create([nurseData], { session });
        if (!newNurse) {
            throw new customError_1.default("Error occured in creating nurse model transactions.", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        await session.commitTransaction();
        await session.endSession();
        return newNurse;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        // console.log("--error occured--");
        // console.log(`\n\n${error}\n\n`);
        throw new Error(error);
    }
};
/* 4. creating patient */
const createPatientService = async (data) => {
    /* taking necessary data for common user */
    const userData = {
        id: data.id,
        password: data?.password || process.env.DEFAULT_PASSWORD,
        needsPasswordChange: true,
        email: data?.email,
        role: "patient",
        isDeleted: false,
    };
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = await user_model_1.User.create([userData], { session });
        if (!Object.keys(newUser).length) {
            throw new customError_1.default("Error occured in creating user transactions.", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const { password, email, needsPasswordChange, role, isDeleted, ...restOfData } = data;
        const patientData = { ...restOfData, id: data?.id, user: newUser[0]?._id };
        const newPatient = await patient_mdoel_1.Patient.create([patientData], { session });
        if (!newPatient.length) {
            throw new customError_1.default("Error occured in creating nurse model transactions.", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        await session.commitTransaction();
        await session.endSession();
        return newPatient;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }
};
/* 5. creating staff */
const createStaffService = async (data) => {
    /* taking necessary data for common user */
    const userData = {
        password: data?.password || process.env.DEFAULT_PASSWORD,
        needsPasswordChange: true,
        email: data?.email,
        role: "staff",
        isDeleted: false,
    };
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = await user_model_1.User.create([userData], { session });
        if (!newUser.length) {
            throw new customError_1.default("Error occured in creating user transactions.", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const { password, email, needsPasswordChange, role, isDeleted, userId, ...restOfData } = data;
        const staffData = { ...restOfData, staffId: data?.userId };
        const newStaff = await staff_model_1.default.create([staffData], { session });
        if (!newStaff.length) {
            throw new customError_1.default("Error occured in creating staff model transactions.", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        await session.commitTransaction();
        await session.endSession();
        return newStaff;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }
};
const getUserById = async (id) => {
    const result = await user_model_1.User.findOne({ userId: id });
    if (!result) {
        throw new Error("User retrieve failed.");
    }
    return result;
};
const getAllUser = async (query) => {
    let searchTerm = "";
    if (query?.searchTerm) {
        searchTerm = query?.searchTerm;
    }
    const result = await user_model_1.User.find();
    return result;
};
const updateUserById = (id, body) => {
    // console.log(id, body);
};
exports.userServices = {
    createAdminService,
    createDocService,
    createNurseService,
    createStaffService,
    createPatientService,
    getUserById,
    updateUserById,
    getAllUser,
};
