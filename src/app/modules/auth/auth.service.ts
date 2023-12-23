/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/customError";
import { TPasswordReset } from "../../interfaces/TCommon.interface";
import hashingPassword from "../../utils/hashedPassword";
import { TUser } from "../users/user.interface";
import { User } from "../users/user.model";
import sendEmail from "../utils/sendMail";
import Tlogin from "./auth.interface";

/* login service */
const login = async (payload: Tlogin) => {
  const user = await User.isUserExist(payload?.id as string);

  // console.log({ pass: user });

  /* match password */
  if (
    !(await User.passwordMatched(
      payload?.password, //text pass
      user?.password, //hasedpass
    ))
  ) {
    throw new AppError("Incorrect password", 400);
  }

  const JwtPayload: Partial<TUser> = {
    id: user?.id,
    role: user?.role,
  };
  const accessSecret = process.env.JWT_ACCESS_TOKEN_SECRET as string;
  const accessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN as string;

  /*
   * creating  access token
   */
  const accessToken = await User.createToken(
    JwtPayload,
    accessSecret,
    accessExpiresIn,
  );

  const refreshSecret = process.env.JWT_REFRESH_TOKEN_SECRET as string;
  const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN as string;

  /*
   * creating  refresh token
   */
  const refreshToken = await User.createToken(
    JwtPayload,
    refreshSecret,
    refreshExpiresIn,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

/* change password service */

const changePassword = async (
  user: JwtPayload,
  passwordData: TPasswordReset,
) => {
  /* cheking user's profile from database */
  const existedUser: any = await User.isUserExist(user?.id as string);

  const hasedPassword = existedUser?.password;
  const { oldPassword, newPassword } = passwordData;
  // console.log(oldPassword);

  /* match old and new password */
  if (!(await User.passwordMatched(oldPassword, hasedPassword))) {
    throw new AppError("Incorrect password", 400);
  }

  /* updating password and related field */
  const result = await User.findByIdAndUpdate(
    {
      _id: existedUser?._id,
    },
    {
      password: await hashingPassword(newPassword),
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return result;
};

/* refresh token service */

const refreshToken = async (refreshToken: string) => {
  const decoded = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET as string,
  ) as JwtPayload;

  const { id } = decoded;
  const iat = decoded.iat as number;
  const user: TUser = await User.isUserExist(id as string);
  // return result;

  /* get last time of password change in second  */
  const passChangeTimeInSecond =
    new Date(user.passwordChangedAt as Date).getTime() / 1000;

  // checking if the access token created before the password change
  if (passChangeTimeInSecond > iat) {
    throw new AppError("Unauthorized request!", httpStatus.UNAUTHORIZED);
  }

  const JwtPayload: Partial<TUser> = {
    id: user?.id,
    role: user?.role,
  };
  const accessSecret = process.env.JWT_ACCESS_TOKEN_SECRET as string;
  const accessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN as string;

  /*
   * creating  access token
   */
  const accessToken = await User.createToken(
    JwtPayload,
    accessSecret,
    accessExpiresIn,
  );

  return accessToken;
};

const forgetPassword = async (id: string) => {
  const accessSecret = process.env.JWT_ACCESS_TOKEN_SECRET as string;

  const fetchedUser = await User.isUserExist(id);

  /*
   * creating  access token
   */

  const token = (await User.createToken(
    {
      id: fetchedUser.id,
      role: fetchedUser.role,
    },
    accessSecret,
    "10m",
  )) as string;

  const resetLink = `${process.env.RESET_PASSWORD_UI_LINK}?id=${fetchedUser.id}&token=${token}`;
  const to = fetchedUser.email as string;
  const subject = "PASSWORD Reset mail!";
  const text = `Reset your password with following link
        link: ${resetLink}
  `;

  await sendEmail(to, subject, text);

  return to;
};

/* reset password service */

const resetPassword = async (user: TUser, newPassword: string) => {
  /* updating password and related field */
  await User.findOneAndUpdate(
    {
      $or: [{ id: user?.id }, { email: user?.email }],
    },
    {
      password: await hashingPassword(newPassword),
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return true;
};

const authService = {
  login,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
export default authService;
