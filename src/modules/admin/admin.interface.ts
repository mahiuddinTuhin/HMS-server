import {
  TEducation,
  TPersonalInfo,
  Tcontacts,
} from "../utils/TCommon.interface";

export type TAdmin = {
  adminId: string;
  contactInfo: Tcontacts;
  education: TEducation[];
  personalInfo: TPersonalInfo;
};
