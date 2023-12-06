import { Types } from "mongoose";

export type TMedicalHistory = {
  id: string;
  doctor: Types.ObjectId;
  patient: Types.ObjectId;
  diagonosis: Types.ObjectId[];
  medications: string[];
  releasedOn?: string;
  bill?: number;
  doctorComments: string;
  patientComments: string;
};
