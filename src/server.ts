import { createApp } from "./app";
import { APP_CONFIG } from "./config/init";
import { appLoggerService } from "./logger/logger.service";

export function startServer() {
  const app = createApp();
  const server = app.listen(APP_CONFIG.PORT, () => {
    appLoggerService.log(`Server running on port ${APP_CONFIG.PORT}`);
  });

  const gracefulShutdown = () => {
    appLoggerService.log("Shutdown signal received: closing HTTP server");
    server.close(() => {
      appLoggerService.log("HTTP server closed");
      process.exit(0);
    });
  };

  process.on("SIGTERM", gracefulShutdown);
  process.on("SIGINT", gracefulShutdown);

  process.on("uncaughtException", (err) => {
    appLoggerService.error("Uncaught Exception: ", err);
    process.exit(1);
  });

  process.on("unhandledRejection", (reason) => {
    appLoggerService.error("Unhandled Rejection: ", reason);
    process.exit(1);
  });
}
