"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Staff = void 0;
const mongoose_1 = require("mongoose");
const CommonSchema_1 = require("../utils/CommonSchema");
const staffSchema = new mongoose_1.Schema({
    staffId: {
        type: String,
        required: [true, "Staff id is required"],
    },
    shift: {
        type: String,
        enum: ["night", "day"],
        message: "Staff's shift should be night or day!",
        required: [true, "Shift is required"],
    },
    contactInfo: CommonSchema_1.utilsSchema.nonPatientContactSchema,
    education: [CommonSchema_1.utilsSchema.nonPatientEducationSchema],
    personalInfo: CommonSchema_1.utilsSchema.NonPatientPersonalInfo,
});
exports.Staff = (0, mongoose_1.model)("Staff", staffSchema);
