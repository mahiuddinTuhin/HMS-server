/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";

const createMedicalReports: RequestHandler = catchAsync(async (req, res) => {
  console.log("request handler work");
});

const staffControllers = { createMedicalReports };

export default staffControllers;
