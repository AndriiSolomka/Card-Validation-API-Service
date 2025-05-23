import { redisClient } from "./redis-client.factory";

export class RedisRepository {
  async get(prefix: string, key: string): Promise<string | null> {
    return redisClient.get(`${prefix}:${key}`);
  }

  async set(prefix: string, key: string, value: string): Promise<void> {
    await redisClient.set(`${prefix}:${key}`, value);
  }

  async setWithExpiry(
    prefix: string,
    key: string,
    value: string,
    expiry: number,
  ): Promise<void> {
    await redisClient.set(`${prefix}:${key}`, value, "EX", expiry);
  }

  disconnect(): void {
    redisClient.disconnect();
  }
}
export const redisRepository = new RedisRepository();
