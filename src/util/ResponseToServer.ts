import { Request, Response } from "express";

export const ResponseToServer = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  req: Request,
  res: Response,
  success: boolean,
  status: number,
  message: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
) => {
  return res.status(status).json({
    success,
    status,
    message,
    data,
  });
};
