import { Types } from "mongoose";

type TMedications = {
  date: Date;
  medications: string[];
};

export type TMedicalHistory = {
  _id?: Types.ObjectId;
  id: string;
  doctor: Types.ObjectId;
  patient: Types.ObjectId;
  diagonosis?: Types.ObjectId[];
  allMedications?: TMedications[];
  releasedOn?: string;
  bill?: number;
  isPaid?: boolean;
  doctorComments?: string;
  patientComments?: string;
  isDeleted?: boolean;
};
