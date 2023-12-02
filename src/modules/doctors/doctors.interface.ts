import {
  TEducation,
  TPersonalInfo,
  TSchedule,
  Tcontacts,
} from "../utils/TCommon.interface";

export type TDoctor = {
  doctorId: string;
  departmentId: string;
  schedule: TSchedule[];
  allMedicalHistory: string[];
  contactInfo: Tcontacts;
  education: TEducation[];
  license_info: string[];
  personalInfo: TPersonalInfo;
};
