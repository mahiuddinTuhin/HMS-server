/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateMultipleDocuemnt = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req?.body?.forEach(async (element: any) => {
        await schema.parseAsync(element);
      });

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateMultipleDocuemnt;
