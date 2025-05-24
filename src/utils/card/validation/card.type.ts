import {
  CARD_IIN_RANGES,
  MAX_IIN_LENGTH,
} from "../../../constants/enums/card/card.iin.ranges";
import { CARD_TYPE } from "../../../constants/enums/card/card.type.enum";
import { LRUCache } from "lru-cache";
import { binarySearch } from "../../algorithms/binary.search";
import { CARD_TYPE_CACHE_MAX } from "../../../constants/enums/card/card.cache.enum";

const cardTypeCache = new LRUCache<string, CARD_TYPE>({
  max: CARD_TYPE_CACHE_MAX.VALUE,
});

export function getCardType(cardNumber: string): CARD_TYPE {
  const cacheKey = cardNumber.slice(0, MAX_IIN_LENGTH);
  const cached = cardTypeCache.get(cacheKey);
  if (cached) return cached;

  for (let i = MAX_IIN_LENGTH; i >= 1; i--) {
    if (cardNumber.length < i) continue;
    const prefix = parseInt(cardNumber.slice(0, i), 10);
    for (const [type, ranges] of Object.entries(CARD_IIN_RANGES)) {
      if (binarySearch(ranges, prefix)) {
        cardTypeCache.set(cacheKey, type as CARD_TYPE);
        return type as CARD_TYPE;
      }
    }
  }

  cardTypeCache.set(cacheKey, CARD_TYPE.UNKNOWN);
  return CARD_TYPE.UNKNOWN;
}
