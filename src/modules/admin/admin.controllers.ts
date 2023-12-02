import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseToServer } from "../../util/ResponseToServer";
import catchAsync from "../../util/catchAsync";
import AppError from "../../util/customError";
import { adminServices } from "./admin.services";

const createDepartment: RequestHandler = catchAsync(async (req, res) => {
  const departmentData = req.body;
  const newDepartment = await adminServices.createDepartment(departmentData);
  if (newDepartment) {
    ResponseToServer(req, res, true, StatusCodes.OK, newDepartment);
  } else {
    throw new AppError(
      "Creating department failed from controller!",
      StatusCodes.BAD_REQUEST,
    );
  }
});

export const adminController = { createDepartment };
