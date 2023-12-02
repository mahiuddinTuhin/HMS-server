import { Types } from "mongoose";

export type TMedicalHistory = {
  medicalId: string;
  doctorId: Types.ObjectId;
  patientId: Types.ObjectId;
  diagonosis: string[];
  medications: string[];
  releasedOn?: string;
  bill?: number;
  doctorComments: string;
  patientComments: string;
};
