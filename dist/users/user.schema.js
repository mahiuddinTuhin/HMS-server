"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    name: {
        firstName: {
            type: String,
            required: [true, "Must give your first name"],
        },
        middleName: {
            type: String,
        },
        lastName: {
            type: String,
            required: [true, "Must give your last name"],
        },
    },
    gender: {
        type: String,
        required: [true, "Must choose your gender"],
        enum: ["male", "female"],
    },
    age: {
        type: Number,
        required: [true, "Must give your age"],
    },
    email: {
        type: String,
        required: [true, "Must give your email"],
        unique: true,
        validate: {
            validator: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    phoneNumber: {
        type: String,
        required: [true, "Must give your contact no"],
    },
    birthdate: {
        type: String,
        required: [true, "Must give your birthdate"],
    },
    address: {
        street: {
            type: String,
            required: [true, "Must give your street name"],
        },
        city: {
            type: String,
            required: [true, "Must give your city name"],
        },
        state: {
            type: String,
            required: [true, "Must give your state name"],
        },
        postalCode: {
            type: String,
            required: [true, "Must give your postalCode"],
        },
        country: {
            type: String,
            required: [true, "Must give your country name"],
        },
    },
    isActive: Boolean,
    profile: {
        bio: {
            type: String,
            required: [true, "Must give your bio"],
        },
        interests: [{ type: String }],
        socialLinks: {
            twitter: String,
            instagram: String,
            linkedin: String,
        },
    },
});
