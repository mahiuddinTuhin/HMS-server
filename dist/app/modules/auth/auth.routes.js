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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const interfaces_1 = require("../../interfaces/interfaces");
const ZodValidator_1 = __importDefault(require("../../middleware/ZodValidator"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const auth_validation_1 = __importStar(require("./auth.validation"));
const router = (0, express_1.Router)();
/* login routes */
router.post("/login", (0, ZodValidator_1.default)(auth_validation_1.default), auth_controller_1.default.login);
/* change password routes */
router.post("/change-password", (0, auth_1.default)(interfaces_1.userRole.admin, interfaces_1.userRole.doctor, interfaces_1.userRole.nurse, interfaces_1.userRole.patient, interfaces_1.userRole.staff), (0, ZodValidator_1.default)(auth_validation_1.changePasswordValidation), auth_controller_1.default.changePassword);
/* refresh token create routes */
router.post("/refresh-token", (0, ZodValidator_1.default)(auth_validation_1.refreshTokenValidation), auth_controller_1.default.refreshToken);
/*
 *  forget password routes
 *
 *  return reset link
 */
router.post("/forget-password", (0, ZodValidator_1.default)(auth_validation_1.forgetPasswordValidation), auth_controller_1.default.forgetPassword);
/*
 *  reset password routes
 *
 *  return null
 */
router.post("/reset-password", (0, auth_1.default)(interfaces_1.userRole.admin, interfaces_1.userRole.doctor, interfaces_1.userRole.nurse, interfaces_1.userRole.patient, interfaces_1.userRole.staff), (0, ZodValidator_1.default)(auth_validation_1.resetPasswordValidation), auth_controller_1.default.resetPassword);
const authRouter = router;
exports.default = authRouter;
