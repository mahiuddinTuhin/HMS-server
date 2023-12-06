import { Types } from "mongoose";
import { TEducation, TGuardian } from "../../interfaces/TCommon.interface";

export type TPatient = {
  user: Types.ObjectId;
  id: string;
  allDiagnosis: Types.ObjectId[];
  allMedicalHistory: Types.ObjectId[];
  allAppointmentHistory: Types.ObjectId[];
  pendingAppointments: Types.ObjectId[];
  currentMedicalDepartment: string;
  isAdmitted: boolean;
  bills: number;
  contactNumber: string;
  emergencyContact: string;
  insuranceInfo: string;
  guardian: TGuardian;
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
  date_of_birth: string;
  gender: string;
  profile_image: string;
};
