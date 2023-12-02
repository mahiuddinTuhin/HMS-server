import express from "express";
const app = express();

import cors from "cors";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import notFound from "./middleware/notFound";
import router from "./routes";

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
