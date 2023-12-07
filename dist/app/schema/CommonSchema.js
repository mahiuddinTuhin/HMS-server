"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilsSchema = void 0;
const mongoose_1 = require("mongoose");
const nonPatientContactSchema = new mongoose_1.Schema({
    homeMobile: {
        type: String,
        required: [true, "Home Mobile is required!"],
    },
    officeMobile: {
        type: String,
        required: [true, "Office Mobileis required!"],
    },
    email: {
        required: [true, "Email is required!"],
        type: String,
        validate: {
            validator: (value) => {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailPattern.test(value);
            },
            message: "Invalid email address format!",
        },
    },
});
const nonPatientEducationSchema = new mongoose_1.Schema({
    institute: {
        type: String,
        required: [true, "Institute is required!"],
    },
    degree: {
        type: String,
        required: [true, "Degree is required!"],
    },
    year: {
        type: Number,
        required: [true, "Passing year is required!"],
    },
});
const NonPatientPersonalInfo = new mongoose_1.Schema({
    address: {
        present_address: {
            type: String,
            required: [true, "Present address is required!"],
        },
        permanent_address: {
            type: String,
            required: [true, "Permanent address is required!"],
        },
    },
    fullName: {
        firstName: {
            type: String,
            required: [true, "FirstName  is required!"],
        },
        lastName: {
            type: String,
            required: [true, "FullName is required!"],
        },
    },
    dateOfBirth: {
        type: String,
        required: [true, "Date of birth is required!"],
    },
    gender: {
        type: String,
        required: [true, "Gender is required!"],
    },
    profileImage: {
        type: String,
        required: [true, "Profile image is required!"],
    },
});
const patientEducationSchema = new mongoose_1.Schema({
    institute: String,
    degree: String,
    year: Number,
});
const patientPersonalInfo = new mongoose_1.Schema({
    address: {
        present_address: String,
        permanent_address: String,
    },
    fullName: {
        firstName: String,
        lastName: String,
    },
    dateOfBirth: String,
    gender: String,
    profileImage: String,
});
const patientContactSchema = new mongoose_1.Schema({
    homeMobile: String,
    officeMobile: String,
    email: {
        type: String,
        validate: {
            validator: (value) => {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailPattern.test(value);
            },
            message: "Invalid email address format!",
        },
    },
});
const patientGuardianSchema = new mongoose_1.Schema({
    relation: String,
    name: String,
    contactNumber: String,
    address: String,
});
exports.utilsSchema = {
    nonPatientContactSchema,
    patientContactSchema,
    nonPatientEducationSchema,
    patientEducationSchema,
    NonPatientPersonalInfo,
    patientPersonalInfo,
    patientGuardianSchema,
};
