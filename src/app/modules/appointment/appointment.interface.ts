import { Types } from "mongoose";
import { TSchedule } from "../../interfaces/TCommon.interface";

export type TAppointments = {
  id: string;
  doctor: Types.ObjectId;
  patient: Types.ObjectId;
  time: string;
  isPaid: boolean;
  date?: Date;
  schedule: TSchedule;
  isClosed: boolean;
};
