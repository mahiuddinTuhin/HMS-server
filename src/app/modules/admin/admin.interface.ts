import { Types } from "mongoose";
import { TEducation } from "../utils/TCommon.interface";

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  email: string;
  phone: string;
  education: TEducation[];
  fullName: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  address: {
    presentAddress: string;
    permanentAddress: string;
  };
  date_of_birth: string;
  gender: string;
  profile_image: string;
};
