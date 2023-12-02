"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = __importDefault(require("mongoose"));
const customError_1 = __importDefault(require("../../util/customError"));
const admin_mode_1 = require("../admin/admin.mode");
const doctors_model_1 = require("../doctors/doctors.model");
const nurse_model_1 = require("../nurse/nurse.model");
const patient_mdoel_1 = require("../patients/patient.mdoel");
const staff_model_1 = require("../staff/staff.model");
const users_model_1 = require("./users.model");
/* 1. creating admin service */
const createAdminService = async (data) => {
    /* taking necessary data for common user */
    const userData = {
        userId: data?.userId,
        username: data?.username || data?.personalInfo?.fullName?.firstName + "2023" || "",
        password: data?.password || process.env.DEFAULT_PASSWORD,
        needsPasswordChange: true,
        email: data?.email,
        role: "admin",
        isDeleted: false,
    };
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = await users_model_1.Users.create([userData], { session });
        if (!newUser.length) {
            throw new customError_1.default("Error occured in creating user transactions.", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const { password, email, needsPasswordChange, role, isDeleted, userId, ...restOfData } = data;
        const adminData = { ...restOfData, adminId: data?.userId };
        const newAdmin = await admin_mode_1.Admin.create([adminData], { session });
        if (!newAdmin.length) {
            throw new Error("Doctor data creation failed!");
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
/* 2. creating doctor service*/
const createDocService = async (data) => {
    /* taking necessary data for user */
    const userData = {
        userId: data?.userId,
        username: data?.username ||
            data.personalInfo.fullName.firstName + "2023" ||
            "D" + new Date().getTime(),
        password: data?.password || process.env.DEFAULT_PASSWORD,
        needsPasswordChange: true,
        email: data?.email,
        role: "doctor",
        isDeleted: false,
    };
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = await users_model_1.Users.create([userData], { session });
        if (!newUser.length) {
            throw new customError_1.default("Error occured in creating user transactions.", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const { password, email, needsPasswordChange, role, isDeleted, userId, ...restOfData } = data;
        const doctorData = { ...restOfData, doctorId: data?.userId };
        const newDoctor = await doctors_model_1.Doctor.create([doctorData], { session });
        if (!newDoctor.length) {
            throw new customError_1.default("Error occured in creating Doctor data transactions.", http_status_codes_1.StatusCodes.BAD_REQUEST);
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
        userId: data?.userId,
        username: data?.username ||
            data.personalInfo.fullName.firstName + "2023" ||
            "N" + new Date().getTime(),
        password: data?.password || process.env.DEFAULT_PASSWORD,
        needsPasswordChange: true,
        email: data?.email,
        role: "nurse",
        isDeleted: false,
    };
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = await users_model_1.Users.create([userData], { session });
        if (!newUser.length) {
            throw new customError_1.default("Error occured in creating user transactions.", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const { password, email, needsPasswordChange, role, isDeleted, userId, ...restOfData } = data;
        const adminData = { ...restOfData, nurseId: data?.userId };
        const newNurse = await nurse_model_1.Nurse.create([adminData], { session });
        if (!newNurse.length) {
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
        throw error;
    }
};
/* 4. creating patient */
const createPatientService = async (data) => {
    /* taking necessary data for common user */
    const userData = {
        userId: data?.userId,
        username: data?.username ||
            data.personalInfo.fullName.firstName + "2023" ||
            "P" + new Date().getTime(),
        password: data?.password || process.env.DEFAULT_PASSWORD,
        needsPasswordChange: true,
        email: data?.email,
        role: "patient",
        isDeleted: false,
    };
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = await users_model_1.Users.create([userData], { session });
        if (!newUser.length) {
            throw new customError_1.default("Error occured in creating user transactions.", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const { password, email, needsPasswordChange, role, isDeleted, userId, ...restOfData } = data;
        const patientData = { ...restOfData, patientId: data?.userId };
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
        userId: data?.userId,
        username: data?.username ||
            data.personalInfo.fullName.firstName + "2023" ||
            "S" + new Date().getTime(),
        password: data?.password || process.env.DEFAULT_PASSWORD,
        needsPasswordChange: true,
        email: data?.email,
        role: "staff",
        isDeleted: false,
    };
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = await users_model_1.Users.create([userData], { session });
        if (!newUser.length) {
            throw new customError_1.default("Error occured in creating user transactions.", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const { password, email, needsPasswordChange, role, isDeleted, userId, ...restOfData } = data;
        const staffData = { ...restOfData, staffId: data?.userId };
        const newStaff = await staff_model_1.Staff.create([staffData], { session });
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
    const result = await users_model_1.Users.findOne({ userId: id });
    if (!result) {
        throw new Error("User retrieve failed.");
    }
    return result;
};
const getAllUser = async () => {
    const result = await users_model_1.Users.find();
    if (!result) {
        throw new Error("User retrieve failed.");
    }
    return result;
};
const deleteUserById = async (id) => {
    const result = await users_model_1.Users.deleteOne({ userId: id });
    if (!result) {
        throw new Error("User deletion failed.");
    }
    return result;
};
const updateUserById = async (id, data) => {
    const result = await users_model_1.Users.updateOne({ userId: id }, { data });
    if (!result) {
        throw new Error("User update failed.");
    }
    return result;
};
exports.userServices = {
    createAdminService,
    createDocService,
    createNurseService,
    createStaffService,
    createPatientService,
    getUserById,
    deleteUserById,
    updateUserById,
    getAllUser,
};
