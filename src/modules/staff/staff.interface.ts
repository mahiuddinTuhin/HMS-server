import {
  TEducation,
  TPersonalInfo,
  Tcontacts,
} from "../utils/TCommon.interface";

export type TStaff = {
  staffId: string;
  shift: "day" | "night";
  contactInfo: Tcontacts;
  education: TEducation[];
  personalInfo: TPersonalInfo;
};
