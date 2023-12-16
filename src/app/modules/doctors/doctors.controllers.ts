/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

import AppError from "../../errors/customError";
import { ResponseToServer } from "../../utils/ResponseToServer";
import catchAsync from "../../utils/catchAsync";
import { doctorServices } from "./doctors.services";

/* creating appointment  controller by doctor */
const createAppointment: RequestHandler = catchAsync(async (req, res) => {
  const appointmentData = req.body;

  const newAppointment: any =
    await doctorServices.createAppointment(appointmentData);

  if (newAppointment) {
    ResponseToServer(req, res, true, StatusCodes.OK, newAppointment);
  } else {
    throw new AppError(
      "Creating appointment failed from doctor controller!",
      StatusCodes.BAD_REQUEST,
    );
  }
});

/* creating a medical history controller by doctor */
const createMedicalHistory: RequestHandler = catchAsync(async (req, res) => {
  const medicalHistoryData = req.body;
  const newMedicalHistory =
    await doctorServices.createMedicalHistory(medicalHistoryData);
  if (newMedicalHistory) {
    ResponseToServer(req, res, true, StatusCodes.OK, newMedicalHistory);
  } else {
    throw new AppError(
      "Creating new Medical History failed from doctor controller!",
      StatusCodes.BAD_REQUEST,
    );
  }
});

const getAllDocController: RequestHandler = catchAsync(async (req, res) => {
  const allDoc = await doctorServices.getAllDocService();

  ResponseToServer(
    req,
    res,
    true,
    200,
    "successfully retrieved all doctor's data.",
    allDoc,
  );
});

const findDocByIdController: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const newDoc = await doctorServices.findDocByIdService(id);

  ResponseToServer(
    req,
    res,
    true,
    200,
    "successfully get doctor's data.",
    newDoc,
  );
});

const deleteDocByIdController: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const newDoc = doctorServices.deleteDocByIdService(id);

  ResponseToServer(
    req,
    res,
    true,
    200,
    "successfully deleted doctor's data.",
    newDoc,
  );
});

const updateDocByIdController: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const newDoc = doctorServices.updateDocByIdService(id, data);

  ResponseToServer(
    req,
    res,
    true,
    200,
    "successfully updated doctor's data.",
    newDoc,
  );
});

export const doctorsController = {
  findDocByIdController,
  updateDocByIdController,
  deleteDocByIdController,
  getAllDocController,
  createAppointment,
  createMedicalHistory,
};
