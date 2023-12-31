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
const interfaces_1 = require("../../interfaces/interfaces");
const uploadToCloudinary_1 = __importDefault(require("../../utils/uploadToCloudinary"));
const userIdGenerator_1 = __importDefault(require("../../utils/userIdGenerator"));
const admin_mode_1 = require("../admin/admin.mode");
const department_model_1 = __importDefault(require("../department/department.model"));
const doctors_model_1 = require("../doctors/doctors.model");
const nurse_model_1 = __importDefault(require("../nurse/nurse.model"));
const patient_model_1 = require("../patients/patient.model");
const specializations_model_1 = __importDefault(require("../specializations/specializations.model"));
const staff_model_1 = __importDefault(require("../staff/staff.model"));
const user_model_1 = require("./user.model");
/**
 *
 * @creating_admin_service
 *
 * @returns_new_admin
 */
const createAdminService = async (data) => {
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        /*
         *  generating user id
         * returns the incremented id of previous one from DB
         */
        const generatedUserId = await (0, userIdGenerator_1.default)(interfaces_1.userRole.admin);
        if (!generatedUserId) {
            throw new customError_1.default("Error occured on creating generating id.", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
        // generating image name for imageDB
        const imageName = `image-${generatedUserId}`;
        /*
         *  uploads to cloudinary with path and imageName
         * return secure_url
         */
        const { secure_url } = (await (0, uploadToCloudinary_1.default)(data?.path, imageName));
        /* taking necessary data for common user */
        const userData = {
            id: generatedUserId,
            password: data?.password,
            email: data?.email,
            phone: data?.phone,
            role: "admin",
        };
        const newUser = await user_model_1.User.create([userData], { session });
        if (!newUser.length) {
            throw new customError_1.default("Failed to create user from service.", 400);
        }
        const { password, needsPasswordChange, role, isDeleted, _id, ...restOfData } = data;
        const adminData = {
            ...restOfData,
            id: newUser[0]?.id,
            user: newUser[0]?._id,
            profileImage: secure_url,
        };
        const newAdmin = await admin_mode_1.Admin.create([adminData], { session });
        if (!newAdmin.length) {
            throw new customError_1.default("Failed to create admin from service.", 400);
        }
        await session.commitTransaction();
        await session.endSession();
        return newAdmin;
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new customError_1.default(error?.message, 400);
    }
};
/**
 *
 * @creating_doctor_service
 *
 * @returns_new_doctor
 */
const createDocService = async (data) => {
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        /*
         *  generating user id
         * returns the incremented id of previous one from DB
         */
        const generatedUserId = await (0, userIdGenerator_1.default)(interfaces_1.userRole.doctor);
        if (!generatedUserId) {
            throw new customError_1.default("Error occured on creating generating id.", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
        // generating image name for imageDB
        const imageName = `image-${generatedUserId}`;
        /*
         *  uploads to cloudinary with path and imageName
         * return secure_url
         */
        const { secure_url } = (await (0, uploadToCloudinary_1.default)(data?.path, imageName));
        /* taking necessary data for common user */
        const userData = {
            id: generatedUserId,
            password: data?.password,
            email: data?.email,
            phone: data?.phone,
            role: interfaces_1.userRole.doctor,
        };
        const newUser = await user_model_1.User.create([userData], { session });
        if (!newUser) {
            throw new customError_1.default("Failed to create user from service.", 400);
        }
        const { password, needsPasswordChange, role, isDeleted, _id, ...restOfData } = data;
        /* cooking doctor obj for create document in database */
        const doctorData = {
            ...restOfData,
            id: newUser[0]?.id,
            user: newUser[0]?._id,
            profileImage: secure_url,
        };
        // creting doctor document
        const newDoctor = await doctors_model_1.Doctor.create([doctorData], { session });
        // updating department with doctor's user_id, also skip if already exist
        await department_model_1.default.findByIdAndUpdate(doctorData.department, // object id
        {
            $addToSet: {
                doctors: doctorData.user, //doctorData.user is a object id
            },
        }, { session });
        // updating specialization collection with doctor's user_id, also skip if already exist. Note: A doctor can exist in multiple specialization.
        const newSpecializations = newDoctor[0].specializations;
        await Promise.all(newSpecializations?.map(async (spec) => {
            await specializations_model_1.default.findByIdAndUpdate(spec, {
                $addToSet: {
                    doctors: doctorData.user, //doctorData.user is a object id
                },
            }, {
                session,
            });
        }));
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
        throw new customError_1.default(error?.message, 400);
    }
};
/**
 *
 * @creating_nurse_service
 *
 * @returns_new_nurse
 */
const createNurseService = async (data) => {
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        /*
         *  generating user id
         * returns the incremented id of previous one from DB
         */
        const generatedUserId = await (0, userIdGenerator_1.default)(interfaces_1.userRole.nurse);
        if (!generatedUserId) {
            throw new customError_1.default("Error occured on creating generating id.", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
        // generating image name for imageDB
        const imageName = `image-${generatedUserId}`;
        /*
         *  uploads to cloudinary with path and imageName
         * return secure_url
         */
        const { secure_url } = (await (0, uploadToCloudinary_1.default)(data?.path, imageName));
        /* taking necessary data for common user */
        const userData = {
            id: generatedUserId,
            password: data?.password,
            email: data?.email,
            phone: data?.phone,
            role: interfaces_1.userRole.nurse,
        };
        const newUser = await user_model_1.User.create([userData], { session });
        const { password, needsPasswordChange, role, isDeleted, _id, ...restOfData } = data;
        const nurseData = {
            ...restOfData,
            id: newUser[0]?.id,
            user: newUser[0]?._id,
            profileImage: secure_url,
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
        throw new customError_1.default(error?.message, 400);
    }
};
/**
 *
 * @creating_patient_service
 *
 * @returns_new_patient
 */
const createPatientService = async (data) => {
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        /*
         *  generating user id
         * returns the incremented id of previous one from DB
         */
        const generatedUserId = await (0, userIdGenerator_1.default)(interfaces_1.userRole.patient);
        if (!generatedUserId) {
            throw new customError_1.default("Error occured on creating generating id.", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
        // generating image name for imageDB
        const imageName = `image-${generatedUserId}`;
        /*
         *  uploads to cloudinary with path and imageName
         * return secure_url
         */
        const { secure_url } = (await (0, uploadToCloudinary_1.default)(data?.path, imageName));
        /* taking necessary data for common user */
        const userData = {
            id: generatedUserId,
            password: data?.password,
            email: data?.email,
            phone: data?.phone,
            role: interfaces_1.userRole.patient,
        };
        const newUser = await user_model_1.User.create([userData], { session });
        if (!newUser) {
            throw new customError_1.default("Error occured in creating user transactions.", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const { password, email, needsPasswordChange, role, isDeleted, ...restOfData } = data;
        const patientData = {
            ...restOfData,
            id: newUser[0]?.id,
            user: newUser[0]?._id,
            profileImage: secure_url,
        };
        const newPatient = await patient_model_1.Patient.create([patientData], { session });
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
        throw new customError_1.default(error?.message, 400);
    }
};
/**
 *
 * @creating_staff_service
 *
 * @returns_new_staff
 */
const createStaffService = async (data) => {
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        /*
         *  generating user id
         * returns the incremented id of previous one from DB
         */
        const generatedUserId = await (0, userIdGenerator_1.default)(interfaces_1.userRole.staff);
        if (!generatedUserId) {
            throw new customError_1.default("Error occured on creating generating id.", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
        // generating image name for imageDB
        const imageName = `image-${generatedUserId}`;
        /*
         *  uploads to cloudinary with path and imageName
         * return secure_url
         */
        const { secure_url } = (await (0, uploadToCloudinary_1.default)(data?.path, imageName));
        /* taking necessary data for common user */
        const userData = {
            id: generatedUserId,
            password: data?.password,
            email: data?.email,
            phone: data?.phone,
            role: interfaces_1.userRole.staff,
        };
        const newUser = await user_model_1.User.create([userData], { session });
        if (!newUser) {
            throw new customError_1.default("Error occured in creating user transactions.", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const { password, needsPasswordChange, role, isDeleted, userId, ...restOfData } = data;
        const staffData = {
            ...restOfData,
            id: newUser[0]?.id,
            user: newUser[0]?._id,
            profileImage: secure_url,
        };
        const newStaff = await staff_model_1.default.create([staffData], { session });
        if (!newStaff) {
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
        throw new customError_1.default(error?.message, 400);
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
    const searchTerm = query?.searchTerm || "";
    const result = await user_model_1.User.find(searchTerm);
    return result;
};
const updateUserById = (id, body) => { };
/**
 *
 * @reset_password
 *
 */
const resetPassword = async (data) => {
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        session.abortTransaction();
        session.endSession();
        throw new customError_1.default(error?.message, 400);
    }
};
/**
 *
 * @Get_me_service
 *
 */
const getMe = async (id, role) => {
    let result;
    if (role === "admin") {
        result = await admin_mode_1.Admin.findOne({ id }).populate("user");
    }
    else if (role === "nurse") {
        result = await nurse_model_1.default.findOne({ id }).populate("user");
    }
    else if (role === "doctor") {
        result = await doctors_model_1.Doctor.findOne({ id }).populate("user");
    }
    else if (role === "staff") {
        result = await staff_model_1.default.findOne({ id }).populate("user");
    }
    else if (role === "patient") {
        result = await patient_model_1.Patient.findOne({ id }).populate("user");
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
    updateUserById,
    getAllUser,
    resetPassword,
    getMe,
};
