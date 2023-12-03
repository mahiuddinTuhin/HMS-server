import { TSchedule } from "../utils/TCommon.interface";

export type TAppointments = {
  appointmentId: string;
  doctorId: string;
  patientId: string;
  time: string;
  isPaid: boolean;
  date?: Date;
  schedule: TSchedule;
  isClosed: boolean;
};
