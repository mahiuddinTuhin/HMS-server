"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const customError_1 = __importDefault(require("../../errors/customError"));
const generateServiceId_1 = __importDefault(require("../../utils/generateServiceId"));
const appointment_model_1 = require("../appointment/appointment.model");
const doctors_model_1 = require("../doctors/doctors.model");
const patient_model_1 = require("./patient.model");
/**
 *
 * @service
 * @creating patient
 */
const ceateAppointment = async (data) => {
    const session = await (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        data.id = await (0, generateServiceId_1.default)(appointment_model_1.Appointment);
        const doctor = await doctors_model_1.Doctor.findById(data?.doctor)
            .select("pendingAppointments")
            .populate("pendingAppointments");
        const isBooked = doctor?.pendingAppointments?.find((appointment) => appointment?.time === data?.time && appointment?.date === data?.date);
        if (isBooked) {
            throw new customError_1.default("Doctor is not available on this time or date, Change date,time or both.", 409);
        }
        /* if doctor will be available on the specific time and date then creating appointment and modify doctor and patient collections. */
        const newAppointment = await appointment_model_1.Appointment.create([data], { session });
        /* modify doctor */
        await doctors_model_1.Doctor.findByIdAndUpdate(data?.doctor, {
            $push: {
                pendingAppointments: newAppointment[0]?._id,
            },
        }, {
            session,
        });
        /* modify patient */
        await patient_model_1.Patient.findByIdAndUpdate(data?.patient, {
            $push: {
                pendingAppointments: newAppointment[0]?._id,
            },
        }, {
            session,
        });
        await session.commitTransaction();
        await session.endSession();
        return newAppointment;
    }
    catch (error) {
        if (error instanceof customError_1.default &&
            error.message.includes("Doctor is not available")) {
            throw new customError_1.default("Doctor is not available on this time or date, Change date,time or both.", 409);
        }
        await session.abortTransaction();
        await session.endSession();
        throw new customError_1.default("Appointment creation failed", 400);
    }
};
const getAllPatient = async () => {
    const result = await patient_model_1.Patient.find();
    if (!result) {
        throw new Error("Patient retrieve failed.");
    }
    return result;
};
const getPatientById = async (id) => {
    const result = await patient_model_1.Patient.findById(id);
    if (!result) {
        throw new Error("Patient retrieve failed.");
    }
    return result;
};
const deleteAppointmentById = async (id) => {
    const session = await (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const appointment = await appointment_model_1.Appointment.findById(id);
        if (!appointment) {
            throw new customError_1.default("Appointment does not found to delete.", 400);
        }
        const isClosed = await appointment_model_1.Appointment.findByIdAndUpdate(appointment?._id, {
            isClosed: true,
        }, {
            session,
        });
        await doctors_model_1.Doctor.findByIdAndUpdate(appointment?.doctor, {
            $pull: {
                pendingAppointments: appointment?._id,
            },
        }, {
            session,
        });
        await patient_model_1.Patient.findByIdAndUpdate(appointment?.patient, {
            $pull: {
                pendingAppointments: appointment?._id,
            },
        }, {
            session,
        });
        await session.commitTransaction();
        await session.endSession();
        return isClosed;
    }
    catch (error) {
        if (error instanceof customError_1.default &&
            error.message.includes("Appointment does not found to delete")) {
            throw new customError_1.default("Appointment does not found to delete", 400);
        }
        await session.abortTransaction();
        await session.endSession();
        throw new customError_1.default("Failed to delete Appointment", 400);
    }
};
const updatePatientById = async (id, data) => {
    const result = await patient_model_1.Patient.updateOne({ userId: id }, { data });
    if (!result) {
        throw new Error("Patient update failed.");
    }
    return result;
};
exports.patientServices = {
    ceateAppointment,
    deleteAppointmentById,
    updatePatientById,
    getAllPatient,
    getPatientById,
};
