"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const Common_Validation_1 = require("../../validation/Common.Validation");
const NurseSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "User ID is required"],
    },
    id: { type: String, required: [true, "Nurse ID is required"] },
    shift: {
        type: String,
        enum: ["day", "night"],
        required: [
            true,
            'Shift is required and should be either "day" or "night"',
        ],
    },
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
        type: [{ type: Object }],
        validate: {
            validator: (eduArray) => eduArray.length > 0,
            message: "At least one education entry is required",
        },
    },
    fullName: {
        firstName: { type: String, required: [true, "First name is required"] },
        middleName: { type: String, required: [true, "Middle name is required"] },
        lastName: { type: String, required: [true, "Last name is required"] },
    },
    address: {
        presentAddress: {
            type: String,
            required: [true, "Present address is required"],
        },
        permanentAddress: {
            type: String,
            required: [true, "Permanent address is required"],
        },
    },
    dateOfBirth: {
        type: String,
        required: [true, "Date of birth is required"],
        match: [Common_Validation_1.birthDatePattern, "Invalid date format (YYYY-MM-DD)"],
    },
    gender: { type: String, required: [true, "Gender is required"] },
    profileImage: {
        type: String,
        required: [true, "Profile image URL is required"],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const Nurse = mongoose_1.default.model("Nurse", NurseSchema);
exports.default = Nurse;
