import { Types } from "mongoose";

export type TDepartment = {
  id: string;
  departmentName: string;
  allDoctors: Types.ObjectId[];
  licences: string;
  details: string;
  allMedicalHistory: Types.ObjectId[];
};
