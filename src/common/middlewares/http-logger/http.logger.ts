import { createPinoLogger } from "../../../utils/logger/logger.factory";
import { HTTP_LOG_FILE_PATH } from "../../../utils/logger/logger.config";
import { logHttpRequest } from "../../../utils/logger/http-logger";
import { Middleware } from "../../../constants/types/middleware/middleware.type";

export const httpLogger: Middleware = (req, res, next) => {
  const logger = createPinoLogger(HTTP_LOG_FILE_PATH, true);
  const start = Date.now();
  res.on("finish", () => {
    logHttpRequest(req, res, start, logger);
  });
  next();
};
