import { Types } from "mongoose";
import { TGuardian, TPersonalInfo } from "../utils/TCommon.interface";

export type TPatient = {
  id: string;
  user: Types.ObjectId;
  allDiagnosis: string[];
  allMedicalHistory: string[];
  allAppointmentHistory: string[];
  pendingAppointments: string[];
  currentMedicalDepartment?: string;
  isAdmitted: boolean;
  bills: number;
  contactNumber?: string;
  emergencyContact?: string;
  insuranceInfo?: string;
  guardian?: TGuardian;
  personalInfo?: TPersonalInfo;
};
