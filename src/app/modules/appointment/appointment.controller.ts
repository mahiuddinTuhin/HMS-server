import { RequestHandler } from "express";
import { ResponseToServer } from "../../utils/ResponseToServer";
import catchAsync from "../../utils/catchAsync";
import appointmentService from "./appointment.service";

const deleteAppointment: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.userId;
  const result = await appointmentService.deleteAppointment(id);

  result &&
    ResponseToServer(req, res, true, 200, "successfully deleted appointment.");
});

const appointmentController = { deleteAppointment };

export default appointmentController;
