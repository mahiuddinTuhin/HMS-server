import { Types } from "mongoose";
import {
  TEducation,
  TPersonalInfo,
  Tcontacts,
} from "../utils/TCommon.interface";

export type TStaff = {
  staffId: string;
  user_id: Types.ObjectId;
  shift: "day" | "night";
  contactInfo: Tcontacts;
  education: TEducation[];
  personalInfo: TPersonalInfo;
};
