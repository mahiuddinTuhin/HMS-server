"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const CommonSchema_1 = require("../utils/CommonSchema");
const adminSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "User id is required in admin !"],
        unique: true,
        ref: "User",
    },
    id: {
        type: String,
        required: [true, "id is required in admin!"],
    },
    contactInfo: CommonSchema_1.utilsSchema.nonPatientContactSchema,
    education: CommonSchema_1.utilsSchema.nonPatientEducationSchema,
    personalInfo: CommonSchema_1.utilsSchema.NonPatientPersonalInfo,
});
exports.Admin = (0, mongoose_1.model)("Admin", adminSchema);
