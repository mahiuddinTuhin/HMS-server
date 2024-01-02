import { Types } from "mongoose";

export type TMedicalHistory = {
  _id?: Types.ObjectId;
  id: string;
  doctor: Types.ObjectId;
  patient: Types.ObjectId;
  appointment: Types.ObjectId;
  MedicalTestReport?: Types.ObjectId[];
  allMedications?: string[];
  bill?: number;
  isPaid?: boolean;
  doctorComments?: string;
  patientComments?: string;
  isDeleted?: boolean;
};
