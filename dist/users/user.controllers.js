"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const users_services_1 = require("./users.services");
const users_zodValidation_1 = require("./users.zodValidation");
const ResponseToServer_1 = require("../util/ResponseToServer");
const createPatient :RequestHandler = async (req, res) => {
    const body = req.body;
    try {
        const validated = users_zodValidation_1.userZValidation.safeParse(body);
        if (!validated.success) {
            (0, ResponseToServer_1.ResponseToServer)(req, res, false, 400, "Validation failed!", {
                error: validated.error,
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await users_services_1.userServices.createPatient(body);
        (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "Successfyully created users!", {
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        (0, ResponseToServer_1.ResponseToServer)(req, res, false, 400, "Failed to create user!", {
            error: error.message,
        });
    }
};
const getUserById :RequestHandler = async (req, res) => {
    const id = Number(req.params.userId);
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await users_services_1.userServices.getUserById(id);
        (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "Successfyully retreive the users!", {
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        (0, ResponseToServer_1.ResponseToServer)(req, res, false, 400, "Failed to retireve the user!", {
            error: error.message,
        });
    }
};
const getAllUser :RequestHandler = async (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await users_services_1.userServices.getAllUser();
        (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "Successfyully retreive all the users!", {
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        (0, ResponseToServer_1.ResponseToServer)(req, res, false, 400, "Failed to retireve all the user!", {
            error: error.message,
        });
    }
};
const deleteUserById :RequestHandler = async (req, res) => {
    const id = Number(req.params.userId);
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await users_services_1.userServices.deleteUserById(id);
        (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "Successfyully deleted the users!", {
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        (0, ResponseToServer_1.ResponseToServer)(req, res, false, 400, "Failed to delete the user!", {
            error: error.message,
        });
    }
};
const updateUserById :RequestHandler = async (req, res) => {
    const id = Number(req.params.userId);
    const body = req.body;
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await users_services_1.userServices.updateUserById(id, body);
        (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "Successfyully update the users!", {
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        (0, ResponseToServer_1.ResponseToServer)(req, res, false, 400, "Failed to update the user!", {
            error: error.message,
        });
    }
};
exports.userControllers = {
    createPatient,
    getUserById,
    deleteUserById,
    updateUserById,
    getAllUser,
};
