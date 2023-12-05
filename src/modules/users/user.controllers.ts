/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseToServer } from "../../util/ResponseToServer";
import catchAsync from "../../util/catchAsync";
import AppError from "../../util/customError";
import { userServices } from "./user.services";

/* 1. creating admin */
const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;

  const newAdmin: any = await userServices.createAdminService(data);

  ResponseToServer(
    req,
    res,
    true,
    200,
    "successfully created admin's data.",
    newAdmin,
  );
});

/* 2. creating doctor */
const createDoctor: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;

  const newDoctor: any = await userServices.createDocService(data);

  if (newDoctor) {
    ResponseToServer(
      req,
      res,
      true,
      200,
      "successfully created doctor's data.",
      newDoctor,
    );
  } else {
    throw new AppError(
      "Failed to create doc!",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
});

/* 3. creating Nurse */
const createNurse: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;

  const newNurse: any = await userServices.createNurseService(data);

  ResponseToServer(
    req,
    res,
    true,
    200,
    "successfully created nurse's data.",
    newNurse,
  );
});

/* 4. creating patient */
const createPatient: RequestHandler = catchAsync(async (req, res) => {
  const body = req.body;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newPatient: any = await userServices.createPatientService(body);

  if (newPatient.length) {
    ResponseToServer(
      req,
      res,
      true,
      200,
      "successfully created Patient's data.",
      newPatient,
    );
  } else {
    throw new AppError(
      "Failed to create Patient!",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
});

/* 5. creating patient */
const createStaff: RequestHandler = catchAsync(async (req, res) => {
  const body = req.body;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newStaff: any = await userServices.createStaffService(body);

  if (newStaff.length) {
    ResponseToServer(
      req,
      res,
      true,
      200,
      "successfully created Staff's data.",
      newStaff,
    );
  } else {
    throw new AppError(
      "Failed to create Staff!",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
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

export const userControllers = {
  createAdmin,
  createDoctor,
  createPatient,
  getUserById,
  updateUserById,
  getAllUser,
  createNurse,
  createStaff,
};
