"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const CommonSchema_1 = require("../utils/CommonSchema");
const adminSchema = new mongoose_1.Schema({
    adminId: {
        type: String,
        unique: true,
        index: true,
        required: [true, "User id is required!"],
    },
    contactInfo: CommonSchema_1.utilsSchema.nonPatientContactSchema,
    education: CommonSchema_1.utilsSchema.nonPatientEducationSchema,
    personalInfo: CommonSchema_1.utilsSchema.NonPatientPersonalInfo,
});
exports.Admin = (0, mongoose_1.model)("Admin", adminSchema);
