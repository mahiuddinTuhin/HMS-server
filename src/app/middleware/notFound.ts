import { ErrorRequestHandler } from "express";

const notFound: ErrorRequestHandler = (err, req, res) => {
  // Handle errors here and send a response
  res.status(500).send("Internal Server Error");
};

export default notFound;
