/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { responseToRequest } from "../../utils/ResponseToServer";
import catchAsync from "../../utils/catchAsync";
import authService from "./auth.service";

/* login controller */
const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.login(req.body);

    const { refreshToken, accessToken, needsPasswordChange } = result;

    res.cookie("refreshToken", refreshToken, {
      secure: false || process.env.NODE_ENV === "production",
      httpOnly: true,
    });

    responseToRequest(res, {
      success: true,
      status: 200,
      message: "Successfully login.",
      data: { accessToken, needsPasswordChange },
    });
  },
);

/* change password controller */
const changePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req?.user;
    const { ...passwordData } = req.body;
    const result = await authService.changePassword(user, passwordData);

    result &&
      responseToRequest(res, {
        success: true,
        status: 200,
        message: "Successfully changed password.",
        data: null,
      });
  },
);

const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;

    const result = await authService.refreshToken(refreshToken);

    result &&
      responseToRequest(res, {
        success: true,
        status: 200,
        message: "Successfully created new accessToken.",
        data: result,
      });
  },
);

const forgetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;

    const result = await authService.forgetPassword(id);

    result &&
      responseToRequest(res, {
        success: true,
        status: 200,
        message: "Successfully generated password reset link.",
        data: result,
      });
  },
);

const authController = {
  login,
  changePassword,
  refreshToken,
  forgetPassword,
};
export default authController;
