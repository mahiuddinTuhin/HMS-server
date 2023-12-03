import { TSchedule } from "../utils/TCommon.interface";

export type TAppointments = {
  appointmentId: string;
  doctorId: string;
  patientId: string;
  time: TSchedule;
  isPaid: boolean;
  date?: Date;
  isClosed: boolean;
};
