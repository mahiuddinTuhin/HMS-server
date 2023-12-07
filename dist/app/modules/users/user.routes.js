"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const ZodValidator_1 = __importDefault(require("../../middleware/ZodValidator"));
const admin_validation_1 = require("../admin/admin.validation");
const user_controllers_1 = require("./user.controllers");
const users_zodValidation_1 = require("./users.zodValidation");
const router = (0, express_1.Router)();
/* 1. creating admin */
router.post("/create-admin", (0, ZodValidator_1.default)(users_zodValidation_1.userValidation), (0, ZodValidator_1.default)(admin_validation_1.adminValidation), user_controllers_1.userControllers.createAdmin);
/*  2. create doctor */
router.post("/create-doctor", user_controllers_1.userControllers.createDoctor);
/* 3. create Nurse */
router.post("/create-nurse", user_controllers_1.userControllers.createNurse);
/* 4. create patient */
router.post("/create-patient", user_controllers_1.userControllers.createPatient);
/* 5. create staff */
router.post("/create-staff", user_controllers_1.userControllers.createStaff);
router.get("/", user_controllers_1.userControllers.getAllUser);
router.get("/:userId", user_controllers_1.userControllers.getUserById);
// router.delete("/:userId", userControllers.deleteUserById);
router.put("/:userId", user_controllers_1.userControllers.updateUserById);
exports.userRoutes = router;
