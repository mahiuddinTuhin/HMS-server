"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const createUser :RequestHandler = async (body) => {
    const result = await user_model_1.UserModel.create({ body });
    return result;
};
const getAllUser :RequestHandler = async () => {
    const result = await user_model_1.UserModel.find();
    return result;
};
exports.userServices = { createUser, getAllUser };
