/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from "express";
import { ResponseToServer } from "../../utils/ResponseToServer";
import catchAsync from "../../utils/catchAsync";
import { patientServices } from "./patient.services";

/**
 * @creating_appointment
 */
const ceateAppointment: RequestHandler = catchAsync(async (req, res) => {
  const result: any = await patientServices.ceateAppointment(req?.body);

  ResponseToServer(
    req,
    res,
    true,
    200,
    "Successfyully created appointment!",
    result,
  );
});

const getAllPatient: RequestHandler = catchAsync(async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await patientServices.getAllPatient();
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

/**
 * @delete patient by id controller
 */

const deleteAppointmentById: RequestHandler = catchAsync(async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await patientServices.deleteAppointmentById(req.params.id);

  ResponseToServer(
    req,
    res,
    true,
    200,
    "Successfyully deleted the appointment!",
    {
      data: null,
    },
  );
});

const updatePatientById: RequestHandler = catchAsync(async (req, res) => {
  const id: number = Number(req.params.userId);
  const body = req.body;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await patientServices.updatePatientById(id, body);
  ResponseToServer(req, res, true, 200, "Successfyully update the users!", {
    data: result,
  });
});

export const patientController = {
  updatePatientById,
  getAllPatient,
  ceateAppointment,
  deleteAppointmentById,
};
