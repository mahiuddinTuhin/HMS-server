"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: [true, "A user id is required."],
        // unique: true,
        // index: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: (value) => {
                // Password should be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, one number, and one special character
                const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                return passwordPattern.test(value);
            },
            message: "-Password should be at least 8 characters long,\n -containing at least one uppercase letter, \n-one lowercase letter, \n-one number, \n-and one special character!",
        },
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
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
    role: {
        type: String,
        enum: {
            values: ["patient", "doctor", "admin"],
            message: "{VALUES} is not correct role. Choose patient, doctor or admin as role",
        },
    },
    status: {
        type: String,
        enum: {
            values: ["active", "inactive"],
            message: "{VALUES} is not correct role. Choose active or inactive as status",
        },
        default: "active",
    },
    failed_login_attempts: {
        type: Number,
        default: 0,
    },
    last_login: {
        type: Date,
    },
    last_failed_login: {
        type: Date,
    },
    profile_image: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.Users = mongoose_1.default.model("Users", userSchema);
