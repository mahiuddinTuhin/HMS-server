import { RequestHandler } from "express";
import AppError from "../../errors/customError";
import { userRole } from "../../interfaces/interfaces";
import { responseToRequest } from "../../utils/ResponseToServer";
import catchAsync from "../../utils/catchAsync";
import medicalTestReportService from "./medicalTestReport.service";

/*
 * if user is a patient then  he can not find other patient's test report
 */
const findTestReportById: RequestHandler = catchAsync(async (req, res) => {
  const id: string = req.params?.id;
  const testReport =
    await medicalTestReportService.findMedicalTestReportById(id);

  if (
    req.user?.role === userRole.patient &&
    req.user?._id !== testReport?.patient?._id.toString()
  ) {
    throw new AppError("Unauthorized request!", 400);
  }
  testReport &&
    responseToRequest(res, {
      success: true,
      status: 200,
      message: "Successfully retrieved test Report by id.",
      data: testReport,
    });
});

/*
 * if user is a patient then  he can not find other patient's test report
 */
const findAllTestReportByUserId: RequestHandler = catchAsync(
  async (req, res) => {
    const id: string = req.params?.userId;
    const testReports =
      await medicalTestReportService.findAllTestReportByUserId(id);

    if (
      req.user?.role === userRole.patient &&
      req.user?._id !== testReports[0]?.patient?._id.toString()
    ) {
      throw new AppError("Unauthorized request!", 400);
    }

    testReports &&
      responseToRequest(res, {
        success: true,
        status: 200,
        message: "Successfully retrieved all test Report by user id.",
        data: testReports,
      });
  },
);

const medicalTestReportController = {
  findTestReportById,
  findAllTestReportByUserId,
};

export default medicalTestReportController;
