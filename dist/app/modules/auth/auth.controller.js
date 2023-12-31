"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseToServer_1 = require("../../utils/ResponseToServer");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_service_1 = __importDefault(require("./auth.service"));
/* login controller */
const login = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await auth_service_1.default.login(req.body);
    const { refreshToken, accessToken, needsPasswordChange } = result;
    res.cookie("refreshToken", refreshToken, {
        secure: false || process.env.NODE_ENV === "production",
        httpOnly: true,
    });
    (0, ResponseToServer_1.responseToRequest)(res, {
        success: true,
        status: 200,
        message: "Successfully login.",
        data: { accessToken, needsPasswordChange },
    });
});
/* change password controller */
const changePassword = (0, catchAsync_1.default)(async (req, res, next) => {
    const user = req?.user;
    const { ...passwordData } = req.body;
    const result = await auth_service_1.default.changePassword(user, passwordData);
    result &&
        (0, ResponseToServer_1.responseToRequest)(res, {
            success: true,
            status: 200,
            message: "Successfully changed password.",
            data: null,
        });
});
const refreshToken = (0, catchAsync_1.default)(async (req, res, next) => {
    const { refreshToken } = req.cookies;
    const result = await auth_service_1.default.refreshToken(refreshToken);
    result &&
        (0, ResponseToServer_1.responseToRequest)(res, {
            success: true,
            status: 200,
            message: "Successfully created new refresh Token.",
            data: result,
        });
});
const forgetPassword = (0, catchAsync_1.default)(async (req, res, next) => {
    const id = req.body.id;
    const result = await auth_service_1.default.forgetPassword(id);
    result &&
        (0, ResponseToServer_1.responseToRequest)(res, {
            success: true,
            status: 200,
            message: "Successfully generated password reset link.",
            data: result,
        });
});
/* reset password controller */
const resetPassword = (0, catchAsync_1.default)(async (req, res, next) => {
    const user = req.user;
    const newPassword = req?.body?.newPassword;
    const result = await auth_service_1.default.resetPassword(user, newPassword);
    result &&
        (0, ResponseToServer_1.responseToRequest)(res, {
            success: true,
            status: 200,
            message: "Successfully reset password.",
            data: null,
        });
});
const authController = {
    login,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword,
};
exports.default = authController;
