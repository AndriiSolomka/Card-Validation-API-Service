import { CARD_CACHE } from "../constants/enums/redis/card.enum";
import {
  CardCacheKey,
  ValidationResult,
} from "../constants/interfaces/card/card.interface";
import { redisRepository } from "../redis/redis.repository";
import { sha256 } from "../utils/algorithms/sha256";

export class CacheCardService {
  private getCacheKey(data: CardCacheKey): string {
    const { card_number, expiration_month, expiration_year } = data;
    const raw = `${card_number}:${expiration_month}:${expiration_year}`;
    return sha256(raw);
  }

  async get(keys: CardCacheKey): Promise<ValidationResult | null> {
    const key = this.getCacheKey(keys);
    const cached = await redisRepository.get(CARD_CACHE.PREFIX, key);
    return cached ? (JSON.parse(cached) as ValidationResult) : null;
  }

  async set(keys: CardCacheKey, result: ValidationResult): Promise<void> {
    const key = this.getCacheKey(keys);
    await redisRepository.setWithExpiry(
      CARD_CACHE.PREFIX,
      key,
      JSON.stringify(result),
      CARD_CACHE.TTL,
    );
  }
}

export const cacheCardService = new CacheCardService();
