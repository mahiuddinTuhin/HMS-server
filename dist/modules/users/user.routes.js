"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const ZodValidator_1 = __importDefault(require("../../middleware/ZodValidator"));
const doctors_validation_1 = require("../doctors/doctors.validation");
const user_controllers_1 = require("./user.controllers");
const users_zodValidation_1 = require("./users.zodValidation");
const router = (0, express_1.Router)();
router.post("/create-patient", (0, ZodValidator_1.default)(users_zodValidation_1.userZValidation), user_controllers_1.userControllers.createPatient);
router.post("/create-doctor", (0, ZodValidator_1.default)(doctors_validation_1.ZDoctors), user_controllers_1.userControllers.createDoctor);
router.get("/", user_controllers_1.userControllers.getAllUser);
router.get("/:userId", user_controllers_1.userControllers.getUserById);
router.delete("/:userId", user_controllers_1.userControllers.deleteUserById);
router.put("/", user_controllers_1.userControllers.updateUserById);
exports.userRoutes = router;
