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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const mongoose_1 = __importStar(require("mongoose"));
const admin_mode_1 = require("../admin/admin.mode");
const doctors_model_1 = require("../doctors/doctors.model");
const patient_mdoel_1 = require("../patients/patient.mdoel");
const users_model_1 = require("./users.model");
/* 1. creating admin service */
const createAdminService = async (data) => {
    /* taking necessary data for common user */
    const userData = {
        userId: data?.userId,
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
            throw new Error("Error occured in transactions.");
        }
        const { password, email, needsPasswordChange, role, isDeleted, ...restOfData } = data;
        const adminData = { ...restOfData };
        const newDoctor = await admin_mode_1.Admin.create([adminData], { session });
        if (!newDoctor.length) {
            throw new Error("Doctor data creation failed!");
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
/* creating doctor */
const createDocService = async (data) => {
    /* taking necessary data for user */
    const userData = {
        userId: data.userId,
        password: data.password,
        email: data.email,
    };
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = await users_model_1.Users.create([userData], { session });
        if (!newUser.length) {
            throw new Error("Error occured in transactions.");
        }
        const { password, email, profile_image, ...restOfData } = data;
        const docData = { ...restOfData, user_Id: newUser[0]?._id };
        const newDoctor = await doctors_model_1.Doctor.create([docData], { session });
        if (!newDoctor.length) {
            throw new Error("Doctor data creation failed!");
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
/* creating patient */
const createPatientService = async (data) => {
    const userData = {
        userId: data.userId,
        password: data.password,
        email: data.email,
    };
    const session = await (0, mongoose_1.startSession)();
    const { password, email, profile_image, ...restOfData } = data;
    try {
        /* starting session */
        session.startTransaction();
        const newUser = await users_model_1.Users.create([userData], { session });
        if (!newUser.length) {
            throw new Error("User creation failed.");
        }
        const patientData = { ...restOfData, user_Id: newUser[0]?._id };
        const newPatient = await patient_mdoel_1.Patient.create([patientData], { session });
        if (!newPatient.length) {
            throw new Error("User creation failed.");
        }
        await session.commitTransaction();
        await session.endSession();
        /* ends session */
        return newPatient;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
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
    createDocService,
    createPatientService,
    getUserById,
    deleteUserById,
    updateUserById,
    getAllUser,
};
