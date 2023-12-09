import { Types } from "mongoose";
import { Tschedules } from "../../interfaces/TCommon.interface";

export type TAppointments = {
  id: string;
  doctor: Types.ObjectId;
  patient: Types.ObjectId;
  isPaid: boolean;
  date: string;
  time: Tschedules;
  isClosed: boolean;
  isCompleted: boolean;
};
