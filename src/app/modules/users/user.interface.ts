import { Model } from "mongoose";
import Tlogin from "../auth/login/login.interface";

export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  email?: string;
  phone?: string;
  role: "patient" | "doctor" | "admin" | "nurse" | "staff";
  status?: "active" | "deactive";
  failed_login_attempts?: number;
  last_login?: Date;
  last_failed_login?: Date;
  isDeleted: boolean;
};

export type UserStaticModel = {
  checkingUserExistance(payload: Tlogin): boolean;
} & Model<TUser>;
