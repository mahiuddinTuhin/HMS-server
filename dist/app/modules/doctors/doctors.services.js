"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = require("mongoose");
const customError_1 = __importDefault(require("../../errors/customError"));
const medicalHistory_model_1 = require("../MedicalHistory/medicalHistory.model");
const appointment_model_1 = require("../appointment/appointment.model");
const department_model_1 = __importDefault(require("../department/department.model"));
const patient_model_1 = require("../patients/patient.model");
const doctors_model_1 = require("./doctors.model");
/* creating an appointment by doctor */
const createAppointment = async (data) => {
    /* checking whether doctor is available or not */
    const doesDoctorExist = await doctors_model_1.Doctor.findById(data?.id);
    if (!doesDoctorExist) {
        throw new customError_1.default("Doctor does not exist. Enter doctor id properly.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    if (doesDoctorExist) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const canTakeSchedule = await doctors_model_1.Doctor.findOne({
            id: data?.id,
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
        id: data?.id,
    }, {
        $push: {
            pendingAppointments: {
                date: data?.date,
                time: data?.time,
            },
        },
    }, { new: true });
    const updatedPatient = await patient_model_1.Patient.findOneAndUpdate({
        id: data?.id,
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
    const doc = await doctors_model_1.Doctor.findOne({
        user: new mongoose_1.Types.ObjectId(id),
    });
    // console.log({ doc });
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
const appointedTimeOfDoc = async (doctor_id) => {
    const doctor = await doctors_model_1.Doctor.findById(doctor_id);
    if (!doctor) {
        throw new customError_1.default("Doctor id is not found.", 400);
    }
    const pendingAppointments = doctor?.pendingAppointments;
    const scheduleByDate = {};
    /* if no appointment found, then return empty obj */
    if (!pendingAppointments.length) {
        return {};
    }
    /* getting all appointment from appointment collection by using the _id that is containing in * pendingAppointments */
    const allAppointments = await appointment_model_1.Appointment.find({
        _id: { $in: pendingAppointments },
    });
    /*
     * loop in all appointment
     * set scheduleByDate value with filed name using the date
     * push the time into matching date
     */
    allAppointments.forEach((appointment) => {
        const { date, time } = appointment;
        if (!scheduleByDate[date]) {
            scheduleByDate[date] = [];
        }
        scheduleByDate[date].push(time);
    });
    return scheduleByDate;
};
/*
 *find doctor by symptoms
 */
const findDoctorBySymptoms = async (symptoms) => {
    const doc = await department_model_1.default.find({
        specializations: {
            $elemMatch: {
                problems: {
                    $elemMatch: {
                        symptoms,
                    },
                },
            },
        },
    }, {
        doctors: 1,
    });
    return doc;
};
exports.doctorServices = {
    findDocByIdService,
    updateDocByIdService,
    getAllDocService,
    deleteDocByIdService,
    createAppointment,
    createMedicalHistory,
    appointedTimeOfDoc,
    findDoctorBySymptoms,
};
