import "reflect-metadata";
import { ensureLogDirsExists } from "./utils/logger/logger.config";
import { appLoggerService } from "./logger/logger.service";
import { startServer } from "./server";
import { checkRedisConnection } from "./redis/redis-client.factory";

async function bootstrap() {
  ensureLogDirsExists();
  await checkRedisConnection();
  startServer();
}

bootstrap().catch((error) => {
  appLoggerService.error("Error during app initialization:", error);
  process.exit(1);
});
