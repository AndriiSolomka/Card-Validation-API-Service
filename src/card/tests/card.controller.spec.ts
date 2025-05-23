import RedisMock from "ioredis-mock";
jest.mock("ioredis", () => RedisMock);
import { cardController } from "../card.controller";
import { cardService } from "../card.service";
import { HTTP_STATUS } from "../../constants/enums/http/http.enum";
import { CardDto } from "../dto/card.dto";
import { Request, Response, NextFunction } from "express";

jest.mock("../card.service");

describe("CardController", () => {
  const mockReq = (body: Partial<CardDto> = {}): Partial<Request> => ({ body });
  const mockRes = (): Partial<Response> => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("validate", () => {
    it("should respond with 200 and result if card is valid", async () => {
      const dto: CardDto = {
        card_number: "4539578763621486",
        expiration_month: "12",
        expiration_year: `${new Date().getFullYear() + 1}`,
      };
      const result = { is_valid: true, card_type: "Visa" };
      (cardService.validateCard as jest.Mock).mockResolvedValueOnce(result);

      const req = mockReq(dto) as Request;
      const res = mockRes() as Response;
      const next: NextFunction = jest.fn();

      await cardController.validate(req, res, next);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(cardService.validateCard).toHaveBeenCalledWith(dto);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(res.json).toHaveBeenCalledWith(result);
      expect(next).not.toHaveBeenCalled();
    });

    it("should call next(error) if service throws", async () => {
      const error = new Error("Validation failed");
      (cardService.validateCard as jest.Mock).mockRejectedValueOnce(error);

      const req = mockReq() as Request;
      const res = mockRes() as Response;
      const next: NextFunction = jest.fn();

      await cardController.validate(req, res, next);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(cardService.validateCard).toHaveBeenCalled();
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});
