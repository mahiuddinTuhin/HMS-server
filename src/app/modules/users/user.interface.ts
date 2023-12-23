/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from "mongoose";

export type TUser = {
  _id?: Types.ObjectId;
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
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
  passwordMatched(payloadPassword: string, userPassword: string): boolean;
  isUserExist(id: string): Promise<TUser>;
  createToken(payload: Partial<TUser>, secretKey: string, exp: string): any;
} & Model<TUser>;
