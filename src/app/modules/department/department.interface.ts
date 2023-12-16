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
  doctors: string[];
};

/*
 *    interface for medical department with all detail information
 */
type TDepartment = {
  id: string;
  departmentName: string;
  departmentDetails: string;
  specializations: TMedicalSpecializations[];
  medicalHistory?: Types.ObjectId[];
  contact: TContact;
  /*
   type TContact = {
    phone: string[];
    email: string[];
    address: string[];
}
  */
  medicalLicense: string[];
  isDeleted: true | false;
};

export default TDepartment;
