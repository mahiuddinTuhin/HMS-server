import { Types } from "mongoose";
import { TMedicalHistory } from "../MedicalHistory/medical.ineterface";
import { TEducation, TPersonalInfo, Tcontacts } from "../utils/TCommon.interface";



export type TDoctor = {
  doctorId: string;
  user_id: Types.ObjectId;
  schedule: string[];
  medicalHistory: TMedicalHistory[];
  contactInfo: Tcontacts;
  specialization: string[];
  education: TEducation[];
  license_info: string[];
  personalInfo: TPersonalInfo;
};
