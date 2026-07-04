import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index.js";
import { requestLogger, errorLogger } from "./config/logger.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/v1", routes);

app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Resource not found" });
});

app.use(errorLogger);
app.use(errorHandler);

export default app;