import { cardService } from "../card.service";
import { cacheCardService } from "../../cache-card/cache-card.service";
import { CustomValidationError } from "../../common/errors/validation.error";
import { CardDto } from "../dto/card.dto";
import {
  ValidationError,
  ValidationResult,
} from "../../constants/interfaces/card/card.interface";
import * as validator from "../../utils/card/validation/card.fields.validator";
import * as cardType from "../../utils/card/validation/card.type";

jest.mock("../../cache-card/cache-card.service", () => ({
  cacheCardService: {
    get: jest.fn(),
    set: jest.fn(),
  },
}));
jest.mock("../../utils/card/validation/card.fields.validator", () => ({
  validateCardNumber: jest.fn(() => []),
  validateExpirationMonth: jest.fn(() => []),
  validateExpirationYear: jest.fn(() => []),
  validateDate: jest.fn(() => []),
}));
jest.mock("../../utils/card/validation/card.type", () => ({
  getCardType: jest.fn(() => "Visa"),
}));

const validDto: CardDto = {
  card_number: "4539578763621486",
  expiration_month: "12",
  expiration_year: "2030",
};

describe("CardService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("validateCard", () => {
    it("returns cached result if present", async () => {
      const cached: ValidationResult = { is_valid: true, card_type: "Visa" };
      (cacheCardService.get as jest.Mock).mockResolvedValueOnce(cached);

      const result = await cardService.validateCard(validDto);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(cacheCardService.get).toHaveBeenCalledWith(validDto);
      expect(result).toBe(cached);
    });

    it("throws CustomValidationError if validation fails", async () => {
      (cacheCardService.get as jest.Mock).mockResolvedValueOnce(null);
      const errorList: ValidationError[] = [
        { field: "card_number", message: "Invalid" },
      ];
      (validator.validateCardNumber as jest.Mock).mockReturnValueOnce(
        errorList,
      );

      await expect(cardService.validateCard(validDto)).rejects.toThrow(
        CustomValidationError,
      );
    });

    it("returns result and saves to cache if valid", async () => {
      (cacheCardService.get as jest.Mock).mockResolvedValueOnce(null);
      (validator.validateCardNumber as jest.Mock).mockReturnValueOnce([]);
      (cardType.getCardType as jest.Mock).mockReturnValueOnce("Visa");

      const result = await cardService.validateCard(validDto);

      expect(result).toEqual({ is_valid: true, card_type: "Visa" });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(cacheCardService.set).toHaveBeenCalledWith(validDto, result);
    });
  });

  describe("getCache", () => {
    it("calls cacheCardService.get", async () => {
      (cacheCardService.get as jest.Mock).mockResolvedValueOnce("cached");
      // @ts-expect-error: testing private method
      const res = await cardService.getCache(validDto);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(cacheCardService.get).toHaveBeenCalledWith(validDto);
      expect(res).toBe("cached");
    });
  });

  describe("saveCache", () => {
    it("calls cacheCardService.set", async () => {
      // @ts-expect-error: testing private method
      await cardService.saveCache(validDto, {
        is_valid: true,
        card_type: "Visa",
      });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(cacheCardService.set).toHaveBeenCalledWith(validDto, {
        is_valid: true,
        card_type: "Visa",
      });
    });
  });

  describe("collectValidationErrors", () => {
    it("aggregates errors from all validators", () => {
      (validator.validateCardNumber as jest.Mock).mockReturnValueOnce([
        { field: "card_number", message: "err" },
      ]);
      (validator.validateExpirationMonth as jest.Mock).mockReturnValueOnce([
        { field: "expiration_month", message: "err" },
      ]);
      (validator.validateExpirationYear as jest.Mock).mockReturnValueOnce([]);
      (validator.validateDate as jest.Mock).mockReturnValueOnce([]);

      // @ts-expect-error: testing private method
      const errors = cardService.collectValidationErrors(validDto);
      expect(errors).toEqual([
        { field: "card_number", message: "err" },
        { field: "expiration_month", message: "err" },
      ]);
    });
  });

  describe("checkNumber", () => {
    it("calls validateCardNumber", () => {
      (validator.validateCardNumber as jest.Mock).mockReturnValueOnce([
        { field: "card_number", message: "err" },
      ]);
      // @ts-expect-error: testing private method
      const res = cardService.checkNumber("123");
      expect(validator.validateCardNumber).toHaveBeenCalledWith("123");
      expect(res).toEqual([{ field: "card_number", message: "err" }]);
    });
  });

  describe("checkMonth", () => {
    it("calls validateExpirationMonth", () => {
      (validator.validateExpirationMonth as jest.Mock).mockReturnValueOnce([
        { field: "expiration_month", message: "err" },
      ]);
      // @ts-expect-error: testing private method
      const res = cardService.checkMonth("12");
      expect(validator.validateExpirationMonth).toHaveBeenCalledWith("12");
      expect(res).toEqual([{ field: "expiration_month", message: "err" }]);
    });
  });

  describe("checkYear", () => {
    it("calls validateExpirationYear", () => {
      (validator.validateExpirationYear as jest.Mock).mockReturnValueOnce([
        { field: "expiration_year", message: "err" },
      ]);
      // @ts-expect-error: testing private method
      const res = cardService.checkYear("2030");
      expect(validator.validateExpirationYear).toHaveBeenCalledWith("2030");
      expect(res).toEqual([{ field: "expiration_year", message: "err" }]);
    });
  });

  describe("checkDate", () => {
    it("calls validateDate", () => {
      (validator.validateDate as jest.Mock).mockReturnValueOnce([
        { field: "date", message: "err" },
      ]);
      // @ts-expect-error: testing private method
      const res = cardService.checkDate("12", "2030");
      expect(validator.validateDate).toHaveBeenCalledWith("12", "2030");
      expect(res).toEqual([{ field: "date", message: "err" }]);
    });
  });

  describe("getType", () => {
    it("calls getCardType", () => {
      (cardType.getCardType as jest.Mock).mockReturnValueOnce("MasterCard");
      // @ts-expect-error: testing private method
      const res = cardService.getType("5555555555554444");
      expect(cardType.getCardType).toHaveBeenCalledWith("5555555555554444");
      expect(res).toBe("MasterCard");
    });
  });
});
