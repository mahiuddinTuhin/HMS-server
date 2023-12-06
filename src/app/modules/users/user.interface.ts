export type TUser = {
  // _id: Schema.Types.ObjectId;
  id: string;
  password: string;
  needsPasswordChange: boolean;
  email?: string;
  role: "patient" | "doctor" | "admin" | "nurse" | "staff";
  status: "active" | "deactivate";
  failed_login_attempts?: number;
  last_login?: Date;
  last_failed_login?: Date;
  isDeleted: boolean;
};
