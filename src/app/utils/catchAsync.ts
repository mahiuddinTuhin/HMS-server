import { NextFunction, Request, RequestHandler, Response } from "express";

/* catch async function */
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      return next(err);
    });
  };
};

export default catchAsync;
