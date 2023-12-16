/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errors/customError";
import { Appointment } from "../appointment/appointment.model";
import { Doctor } from "./doctors.model";

const appointedTimeOfDoc = async (doctor_id: string) => {
  const doctor: any = await Doctor.findById(doctor_id);

  console.log("appointed time hit");

  if (!doctor) {
    throw new AppError("Doctor id is not found.", 400);
  }

  const pendingAppointments: string[] = doctor?.pendingAppointments;

  const scheduleByDate: Record<string, string[]> = {};

  /* if no appointment found, then return empty obj */

  if (!pendingAppointments.length) {
    return {};
  }

  /* getting all appointment from appointment collection by using the _id that is containing in * pendingAppointments */

  const allAppointments = await Appointment.find({
    _id: { $in: pendingAppointments },
  });

  /*
   * loop in all appointment
   * set scheduleByDate value with filed name using the date
   * push the time into matching date
   */

  allAppointments.forEach((appointment) => {
    const { date, time } = appointment;

    if (!scheduleByDate[date]) {
      scheduleByDate[date] = [];
    }
    scheduleByDate[date].push(time);
  });

  return scheduleByDate;
};

export default appointedTimeOfDoc;
