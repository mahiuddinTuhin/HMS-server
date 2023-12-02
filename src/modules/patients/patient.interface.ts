import { Types } from "mongoose";
import { TMedicalHistory } from "../MedicalHistory/medical.ineterface";
import { TAppointments } from "../appointment/appointment.interface";
import { TGuardian, TPersonalInfo } from "../utils/TCommon.interface";

export type TPatient = {
  patientId: string;
  user_Id: Types.ObjectId;
  medicalHistory?: [TMedicalHistory];
  appointments?: TAppointments[];
  isAdmitted: boolean;
  currentMedicalDepartment?: string;
  bills: number;
  contactNumber?: string;
  emergencyContact?: string;
  insuranceInfo?: string;
  guardian?: TGuardian;
  personalInfo?: TPersonalInfo;
};
