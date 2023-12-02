import { RequestHandler } from "express";
import { ResponseToServer } from "../../util/ResponseToServer";
import catchAsync from "../../util/catchAsync";
import { doctorServices } from "./doctors.services";

const getAllDocController: RequestHandler = catchAsync(async (req, res) => {
  const newDoc = doctorServices.getAllDocService();

  ResponseToServer(
    req,
    res,
    true,
    200,
    "successfully retrieved all doctor's data.",
    newDoc,
  );
});

const findDocByIdController: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const newDoc = doctorServices.findDocByIdService(id);

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
};
