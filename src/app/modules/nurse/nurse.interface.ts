import {
  TEducation,
  TPersonalInfo,
  Tcontacts,
} from "../utils/TCommon.interface";

export type TNurse = {
  nurseId: string;
  shift: "day" | "night";
  contactInfo: Tcontacts;
  education: TEducation[];
  personalInfo: TPersonalInfo;
};
