import request from "supertest";
import { createApp } from "../../src/app";
import { redisClient } from "../../src/redis/redis-client.factory";

describe("CardController (E2E)", () => {
  const app = createApp();

  beforeAll(async () => {
    await redisClient.flushall();
  });

  afterAll(async () => {
    await redisClient.quit();
  });

  describe("POST /api/card/validate", () => {
    it("should return 200 and validation result for a valid card", async () => {
      const validCard = {
        card_number: "4539578763621486",
        expiration_month: "12",
        expiration_year: `${new Date().getFullYear() + 1}`,
      };

      const response = await request(app)
        .post("/api/card/validate")
        .send(validCard)
        .expect(200);

      expect(response.body).toEqual({
        is_valid: true,
        card_type: "Visa",
      });
    });

    it("should return 400 for an invalid card number", async () => {
      const invalidCard = {
        card_number: "1234567890123456",
        expiration_month: "12",
        expiration_year: `${new Date().getFullYear() + 1}`,
      };

      const response = await request(app)
        .post("/api/card/validate")
        .send(invalidCard)
        .expect(400);

      expect(response.body).toHaveProperty("errors");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          { field: "card_number", message: "Invalid card number" },
        ]),
      );
    });

    it("should return 400 for a missing required field", async () => {
      const invalidCard = {
        expiration_month: "12",
        expiration_year: `${new Date().getFullYear() + 1}`,
      };

      const response = await request(app)
        .post("/api/card/validate")
        .send(invalidCard)
        .expect(400);

      expect(response.body).toHaveProperty("message");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(response.body.message).toEqual(
        expect.arrayContaining([
          {
            field: "card_number",
            message:
              "card_number is required and must be a string containing only digits",
          },
        ]),
      );
    });
    it("should return 400 for an expired card", async () => {
      const expiredCard = {
        card_number: "4539578763621486",
        expiration_month: "01",
        expiration_year: "2025",
      };

      const response = await request(app)
        .post("/api/card/validate")
        .send(expiredCard)
        .expect(400);

      expect(response.body).toHaveProperty("errors");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          { field: "expiration_date", message: "Card is expired" },
        ]),
      );
    });
  });
});
