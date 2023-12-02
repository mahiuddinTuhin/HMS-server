"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientServices = void 0;
const patient_mdoel_1 = require("./patient.mdoel");
const getPatientById = async (id) => {
    const result = await patient_mdoel_1.Patient.findOne({ userId: id });
    if (!result) {
        throw new Error("Patient retrieve failed.");
    }
    return result;
};
const getAllPatient = async () => {
    const result = await patient_mdoel_1.Patient.find();
    if (!result) {
        throw new Error("Patient retrieve failed.");
    }
    return result;
};
const deletePatientById = async (id) => {
    const result = await patient_mdoel_1.Patient.deleteOne({ userId: id });
    if (!result) {
        throw new Error("Patient deletion failed.");
    }
    return result;
};
const updatePatientById = async (id, data) => {
    const result = await patient_mdoel_1.Patient.updateOne({ userId: id }, { data });
    if (!result) {
        throw new Error("Patient update failed.");
    }
    return result;
};
exports.patientServices = {
    getPatientById,
    deletePatientById,
    updatePatientById,
    getAllPatient,
};
