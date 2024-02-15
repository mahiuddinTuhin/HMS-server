/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
const bcrypt = require("bcrypt");
import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../errors/customError";
import hashingPassword from "../../utils/hashedPassword";
import { passwordPattern } from "../../validation/Common.Validation";
import { TUser, UserStaticModel } from "./user.interface";
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema<TUser, UserStaticModel>(
  {
    id: {
      type: String,
      required: [true, "User id is required!"],
      unique: true,
    },

    password: {
      type: String,
      default: "P@ss0rd!", //generatePassword(),
      select: 0,
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

    passwordChangedAt: { type: Date, default: null },

    email: {
      type: String,
      unique: true,
      validate: {
        validator: (value: string) => {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailPattern.test(value);
        },
        message: "Invalid email address format!",
      },
    },
    phone: {
      type: String,
      // validate: {
      //   validator: function (value: string) {
      //     return phonePattern.test(value);
      //   },
      //   message: "Invalid phone address format!",
      // },
    },

    role: {
      type: String,
      required: [true, "Role is required!"],
      enum: ["patient", "doctor", "admin", "nurse", "staff", "superAdmin"],
      message:
        "{VALUES} is not correct role. Choose patient, doctor, admin, nurse or staff as role",
    },

    status: {
      type: String,
      default: "active",
      enum: {
        values: ["active", "deactive"],
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
 *  @Pre_hook
 *
 * @hash_the_pass_before_saving
 */
userSchema.pre("save", async function (next) {
  try {
    // const saltRounds = Number(process.env.SALTROUNDS) || 10;
    // const salt = await bcrypt.genSaltSync(saltRounds);
    // const passwordToHash = this?.password || generatePassword();
    // const hashPass = bcrypt.hashSync(passwordToHash, salt);

    // this.password = hashPass;
    this.password = await hashingPassword(this.password);
    next();
  } catch (error: any) {
    next(error);
  }
});

/**
 * @hiding_the_password
 */
// userSchema.post("save", function (doc, next) {
//   doc.password = "";
//   next();
// });

/* password Matching static method */
/*
 * passwordMatched
 */
userSchema.statics.passwordMatched = async function (
  plainTextPassword,
  hasedPassword,
) {
  // console.log({ plainTextPassword, hasedPassword });
  return await bcrypt.compare(plainTextPassword, hasedPassword);
};

/* user existance checking static method */
/*
 * isUserExist
 */
userSchema.static("isUserExist", async function isUserExist(id: string) {
  /* query in database */
  const user = await User.findOne({
    $or: [{ id: id }, { email: id }],
  }).select("+password");

  /* if user not match by id or email */
  if (!user) {
    throw new AppError(
      "User not found. User correct id or email!",
      httpStatus.NOT_FOUND,
    );
  }

  /* if id deactivate */
  if (user.status === "deactive") {
    throw new AppError(
      "This user has been deactivate. Contact with administration!",
      httpStatus.FORBIDDEN,
    );
  }

  /* if id deactivate */
  if (user.isDeleted === true) {
    throw new AppError(
      "This user has been deleted. Contact with administration!",
      httpStatus.FORBIDDEN,
    );
  }

  return user;
});

/* user existance checking static method */
/*
 * isTokenIdExist
 */
userSchema.static("isTokenIdExist", async function isUserExist(id: string) {
  /* query in database */

  const user = await User.findOne({
    $or: [{ id: id }, { email: id }],
  }).select("+password");

  /* if user not match by id or email */
  if (!user) {
    throw new AppError("Unauthorize request!", httpStatus.NOT_FOUND);
  }

  /* if id deactivate */
  if (user.status === "deactive") {
    throw new AppError("Unauthorize request!", httpStatus.FORBIDDEN);
  }

  /* if id deactivate */
  if (user.isDeleted === true) {
    throw new AppError("Unauthorize request!", httpStatus.FORBIDDEN);
  }

  return user;
});

/*
 * user accessToken creation method
 */

userSchema.static(
  "createToken",
  async function createToken(
    payload: Partial<TUser>,
    secret: string,
    exp: string,
  ) {
    /* creating signature by json webtoken */
    try {
      const accessToken = await jwt.sign(payload, secret, {
        expiresIn: exp,
      });

      // console.log({ accessToken });

      return accessToken;
    } catch (error: any) {
      throw new AppError(error?.message, 400);
    }
  },
);

export const User = mongoose.model<TUser, UserStaticModel>("User", userSchema);
