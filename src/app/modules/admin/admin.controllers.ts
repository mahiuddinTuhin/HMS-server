import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

import httpStatus from "http-status";
import {
  ResponseToServer,
  responseToRequest,
} from "../../utils/ResponseToServer";
import catchAsync from "../../utils/catchAsync";
import { adminServices } from "./admin.services";

/* creating department controller */
const createDepartment: RequestHandler = catchAsync(async (req, res) => {
  const departmentData = req.body;

  const newDepartment = await adminServices.createDepartment(departmentData);

  return responseToRequest(res, {
    status: httpStatus?.OK,
    success: true,
    message: "Department Created Successfully!",
    data: newDepartment,
  });
});

/* creating Labratory controller */
const createLabratory: RequestHandler = catchAsync(async (req, res) => {
  const labratoryData = req.body;

  const newLab = await adminServices.createLabratory(labratoryData);

  return responseToRequest(res, {
    status: httpStatus?.OK,
    success: true,
    message: "Labratory Data Created Successfully!",
    data: newLab,
  });
});

/**
 *  @find all admin router
 */
const findAllAdmin: RequestHandler = catchAsync(async (req, res) => {
  const allAdmin = await adminServices.findAllAdmin(req.query);

  ResponseToServer(req, res, true, StatusCodes.OK, allAdmin);
});

export const adminController = {
  createDepartment,
  createLabratory,
  findAllAdmin,
};
