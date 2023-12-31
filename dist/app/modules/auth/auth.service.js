"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customError_1 = __importDefault(require("../../errors/customError"));
const hashedPassword_1 = __importDefault(require("../../utils/hashedPassword"));
const user_model_1 = require("../users/user.model");
const sendMail_1 = __importDefault(require("../utils/sendMail"));
/* login service */
const login = async (payload) => {
    const user = await user_model_1.User.isUserExist(payload?.id);
    // console.log({ pass: user });
    /* match password */
    if (!(await user_model_1.User.passwordMatched(payload?.password, //text pass
    user?.password))) {
        throw new customError_1.default("Incorrect password", 400);
    }
    const JwtPayload = {
        id: user?.id,
        role: user?.role,
    };
    const accessSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
    const accessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN;
    /*
     * creating  access token
     */
    const accessToken = await user_model_1.User.createToken(JwtPayload, accessSecret, accessExpiresIn);
    const refreshSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
    const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN;
    /*
     * creating  refresh token
     */
    const refreshToken = await user_model_1.User.createToken(JwtPayload, refreshSecret, refreshExpiresIn);
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user?.needsPasswordChange,
    };
};
/* change password service */
const changePassword = async (user, passwordData) => {
    /* cheking user's profile from database */
    const existedUser = await user_model_1.User.isUserExist(user?.id);
    const hasedPassword = existedUser?.password;
    const { oldPassword, newPassword } = passwordData;
    // console.log(oldPassword);
    /* match old and new password */
    if (!(await user_model_1.User.passwordMatched(oldPassword, hasedPassword))) {
        throw new customError_1.default("Incorrect password", 400);
    }
    /* updating password and related field */
    const result = await user_model_1.User.findByIdAndUpdate({
        _id: existedUser?._id,
    }, {
        password: await (0, hashedPassword_1.default)(newPassword),
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    });
    return result;
};
/* refresh token service */
const refreshToken = async (refreshToken) => {
    const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
    const { id } = decoded;
    const iat = decoded.iat;
    const user = await user_model_1.User.isUserExist(id);
    // return result;
    /* get last time of password change in second  */
    const passChangeTimeInSecond = new Date(user.passwordChangedAt).getTime() / 1000;
    // checking if the access token created before the password change
    if (passChangeTimeInSecond > iat) {
        throw new customError_1.default("Unauthorized request!", http_status_1.default.UNAUTHORIZED);
    }
    const JwtPayload = {
        id: user?.id,
        role: user?.role,
    };
    const accessSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
    const accessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN;
    /*
     * creating  access token
     */
    const accessToken = await user_model_1.User.createToken(JwtPayload, accessSecret, accessExpiresIn);
    return accessToken;
};
const forgetPassword = async (id) => {
    const accessSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
    const fetchedUser = await user_model_1.User.isUserExist(id);
    /*
     * creating  access token
     */
    const token = (await user_model_1.User.createToken({
        id: fetchedUser.id,
        role: fetchedUser.role,
    }, accessSecret, "10m"));
    const resetLink = `${process.env.RESET_PASSWORD_UI_LINK}?id=${fetchedUser.id}&token=${token}`;
    const to = fetchedUser.email;
    const subject = "PASSWORD Reset mail!";
    const text = `Reset your password with following link
        link: ${resetLink}
  `;
    await (0, sendMail_1.default)(to, subject, text);
    return to;
};
/* reset password service */
const resetPassword = async (user, newPassword) => {
    /* updating password and related field */
    await user_model_1.User.findOneAndUpdate({
        $or: [{ id: user?.id }, { email: user?.email }],
    }, {
        password: await (0, hashedPassword_1.default)(newPassword),
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    });
    return true;
};
const authService = {
    login,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword,
};
exports.default = authService;
