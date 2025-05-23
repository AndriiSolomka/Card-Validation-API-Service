import express from "express";
import { httpLogger } from "./common/middlewares/http-logger/http.logger";
import { errorHandler } from "./common/middlewares/error/error.handler";
import routes from "./routes/routes";

export function createApp() {
  const app = express();
  app.use(httpLogger);
  app.use(express.json());
  app.use("/api", routes);
  app.use(errorHandler);
  return app;
}
