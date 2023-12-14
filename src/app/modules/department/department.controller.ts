import { RequestHandler } from "express";
import { responseToRequest } from "../../utils/ResponseToServer";
import catchAsync from "../../utils/catchAsync";
import departmentService from "./department.service";

const findAllDepartment: RequestHandler = catchAsync(async (req, res) => {
  const allDepartment = await departmentService.findAllDepartment();
  responseToRequest(res, {
    success: true,
    status: 200,
    message: "Successfully retrieved all department.",
    data: allDepartment,
  });
});

const departmentController = { findAllDepartment };

export default departmentController;
