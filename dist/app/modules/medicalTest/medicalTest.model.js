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
exports.MedicalTest = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const { Schema } = mongoose_1.default;
const MedicalTestSchema = new Schema({
    id: { type: String, required: [true, "Medical Test Id is required."] },
    name: { type: String, required: [true, "Name is required."] },
    details: { type: String, required: [true, "Name is required."] },
    charge: { type: Number, required: [true, "Charge is required."] },
    isPaid: { type: Boolean, default: true },
    reports: [{ type: Object, required: [true, "Reports is required."] }],
    summary: { type: String, required: [true, "Summary is required."] },
    equipments: { type: [String], required: [true, "Equipments is required."] },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
        required: [true, "Doctor is required."],
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required: [true, "Patient is required."],
    },
    staff: {
        type: Schema.Types.ObjectId,
        ref: "Staff",
        required: [true, "Staff is required."],
    },
    reportAvailableDate: {
        type: String,
        required: [true, "Report Available date is required."],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
exports.MedicalTest = (0, mongoose_1.model)("MedicalTest", MedicalTestSchema);
