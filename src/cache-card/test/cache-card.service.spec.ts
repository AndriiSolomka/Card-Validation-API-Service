import RedisMock from "ioredis-mock";
jest.mock("ioredis", () => RedisMock);
import { CacheCardService } from "../cache-card.service";
import { sha256 } from "../../utils/algorithms/sha256";
import { CARD_CACHE } from "../../constants/enums/redis/card.enum";
import { redisRepository } from "../../redis/redis.repository";

jest.mock("../../utils/algorithms/sha256");
jest.mock("../../redis/redis.repository");

describe("CacheCardService", () => {
  let service: CacheCardService;

  const cardKey = {
    card_number: "4111111111111111",
    expiration_month: "12",
    expiration_year: "2030",
  };

  const fakeHash = "hashed-key";
  const validationResult = { is_valid: true, card_type: "Visa" };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new CacheCardService();
    (sha256 as jest.Mock).mockReturnValue(fakeHash);
  });

  describe("get", () => {
    it("should return parsed ValidationResult if cache hit", async () => {
      (redisRepository.get as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(validationResult),
      );

      const result = await service.get(cardKey);
      expect(sha256).toHaveBeenCalledWith("4111111111111111:12:2030");
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(redisRepository.get).toHaveBeenCalledWith(
        CARD_CACHE.PREFIX,
        fakeHash,
      );
      expect(result).toEqual(validationResult);
    });

    it("should return null if cache miss", async () => {
      (redisRepository.get as jest.Mock).mockResolvedValueOnce(null);

      const result = await service.get(cardKey);
      expect(sha256).toHaveBeenCalledWith("4111111111111111:12:2030");
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(redisRepository.get).toHaveBeenCalledWith(
        CARD_CACHE.PREFIX,
        fakeHash,
      );
      expect(result).toBeNull();
    });
  });

  describe("set", () => {
    it("should store the ValidationResult in Redis with correct TTL", async () => {
      await service.set(cardKey, validationResult);

      expect(sha256).toHaveBeenCalledWith("4111111111111111:12:2030");
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(redisRepository.setWithExpiry).toHaveBeenCalledWith(
        CARD_CACHE.PREFIX,
        fakeHash,
        JSON.stringify(validationResult),
        CARD_CACHE.TTL,
      );
    });
  });
});
