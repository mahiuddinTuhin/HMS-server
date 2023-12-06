/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response } from "express";
const app = express();

import cors from "cors";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

const test = async (req: Request, res: Response) => {
  Promise.reject();
};

app.get("/", test);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
