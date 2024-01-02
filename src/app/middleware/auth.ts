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

    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET as string,
    ) as JwtPayload;

    const { id, role } = decoded;
    const iat = decoded.iat as number;

    const user: TUser = await User.isTokenIdExist(id);

    const passChangeTimeInSecond =
      new Date(user.passwordChangedAt as Date).getTime() / 1000;

    // checking if the access token created before the password change
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
