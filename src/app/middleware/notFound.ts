/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";

const notFound: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Global Error Handler:", err);
  res.status(500).json({ error: "Internal Server Error" });
};

export default notFound;
