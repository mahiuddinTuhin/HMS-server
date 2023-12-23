/* eslint-disable @typescript-eslint/no-unused-vars */
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  }),
);
app.use(cookieParser());

app.use("/api/v1", router);

const test = async (req: Request, res: Response) => {
  Promise.reject();
};

app.get("/", test);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
