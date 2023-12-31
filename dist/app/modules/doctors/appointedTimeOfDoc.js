"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const customError_1 = __importDefault(require("../../errors/customError"));
const appointment_model_1 = require("../appointment/appointment.model");
const doctors_model_1 = require("./doctors.model");
const appointedTimeOfDoc = async (doctor_id) => {
    const doctor = await doctors_model_1.Doctor.findById(doctor_id);
    console.log("appointed time hit");
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
exports.default = appointedTimeOfDoc;
