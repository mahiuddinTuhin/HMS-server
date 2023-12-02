"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nurse = void 0;
const mongoose_1 = require("mongoose");
const nurseSchema = new mongoose_1.Schema({
    nurseId: String,
    shift: String,
    contactInfo: String,
    education: [String],
    personalInfo: [String],
});
exports.Nurse = (0, mongoose_1.model)("Nurse", nurseSchema);
