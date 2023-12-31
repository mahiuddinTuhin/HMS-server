"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createMedicalReports = (0, catchAsync_1.default)(async (req, res) => {
    console.log("request handler work");
});
const staffControllers = { createMedicalReports };
exports.default = staffControllers;
