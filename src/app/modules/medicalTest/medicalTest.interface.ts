import { Types } from "mongoose";

export type TMedicalTest = {
  id: string;
  doctor: Types.ObjectId;
  name: string;
  charge: number;
  isPaid: boolean;
  reports: object[];
  summary: string;
  equipments: string[];
  staff: Types.ObjectId;
  contactInfo: string;
  delivery: string;
};

export type diagnosisId = string;
