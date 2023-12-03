import {
  TEducation,
  TPersonalInfo,
  Tcontacts,
} from "../utils/TCommon.interface";

export type TDoctor = {
  doctorId: string;
  departmentId: string;
  allMedicalHistory: string[];
  pendingAppointments: string[];
  contactInfo: Tcontacts;
  education: TEducation[];
  license_info: string[];
  personalInfo: TPersonalInfo;
};
