/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/customError";
import { TPasswordReset } from "../../interfaces/TCommon.interface";
import hashingPassword from "../../utils/hashedPassword";
import { TUser } from "../users/user.interface";
import { User } from "../users/user.model";
import Tlogin from "./auth.interface";

/* login service */
const login = async (payload: Tlogin) => {
  const user = await User.isUserExist(payload?.id as string);

  // console.log({ pass: user });

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

  if (!(await User.passwordMatched(oldPassword, hasedPassword))) {
    throw new AppError("Incorrect password", 400);
  }

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

const authService = {
  login,
  changePassword,
};
export default authService;
