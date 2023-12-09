"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientController = void 0;
const ResponseToServer_1 = require("../../utils/ResponseToServer");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const patient_services_1 = require("./patient.services");
/**
 * @creating_appointment
 */
const ceateAppointment = (0, catchAsync_1.default)(async (req, res) => {
    const result = await patient_services_1.patientServices.ceateAppointment(req?.body);
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "Successfyully created appointment!", {
        data: result,
    });
});
const getAllPatient = (0, catchAsync_1.default)(async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await patient_services_1.patientServices.getAllPatient();
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "Successfyully retreive all the users!", {
        data: result,
    });
});
/**
 * @delete patient by id controller
 */
const deleteAppointmentById = (0, catchAsync_1.default)(async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await patient_services_1.patientServices.deleteAppointmentById(req.params.id);
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "Successfyully deleted the appointment!", {
        data: null,
    });
});
const updatePatientById = (0, catchAsync_1.default)(async (req, res) => {
    const id = Number(req.params.userId);
    const body = req.body;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await patient_services_1.patientServices.updatePatientById(id, body);
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "Successfyully update the users!", {
        data: result,
    });
});
exports.patientController = {
    updatePatientById,
    getAllPatient,
    ceateAppointment,
    deleteAppointmentById,
};
