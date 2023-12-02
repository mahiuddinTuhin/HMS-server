"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const users_model_1 = require("./users.model");
const createPatient :RequestHandler = async (data) => {
    const result = await users_model_1.Users.create(data);
    if (!result) {
        throw new Error("User creation failed.");
    }
    return result;
};
const getUserById :RequestHandler = async (id) => {
    const result = await users_model_1.Users.findOne({ userId: id });
    if (!result) {
        throw new Error("User retrieve failed.");
    }
    return result;
};
const getAllUser :RequestHandler = async () => {
    const result = await users_model_1.Users.find();
    if (!result) {
        throw new Error("User retrieve failed.");
    }
    return result;
};
const deleteUserById :RequestHandler = async (id) => {
    const result = await users_model_1.Users.deleteOne({ userId: id });
    if (!result) {
        throw new Error("User deletion failed.");
    }
    return result;
};
const updateUserById :RequestHandler = async (id, data) => {
    const result = await users_model_1.Users.updateOne({ userId: id }, { data });
    if (!result) {
        throw new Error("User update failed.");
    }
    return result;
};
exports.userServices = {
    createPatient,
    getUserById,
    deleteUserById,
    updateUserById,
    getAllUser,
};
