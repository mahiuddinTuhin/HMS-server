/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errors/customError";
import TUserRole from "../interfaces/interfaces";
import { TUser } from "../modules/users/user.interface";
import { User } from "../modules/users/user.model";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // console.log({ requiredRoles });
    const accessToken = req?.headers?.authorization as string;

    if (!accessToken) {
      throw new AppError("Unauthorized request!", httpStatus.UNAUTHORIZED);
    }

    let decoded;
    try {
      decoded = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_TOKEN_SECRET as string,
      ) as JwtPayload;
    } catch (error) {
      throw new AppError("Unauthorized request!", httpStatus.UNAUTHORIZED);
    }

    // console.log("decoded");

    const { id, role, _id, email, exp } = decoded;
    const iat = decoded.iat as number;

    /* checking where as this user exist correctly or not */
    const user: TUser = await User.isTokenIdExist(id);

    /* convert lastPassword changed time in seconds */
    const passChangeTimeInSecond =
      new Date(user.passwordChangedAt as Date).getTime() / 1000;

    // checking if the access token created before the password change
    /* throw error if access token is older than last password changing time */
    if (passChangeTimeInSecond > iat) {
      throw new AppError("Unauthorized request!", httpStatus.UNAUTHORIZED);
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError("Unauthorized request!", httpStatus.UNAUTHORIZED);
    }

    req.user = decoded;
    req.fetchedUser = user;

    next();
  });

export default auth;
