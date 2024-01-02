import { Types } from "mongoose";

type TMedications = {
  date: Date;
  medications: string[];
};

export type TMedicalHistory = {
  id: string;
  doctor: Types.ObjectId;
  patient: Types.ObjectId;
  diagonosis: Types.ObjectId[];
  medications: TMedications[];
  releasedOn?: string;
  bill?: number;
  isPaid: boolean;
  doctorComments: string;
  patientComments: string;
  isDeleted: boolean;
};
