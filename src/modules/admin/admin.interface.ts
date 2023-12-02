import { Types } from "mongoose";
import { TEducation, TPersonalInfo, Tcontacts } from "../utils/TCommon.interface";


export type TAdmin = {
    adminId: string;
    user_id: Types.ObjectId;
    contactInfo: Tcontacts;
    education: TEducation[];
    date_of_birth: string;
    profile_image: string;
    personalInfo: TPersonalInfo;
   };