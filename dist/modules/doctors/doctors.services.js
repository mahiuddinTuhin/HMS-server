"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = require("http-status-codes");
const customError_1 = __importDefault(require("../../util/customError"));
const appointment_model_1 = require("../appointment/appointment.model");
const doctors_model_1 = require("./doctors.model");
/* creating an appointment by doctor */
const createAppointment = async (data) => {
    try {
        const newDepartment = await appointment_model_1.Appointment.create(data);
        if (!newDepartment) {
            throw new customError_1.default("Creating appointment failed! from doctor services.", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        return newDepartment;
    }
    catch (error) {
        throw new customError_1.default(`Creating department failed from services!: ${error}`, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
};
const findDocByIdService = async (id) => {
    const doc = await doctors_model_1.Doctor.find({ doctorsId: id });
    return doc;
};
const deleteDocByIdService = async (id) => {
    const allDoc = await doctors_model_1.Doctor.deleteOne({ doctorsId: id });
    return allDoc;
};
const updateDocByIdService = async (id, data) => {
    const updatedDoc = await doctors_model_1.Doctor.findById(id, { data }, { new: true });
    return updatedDoc;
};
const getAllDocService = async () => {
    const allDoc = await doctors_model_1.Doctor.find();
    return allDoc;
};
exports.doctorServices = {
    findDocByIdService,
    updateDocByIdService,
    getAllDocService,
    deleteDocByIdService,
    createAppointment,
};
