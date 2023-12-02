"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_services_1 = require("./user.services");
// import app from "./../server";
const createUser :RequestHandler = async (req, res) => {
    const body = req.body;
    try {
        const result = await user_services_1.userServices.createUser(body);
        res.status(400).json({
            success: true,
            message: "User has been created successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Internal server error.",
        });
    }
};
const getAllUser :RequestHandler = async (req, res) => {
    try {
        const result = await user_services_1.userServices.getAllUser();
        res.status(400).json({
            success: true,
            message: "All user has been retrieved successfully.",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Internal server error.",
        });
    }
};
exports.userController = {
    createUser,
    getAllUser,
};
