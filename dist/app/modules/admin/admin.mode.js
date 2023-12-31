"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.adminSchema = void 0;
const mongoose_1 = require("mongoose");
const CommonSchema_1 = require("../../schema/CommonSchema");
const Common_Validation_1 = require("../../validation/Common.Validation");
exports.adminSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
    },
    id: { type: String, required: [true, "Nurse ID is required"] },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [Common_Validation_1.emailPattern, "Invalid email format"],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        match: [Common_Validation_1.phonePattern, "Invalid phone number format"],
    },
    education: {
        type: [{ type: Object }], // Assuming TEducation structure is complex; can be refined
        validate: {
            validator: (eduArray) => eduArray.length > 0,
            message: "At least one education entry is required",
        },
    },
    fullName: CommonSchema_1.utilsSchema.fullNameSchema,
    address: CommonSchema_1.utilsSchema.addressSchema,
    dateOfBirth: {
        type: String,
        required: [true, "Date of birth is required"],
        match: [Common_Validation_1.birthDatePattern, "Invalid date format (YYYY-MM-DD)"],
    },
    gender: { type: String, required: [true, "Gender is required"] },
    profileImage: {
        type: String,
    },
}, { timestamps: true });
exports.Admin = (0, mongoose_1.model)("Admin", exports.adminSchema);
