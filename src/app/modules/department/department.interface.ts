import { Types } from "mongoose";
import { TContact } from "../../interfaces/TCommon.interface";

export type TMedicalProblem = {
  problemName: string;
  problemHints: string;
  symptoms: string[];
  supportsFromHospital: string[];
  treatments: string[];
};

export type TMedicalSpecializations = {
  specializationName: string;
  specializationDetails: string;
  problems: TMedicalProblem[];
};

/*
 *    interface for medical department with all detail information
 */
type TDepartment = {
  id: string;
  departmentName: string;
  departmentDetails: string;
  specializations: TMedicalSpecializations[];
  doctors?: Types.ObjectId[];
  medicalHistory?: Types.ObjectId[];
  contact: TContact;
  medicalLicense: string[];
  isDeleted: true | false;
};

export default TDepartment;
