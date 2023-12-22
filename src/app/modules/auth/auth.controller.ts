/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { responseToRequest } from "../../utils/ResponseToServer";
import catchAsync from "../../utils/catchAsync";
import authService from "./auth.service";

/* login controller */
const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const login = await authService.login(req.body);

    responseToRequest(res, {
      success: true,
      status: 200,
      message: "Successfully login.",
      data: login,
    });
  },
);

/* change password controller */
const changePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req?.user;
    const { ...passwordData } = req.body;
    const result = await authService.changePassword(user, passwordData);

    responseToRequest(res, {
      success: true,
      status: 200,
      message: "Successfully login.",
      data: result,
    });
  },
);

const authController = {
  login,
  changePassword,
};
export default authController;
