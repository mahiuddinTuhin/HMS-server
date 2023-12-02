"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorServices = void 0;
const doctors_model_1 = require("./doctors.model");
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
};
