import { RequestHandler } from "express";

const jsonParseData: RequestHandler = (req, res, next) => {
  req.body = JSON.parse(req.body.data);
  next();
};

export default jsonParseData;
