/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { responseToRequest } from "../../../utils/ResponseToServer";
import catchAsync from "../../../utils/catchAsync";
import loginService from "./login.service";

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const login = await loginService.login(req.body);
    responseToRequest(res, {
      success: true,
      status: 200,
      message: "Successfully login.",
      data: login,
    });
  },
);

const loginController = {
  login,
};
export default loginController;
