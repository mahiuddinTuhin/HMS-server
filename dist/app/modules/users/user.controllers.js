"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const ResponseToServer_1 = require("../../util/ResponseToServer");
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const customError_1 = __importDefault(require("../../util/customError"));
const user_services_1 = require("./user.services");
/* 1. creating admin */
const createAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    const newAdmin = await user_services_1.userServices.createAdminService(data);
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "successfully created admin's data.", newAdmin);
});
/* 2. creating doctor */
const createDoctor = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    const newDoctor = await user_services_1.userServices.createDocService(data);
    if (newDoctor) {
        (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "successfully created doctor's data.", newDoctor);
    }
    else {
        throw new customError_1.default("Failed to create doc!", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
});
/* 3. creating Nurse */
const createNurse = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    const newNurse = await user_services_1.userServices.createNurseService(data);
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "successfully created nurse's data.", newNurse);
});
/* 4. creating patient */
const createPatient = (0, catchAsync_1.default)(async (req, res) => {
    const body = req.body;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newPatient = await user_services_1.userServices.createPatientService(body);
    if (newPatient.length) {
        (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "successfully created Patient's data.", newPatient);
    }
    else {
        throw new customError_1.default("Failed to create Patient!", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
});
/* 5. creating patient */
const createStaff = (0, catchAsync_1.default)(async (req, res) => {
    const body = req.body;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newStaff = await user_services_1.userServices.createStaffService(body);
    if (newStaff.length) {
        (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "successfully created Staff's data.", newStaff);
    }
    else {
        throw new customError_1.default("Failed to create Staff!", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
});
const getUserById = (0, catchAsync_1.default)(async (req, res) => {
    const id = Number(req.params.userId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await user_services_1.userServices.getUserById(id);
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "Successfyully retreive the users!", {
        data: result,
    });
});
const getAllUser = (0, catchAsync_1.default)(async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await user_services_1.userServices.getAllUser(req.query);
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "Successfyully retreive all the users!", {
        data: result,
    });
});
// const deleteUserById: RequestHandler = catchAsync(async (req, res) => {
//   const id: number = Number(req.params.userId);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const result: any = await userServices.deleteUserById(id);
//   ResponseToServer(req, res, true, 200, "Successfyully deleted the users!", {
//     data: result,
//   });
// });
const updateUserById = (0, catchAsync_1.default)(async (req, res) => {
    const id = Number(req.params.userId);
    const body = req.body;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await user_services_1.userServices.updateUserById(id, body);
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "Successfyully update the users!", {
        data: result,
    });
});
exports.userControllers = {
    createAdmin,
    createDoctor,
    createPatient,
    getUserById,
    updateUserById,
    getAllUser,
    createNurse,
    createStaff,
};
