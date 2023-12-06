import { RequestHandler } from "express";
import { ResponseToServer } from "../../app/util/ResponseToServer";
import catchAsync from "../../app/util/catchAsync";
import { patientServices } from "./patient.services";

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

const updatePatientById: RequestHandler = catchAsync(async (req, res) => {
  const id: number = Number(req.params.userId);
  const body = req.body;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await patientServices.updatePatientById(id, body);
  ResponseToServer(req, res, true, 200, "Successfyully update the users!", {
    data: result,
  });
});

export const userControllers = {
  updatePatientById,
  getAllPatient,
};
