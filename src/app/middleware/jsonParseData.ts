import { RequestHandler } from "express";

const jsonParseData: RequestHandler = (req, res, next) => {
  // Check if req.body.data is a string, then parse it
  if (typeof req.body.data === "string") {
    try {
      req.body = JSON.parse(req.body.data);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON in the 'data' field",
        errors: [
          {
            path: "",
            message: "Something went wrong",
          },
        ],
      });
    }
  }

  next();
};

export default jsonParseData;
