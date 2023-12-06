"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nurse = exports.nurseSchema = void 0;
const mongoose_1 = require("mongoose");
exports.nurseSchema = new mongoose_1.Schema({
    id: {
        type: String,
        index: true,
        unique: true,
        ref: "Users",
        required: [true, "Nurse id is required!"],
    },
    shift: {
        type: String,
        required: [true, "Nurse's Sift is required!"],
        enum: ["day", "night"],
        message: "{VALUE} is not accepted as schedule!",
    },
}, {
    timestamps: true,
});
exports.Nurse = (0, mongoose_1.model)("Nurse", exports.nurseSchema);
