"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const doctors_model_1 = require("../doctors/doctors.model");
const patient_mdoel_1 = require("../patients/patient.mdoel");
const users_model_1 = require("./users.model");
/* creating doctor */
const createDocService = async (data) => {
    /* taking necessary data for user */
    const userData = {
        userId: data.userId,
        password: data.password,
        email: data.email,
        profile_image: data.profile_image,
    };
    const { password, email, profile_image, ...restOfData } = data;
    try {
        /* creating user */
        const newUser = await users_model_1.Users.create(userData);
        /*
        users collection -> userId, _id
        doctors collection -> _id
        
        */
        /* taking necessary data for doctor */
        const docData = { ...restOfData, user_Id: newUser?._id };
        if (newUser._id) {
            const newDoc = await doctors_model_1.Doctor.create(docData);
            if (!newDoc) {
                throw new Error("Doctor data creation failed!");
            }
            return newDoc;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        throw new Error(error);
    }
};
/* creating patient */
const createPatientService = async (data) => {
    const userData = {
        userId: data.userId,
        password: data.password,
        email: data.email,
        profile_image: data.profile_image,
    };
    const { password, email, profile_image, ...restOfData } = data;
    try {
        const newUser = await users_model_1.Users.create(userData);
        const patientData = { ...restOfData, user_Id: newUser._id };
        if (newUser._id) {
            const newPatient = await patient_mdoel_1.Patient.create(patientData);
            if (!newPatient) {
                throw new Error("User creation failed.");
            }
            return newPatient;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
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
    createPatientService,
    createDocService,
    getUserById,
    deleteUserById,
    updateUserById,
    getAllUser,
};
