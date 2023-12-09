"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommonSchema_1 = require("../../schema/CommonSchema");
const staffSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "User ID is required"],
    },
    id: { type: String, required: [true, "ID is required"] },
    shift: {
        type: String,
        enum: ["day", "night"],
        required: [true, "Shift is required"],
    },
    education: [CommonSchema_1.utilsSchema.nonPatientEducationSchema],
    email: { type: String, required: [true, "Email is required"] },
    phone: { type: String, required: [true, "Phone is required"] },
    fullName: CommonSchema_1.utilsSchema.fullNameSchema,
    address: CommonSchema_1.utilsSchema.addressSchema,
    dateOfBirth: { type: String, required: [true, "Date of birth is required"] },
    gender: { type: String, required: [true, "Gender is required"] },
    profileImage: { type: String, required: [true, "Profile image is required"] },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
const Staff = (0, mongoose_1.model)("Staff", staffSchema);
exports.default = Staff;
