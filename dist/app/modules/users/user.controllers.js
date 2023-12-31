"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ResponseToServer_1 = require("../../utils/ResponseToServer");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_services_1 = require("./user.services");
/*
 *   creating admin controller
 */
const createAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    const file = req.file;
    const path = file?.path;
    data.path = path;
    const newAdmin = await user_services_1.userServices.createAdminService(data);
    (0, ResponseToServer_1.responseToRequest)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: "Admin is created succesfully",
        data: newAdmin,
    });
});
/*
 *   creating doctor controller
 */
const createDoctor = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    const file = req.file;
    const path = file?.path;
    data.path = path;
    const newDoctor = await user_services_1.userServices.createDocService(data);
    (0, ResponseToServer_1.responseToRequest)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: "Doctor is created succesfully",
        data: newDoctor,
    });
});
/*
 *   creating nurse controller
 */
const createNurse = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    const file = req.file;
    const path = file?.path;
    data.path = path;
    const newNurse = await user_services_1.userServices.createNurseService(data);
    (0, ResponseToServer_1.responseToRequest)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: "Nurse is created succesfully",
        data: newNurse,
    });
});
/*
 *   creating patient controller
 */
const createPatient = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    const file = req.file;
    const path = file?.path;
    data.path = path;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newPatient = await user_services_1.userServices.createPatientService(data);
    (0, ResponseToServer_1.responseToRequest)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: "Patient is created succesfully",
        data: newPatient,
    });
});
/*
 *   creating staff controller
 */
const createStaff = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    const file = req.file;
    const path = file?.path;
    data.path = path;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newStaff = await user_services_1.userServices.createStaffService(data);
    (0, ResponseToServer_1.responseToRequest)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: "Staff is created succesfully",
        data: newStaff,
    });
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
const resetPassword = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params?.userId;
    const { oldPassword, newPassword } = req.body;
    const data = {
        id,
        oldPassword,
        newPassword,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await user_services_1.userServices.resetPassword(data);
    (0, ResponseToServer_1.ResponseToServer)(req, res, true, 200, "Successfyully change the user password!", {
        data: null,
    });
});
/**
 *
 * @Get_me_controller
 *
 */
const getMe = (0, catchAsync_1.default)(async (req, res) => {
    const { role, id } = req.user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await user_services_1.userServices.getMe(id, role);
    result &&
        (0, ResponseToServer_1.responseToRequest)(res, {
            success: true,
            status: 200,
            message: "Successfyully retreive the user!",
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
    resetPassword,
    getMe,
};
