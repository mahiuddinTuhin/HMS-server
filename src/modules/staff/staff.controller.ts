import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseToServer } from "../../util/ResponseToServer";
import catchAsync from "../../util/catchAsync";
import AppError from "../../util/customError";
import { staffServices } from "./staff.services";

/* creating appointment  controller by doctor */
const createDiagnosis: RequestHandler = catchAsync(async (req, res) => {
  const diagnosisData = req.body;
  const newDiagnosis = await staffServices.createDiagnosis(diagnosisData);
  if (newDiagnosis) {
    ResponseToServer(req, res, true, StatusCodes.OK, newDiagnosis);
  } else {
    throw new AppError(
      "Creating diagnosis failed from staff controller!",
      StatusCodes.BAD_REQUEST,
    );
  }
});

export const staffControllers = { createDiagnosis };
