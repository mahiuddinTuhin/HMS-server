import { Types } from "mongoose";

export type TLaboratory = {
  id: string;
  labName: string;
  equipments: string[];
  allStaff: Types.ObjectId[];
  testsOffers: string[];
  contactInfo: string;
  allDiagnosisHistory: Types.ObjectId[];
};

export type diagnosisId = string;
