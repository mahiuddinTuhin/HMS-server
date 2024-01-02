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

/* creating  Specialization */
const createSpecialization: RequestHandler = catchAsync(async (req, res) => {
  const SpecializationData = req.body;

  const newSpecialization =
    await adminServices.createSpecialization(SpecializationData);

  return responseToRequest(res, {
    status: httpStatus?.OK,
    success: true,
    message: "Specialization Created Successfully!",
    data: newSpecialization,
  });
});

/* creating test controller */
const createTest: RequestHandler = catchAsync(async (req, res) => {
  const testData = req.body;

  const newTest = await adminServices.createTest(testData);

  return responseToRequest(res, {
    status: httpStatus?.OK,
    success: true,
    message: "Test Data Created Successfully!",
    data: newTest,
  });
});

/* creating test report controller */
const createTestReport: RequestHandler = catchAsync(async (req, res) => {
  const testReportData = req.body;

  const newTestReport = await adminServices.createTestReport(testReportData);

  return responseToRequest(res, {
    status: httpStatus?.OK,
    success: true,
    message: "Test report Created Successfully!",
    data: newTestReport,
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
  createTest,
  findAllAdmin,
  createSpecialization,
  createTestReport,
};
