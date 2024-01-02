/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from "express";
import httpStatus from "http-status";
import { TPasswordReset } from "../../interfaces/TCommon.interface";
import {
  ResponseToServer,
  responseToRequest,
} from "../../utils/ResponseToServer";
import catchAsync from "../../utils/catchAsync";
import { userServices } from "./user.services";

/*
 *   creating admin controller
 */
const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const file = req.file as any;
  const path = file?.path;
  data.path = path;

  const newAdmin: any = await userServices.createAdminService(data);

  responseToRequest(res, {
    success: true,
    status: httpStatus.OK as number,
    message: "Admin is created succesfully",
    data: newAdmin,
  });
});

/*
 *   creating doctor controller
 */
const createDoctor: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const file = req.file as any;
  const path = file?.path;
  data.path = path;

  const newDoctor: any = await userServices.createDocService(data);

  responseToRequest(res, {
    success: true,
    status: httpStatus.OK as number,
    message: "Doctor is created succesfully",
    data: newDoctor,
  });
});

/*
 *   creating nurse controller
 */
const createNurse: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const file = req.file as any;
  const path = file?.path;
  data.path = path;

  const newNurse: any = await userServices.createNurseService(data);

  responseToRequest(res, {
    success: true,
    status: httpStatus.OK as number,
    message: "Nurse is created succesfully",
    data: newNurse,
  });
});

/*
 *   creating patient controller
 */
const createPatient: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const file = req.file as any;
  const path = file?.path;
  data.path = path;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newPatient: any = await userServices.createPatientService(data);

  responseToRequest(res, {
    success: true,
    status: httpStatus.OK as number,
    message: "Patient is created succesfully",
    data: newPatient,
  });
});

/*
 *   creating staff controller
 */
const createStaff: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const file = req.file as any;
  const path = file?.path;
  data.path = path;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newStaff: any = await userServices.createStaffService(data);

  responseToRequest(res, {
    success: true,
    status: httpStatus.OK as number,
    message: "Staff is created succesfully",
    data: newStaff,
  });
});

const getUserById: RequestHandler = catchAsync(async (req, res) => {
  const id: number = Number(req.params.userId);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await userServices.getUserById(id);
  ResponseToServer(req, res, true, 200, "Successfyully retreive the users!", {
    data: result,
  });
});

const getAllUser: RequestHandler = catchAsync(async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await userServices.getAllUser(req.query);

  ResponseToServer(
    req,
    res,
    true,
    200,
    "Successfyully retreive all the users!",
    {
      data: result,
    },
  );
});

// const deleteUserById: RequestHandler = catchAsync(async (req, res) => {
//   const id: number = Number(req.params.userId);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const result: any = await userServices.deleteUserById(id);
//   ResponseToServer(req, res, true, 200, "Successfyully deleted the users!", {
//     data: result,
//   });
// });

const updateUserById: RequestHandler = catchAsync(async (req, res) => {
  const id: number = Number(req.params.userId);
  const body = req.body;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await userServices.updateUserById(id, body);
  ResponseToServer(req, res, true, 200, "Successfyully update the users!", {
    data: result,
  });
});

const resetPassword: RequestHandler = catchAsync(async (req, res) => {
  const id: string = req.params?.userId;
  const { oldPassword, newPassword } = req.body;
  const data: TPasswordReset = {
    id,
    oldPassword,
    newPassword,
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  await userServices.resetPassword(data);
  ResponseToServer(
    req,
    res,
    true,
    200,
    "Successfyully change the user password!",
    {
      data: null,
    },
  );
});

/**
 *
 * @Get_me_controller
 *
 */

const getMe: RequestHandler = catchAsync(async (req, res) => {
  const { role, id } = req.user;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await userServices.getMe(id, role);

  result &&
    responseToRequest(res, {
      success: true,
      status: 200,
      message: "Successfyully retreive the user!",
      data: result,
    });
});

const deleteDocById: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.userId;
  const newDoc = userServices.deleteDoctor(id);

  newDoc &&
    ResponseToServer(
      req,
      res,
      true,
      200,
      "successfully deleted doctor's data.",
      newDoc,
    );
});

/*
 *   delete admin controller
 */

const deleteAdmin: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.userId;
  const result = await userServices.deleteAdmin(id);
  result &&
    ResponseToServer(req, res, true, 200, "successfully deleted the admin.");
});

/*
 *   delete admin controller
 */

const deleteNurse: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.userId;
  const result = await userServices.deleteNurse(id);
  result &&
    ResponseToServer(req, res, true, 200, "successfully deleted the nurse.");
});

export const userControllers = {
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
  deleteDocById,
  deleteAdmin,
  deleteNurse,
};
