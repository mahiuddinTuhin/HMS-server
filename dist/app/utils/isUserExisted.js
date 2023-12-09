"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("../errors/customError"));
const user_model_1 = require("../modules/users/user.model");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isUserExisted = () => {
    return async (req, res, next) => {
        const email = req?.body?.email;
        const phone = req?.body?.phone;
        try {
            const result = await user_model_1.User.findOne({
                $or: [
                    { email: email },
                    {
                        phone: { $regex: new RegExp(".*" + phone.slice(-10), "i") },
                    },
                ],
            });
            if (result) {
                throw new customError_1.default("Email or phone is already used!", 409);
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = isUserExisted;
