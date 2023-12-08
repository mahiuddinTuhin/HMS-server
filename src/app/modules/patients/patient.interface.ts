import { Types } from "mongoose";
import { TEducation } from "../../interfaces/TCommon.interface";

export type TPatient = {
  user: Types.ObjectId;
  id: string;
  allDiagnosis: Types.ObjectId[];
  allMedicalHistory: Types.ObjectId[];
  allAppointmentHistory: object[];
  pendingAppointments: object[];
  currentMedicalDepartment: Types.ObjectId;
  isAdmitted: boolean;
  bills: number;
  contactNumber: string;
  emergencyContact: string;
  insuranceInfo: string;
  guardian: string;
  email: string;
  phone: string;
  education: TEducation[];
  fullName: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  address: {
    presentAddress: string;
    permanentAddress: string;
  };
  dateOfBirth: string;
  gender: string;
  profileImage: string;
};
