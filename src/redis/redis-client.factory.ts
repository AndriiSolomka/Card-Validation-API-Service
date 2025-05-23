import Redis from "ioredis";
import { appLoggerService } from "../logger/logger.service";
import { REDIS_CONFIG } from "../config/init";

export const redisClient = new Redis({
  host: REDIS_CONFIG.REDIS_HOST,
  port: Number(REDIS_CONFIG.REDIS_PORT),
});

export async function checkRedisConnection(): Promise<void> {
  try {
    await redisClient.ping();
    appLoggerService.log("Redis connected successfully");
  } catch (e) {
    appLoggerService.error(`Redis connection failed: ${String(e)}`);
    throw e;
  }
}
