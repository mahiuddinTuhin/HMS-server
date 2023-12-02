"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilsSchema = void 0;
const mongoose_1 = require("mongoose");
const nonPatientContactSchema = new mongoose_1.Schema({
    homeMobile: {
        type: String,
        required: [true, "User id is required!"],
    },
    officeMobile: {
        type: String,
        required: [true, "User id is required!"],
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
const patientEducationSchema = new mongoose_1.Schema({
    institute: String,
    degree: String,
    year: Number,
});
const NonPatientPersonalInfo = new mongoose_1.Schema({
    present_address: {
        type: String,
        required: [true, "Present address is required!"],
    },
    permanent_address: {
        type: String,
        required: [true, "Permanent address is required!"],
    },
    date_of_birth: {
        type: String,
        required: [true, "Date of birth is required!"],
    },
    gender: {
        type: String,
        required: [true, "Gender is required!"],
    },
    profile_image: {
        type: String,
        required: [true, "Profile image is required!"],
    },
});
const patientPersonalInfo = new mongoose_1.Schema({
    present_address: String,
    permanent_address: String,
    date_of_birth: String,
    gender: String,
    profile_image: String,
});
// const nonPatientGuardianSchema = new Schema<TGuardian>({
//   relation: {
//     type: String,
//     required: [true, "Relation with guardian is required!"],
//   },
//   name: {
//     type: String,
//     required: [true, "Name of guardian is required!"],
//   },
//   contactNumber: {
//     type: String,
//     required: [true, "Contact Number of guardian is required!"],
//   },
//   address: {
//     type: String,
//     required: [true, "Guardian address is required!"],
//   },
// });
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
