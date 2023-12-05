import { Types } from "mongoose";
import {
  TEducation,
  TPersonalInfo,
  Tcontacts,
} from "../utils/TCommon.interface";

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  adminId: string;
  contactInfo: Tcontacts;
  education: TEducation[];
  personalInfo: TPersonalInfo;
};
