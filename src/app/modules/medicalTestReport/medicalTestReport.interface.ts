import { Types } from "mongoose";

export type TmedicalTestReport = {
  _id: string;
  id: string;
  patient: Types.ObjectId;
  test: Types.ObjectId;
  isPaid: boolean;
  reports?: object[];
  summary?: string;
  contactInfo: string;
  reportAvailableDate: string;
  isDeleted?: boolean;
};
