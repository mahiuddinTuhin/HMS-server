/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";
import AppError from "../errors/customError";
import { User } from "../modules/utils/users/user.model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isUserExisted = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const email = req?.body?.email as string;
    const phone = req?.body?.phone as string;

    try {
      const result = await User.findOne({
        $or: [
          { email: email },
          {
            phone: { $regex: new RegExp(".*" + phone.slice(-10), "i") },
          },
        ],
      });

      if (result) {
        throw new AppError("Email or phone is already used!", 409);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default isUserExisted;
