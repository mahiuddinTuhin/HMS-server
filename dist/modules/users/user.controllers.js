"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const ResponseToServer_1 = require("../../util/ResponseToServer");
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const users_services_1 = require("./users.services");
/* 1. creating admin */
const createAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    const newAdmin = await users_services_1.userServices.createDocService(data);
    if (newAdmin) {
        (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "successfully created doctor's data.", newAdmin);
    }
    else {
        throw new Error("Failed to create doc!");
    }
});
/* creating doctor */
const createDoctor = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    const newDoc = await users_services_1.userServices.createDocService(data);
    if (newDoc) {
        (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "successfully created doctor's data.", newDoc);
    }
    else {
        throw new Error("Failed to create doc!");
    }
});
/* creating patient */
const createPatient = (0, catchAsync_1.default)(async (req, res) => {
    const body = req.body;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await users_services_1.userServices.createPatientService(body);
    if (result) {
        (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "Successfyully created users!", {
            data: result,
        });
    }
    else {
        throw new Error("");
    }
});
const getUserById = (0, catchAsync_1.default)(async (req, res) => {
    const id = Number(req.params.userId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await users_services_1.userServices.getUserById(id);
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "Successfyully retreive the users!", {
        data: result,
    });
});
const getAllUser = (0, catchAsync_1.default)(async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await users_services_1.userServices.getAllUser();
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "Successfyully retreive all the users!", {
        data: result,
    });
});
const deleteUserById = (0, catchAsync_1.default)(async (req, res) => {
    const id = Number(req.params.userId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await users_services_1.userServices.deleteUserById(id);
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "Successfyully deleted the users!", {
        data: result,
    });
});
const updateUserById = (0, catchAsync_1.default)(async (req, res) => {
    const id = Number(req.params.userId);
    const body = req.body;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await users_services_1.userServices.updateUserById(id, body);
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "Successfyully update the users!", {
        data: result,
    });
});
exports.userControllers = {
    createAdmin,
    createDoctor,
    createPatient,
    getUserById,
    deleteUserById,
    updateUserById,
    getAllUser,
};
