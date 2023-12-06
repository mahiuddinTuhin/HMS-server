import mongoose from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new mongoose.Schema<TUser>(
  {
    id: {
      type: String,
      required: [true, "id is required!"],
      unique: true,
    },

    password: {
      type: String,
      default: process.env.DEFAULT_PASSWORD,
      validate: {
        validator: (value: string) => {
          const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@~`#^()-_=+$!%*?&])[A-Za-z\d@~`#^()-_=+$!%*?&]{8,}$/;

          return passwordPattern.test(value);
        },
        message:
          "-Password should be at least 8 characters long,\n -containing at least one uppercase letter, \n-one lowercase letter, \n-one number, \n-and one special character!",
      },
    },

    needsPasswordChange: {
      type: Boolean,
      default: true,
    },

    email: {
      type: String,
      validate: {
        validator: (value: string) => {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailPattern.test(value);
        },
        message: "Invalid email address format!",
      },
    },

    role: {
      type: String,
      required: [true, "Role is required!"],
      enum: ["patient", "doctor", "admin", "nurse", "staff"],
      message:
        "{VALUES} is not correct role. Choose patient, doctor, admin, nurse or staff as role",
    },

    status: {
      type: String,
      default: "active",
      enum: {
        values: ["active", "inactive"],
        message:
          "{VALUES} is not correct role. Choose active or inactive as status",
      },
    },

    failed_login_attempts: {
      type: Number,
      default: 0,
    },

    last_login: {
      type: String,
    },

    last_failed_login: {
      type: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model<TUser>("User", userSchema);
