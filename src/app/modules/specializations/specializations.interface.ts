import { Types } from "mongoose";

export type TMedicalProblem = {
  problemName: string;
  problemHints: string;
  symptoms: string[];
  supportsFromHospital: string[];
  treatments: string[];
};

export type TMedicalSpecializations = {
  _id?: Types.ObjectId;
  id?: string;
  specializationName: string;
  specializationDetails: string;
  problems: TMedicalProblem[];
  doctors: Types.ObjectId[];
  department: Types.ObjectId;
};
