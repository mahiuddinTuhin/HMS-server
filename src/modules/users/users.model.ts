import mongoose from "mongoose";
import { TUsers } from "./users.interface";

const userSchema = new mongoose.Schema<TUsers>(
  {
    userId: {
      type: String,
      required: [true, "A user id is required."],
      unique: true,
      index: true,
    },

    password: {
      type: String,
      validate: {
        validator: (value: string) => {
          // Password should be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, one number, and one special character
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
      enum: {
        values: ["patient", "doctor", "admin"],
        message:
          "{VALUES} is not correct role. Choose patient, doctor or admin as role",
      },
    },

    status: {
      type: String,
      enum: {
        values: ["active", "inactive"],
        message:
          "{VALUES} is not correct role. Choose active or inactive as status",
      },
      default: "active",
    },

    failed_login_attempts: {
      type: Number,
      default: 0,
    },

    last_login: {
      type: Date,
    },

    last_failed_login: {
      type: Date,
    },

    profile_image: {
      type: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Users = mongoose.model<TUsers>("Users", userSchema);
