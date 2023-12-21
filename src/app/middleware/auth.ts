/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errors/customError";
import TUserRole from "../interfaces/interfaces";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log({ requiredRoles });
    const accessToken = req?.headers?.authorization as string;

    if (!accessToken) {
      throw new AppError("Unauthorized request!", httpStatus.UNAUTHORIZED);
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN as string,
    ) as JwtPayload;

    const { id, role, iat } = decoded;

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError("Unauthorized request!", httpStatus.UNAUTHORIZED);
    }

    req.user = decoded as JwtPayload;

    next();
  });

export default auth;
