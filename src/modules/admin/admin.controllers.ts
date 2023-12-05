import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseToServer } from "../../util/ResponseToServer";
import catchAsync from "../../util/catchAsync";
import AppError from "../../util/customError";
import { adminServices } from "./admin.services";

/* creating department controller */
const createDepartment: RequestHandler = catchAsync(async (req, res) => {
  const departmentData = req.body;

  const newDepartment = await adminServices.createDepartment(departmentData);

  ResponseToServer(req, res, true, StatusCodes.OK, newDepartment);
});

/* creating Labratory controller */
const createLabratory: RequestHandler = catchAsync(async (req, res) => {
  const labratoryData = req.body;
  const newLab = await adminServices.createLabratory(labratoryData);
  if (newLab) {
    ResponseToServer(req, res, true, StatusCodes.OK, newLab);
  } else {
    throw new AppError(
      "Creating department failed from controller!",
      StatusCodes.BAD_REQUEST,
    );
  }
});

export const adminController = { createDepartment, createLabratory };
