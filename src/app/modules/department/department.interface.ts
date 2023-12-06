import { Types } from "mongoose";

export type TDepartment = {
  id: string;
  departmentName: string;
  allDoctors: Types.ObjectId[];
  licences: string;
  allMedicalHistory: Types.ObjectId[];
};
