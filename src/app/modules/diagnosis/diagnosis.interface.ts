import { Types } from "mongoose";

export type TDiagnosis = {
  id: string;
  labStaff: Types.ObjectId;
  patient: Types.ObjectId;
  diagnosisName: string;
  diagnosisDetails: string;
  costs: number;
  doctor: Types.ObjectId;
  isPaid: boolean;
  testTime: string;
  reportTime: string;
};
