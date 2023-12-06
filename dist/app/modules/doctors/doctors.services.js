"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = require("http-status-codes");
const customError_1 = __importDefault(require("../../app/util/customError"));
const medicalHistory_model_1 = require("../MedicalHistory/medicalHistory.model");
const patient_mdoel_1 = require("../patients/patient.mdoel");
const doctors_model_1 = require("./doctors.model");
/* creating an appointment by doctor */
const createAppointment = async (data) => {
    try {
        /* checking whether doctor is available or not */
        const doesDoctorExist = await doctors_model_1.Doctor.findOne({
            doctorId: data?.doctorId,
        });
        if (!doesDoctorExist) {
            throw new customError_1.default("Doctor does not exist. Enter doctor id properly.", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        if (doesDoctorExist) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const canTakeSchedule = await doctors_model_1.Doctor.findOne({
                doctorId: data?.doctorId,
                pendingAppointments: {
                    $elemMatch: {
                        date: data?.date,
                        time: data?.time,
                    },
                },
            });
            if (canTakeSchedule) {
                throw new customError_1.default("Doctor does not available on that time. Change time or date.", http_status_codes_1.StatusCodes.BAD_REQUEST);
            }
        }
        const newAppointMent = await doctors_model_1.Doctor.findOneAndUpdate({
            doctorId: data?.doctorId,
        }, {
            $push: {
                pendingAppointments: {
                    date: data?.date,
                    time: data?.time,
                },
            },
        }, { new: true });
        const updatedPatient = await patient_mdoel_1.Patient.findOneAndUpdate({
            patientId: data?.patientId,
        }, {
            $push: {
                pendingAppointments: {
                    date: data?.date,
                    time: data?.time,
                },
            },
        });
        if (!newAppointMent || !updatedPatient) {
            throw new customError_1.default("Failed to create appointment!!", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return newAppointMent;
    }
    catch (error) {
        throw new customError_1.default(`Creating appointment failed from doctor services!: ${error}`, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
};
/* creating a medical history by doctor */
const createMedicalHistory = async (data) => {
    try {
        const newMedicalHistory = await medicalHistory_model_1.MedicalHistory.create(data);
        if (!newMedicalHistory) {
            throw new customError_1.default("Creating Medical History failed! from doctor services.", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        return newMedicalHistory;
    }
    catch (error) {
        throw new customError_1.default(`Creating Medical History  failed from doctor services!: ${error}`, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
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
    createMedicalHistory,
};
