/* eslint-disable @typescript-eslint/no-var-requires */
import mongoose from "mongoose";
import {
  emailPattern,
  passwordPattern,
  phonePattern,
} from "../../../validation/Common.Validation";
import { TUser } from "./user.interface";
const bcrypt = require("bcrypt");

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
          // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailPattern.test(value);
        },
        message: "Invalid email address format!",
      },
    },
    phone: {
      type: String,
      validate: {
        validator: (value: string) => {
          return phonePattern.test(value);
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

/**
 * @hash_the_pass_before_saving
 */
userSchema.pre("save", async function (next) {
  const salt = bcrypt.genSaltSync(Number(process.env.SALTROUNDS));
  const hashPass =
    bcrypt.hashSync(this?.password, salt) || process.env.DEFAULT_PASSWORD;

  this.password = hashPass;
  next();
});

/**
 * @hiding_the_password
 */
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const User = mongoose.model<TUser>("User", userSchema);
