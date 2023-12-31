"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customError_1 = __importDefault(require("../errors/customError"));
const user_model_1 = require("../modules/users/user.model");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const auth = (...requiredRoles) => (0, catchAsync_1.default)(async (req, res, next) => {
    // console.log({ requiredRoles });
    const accessToken = req?.headers?.authorization;
    if (!accessToken) {
        throw new customError_1.default("Unauthorized request!", http_status_1.default.UNAUTHORIZED);
    }
    const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);
    const { id, role } = decoded;
    const iat = decoded.iat;
    const user = await user_model_1.User.isUserExist(id);
    const passChangeTimeInSecond = new Date(user.passwordChangedAt).getTime() / 1000;
    // checking if the access token created before the password change
    if (passChangeTimeInSecond > iat) {
        throw new customError_1.default("Unauthorized request!", http_status_1.default.UNAUTHORIZED);
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
        throw new customError_1.default("Unauthorized request!", http_status_1.default.UNAUTHORIZED);
    }
    req.user = decoded;
    req.fetchedUser = user;
    next();
});
exports.default = auth;
