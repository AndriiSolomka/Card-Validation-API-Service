import { CardDto } from "../../../card/dto/card.dto";
import {
  HTTP_ERROR,
  HTTP_STATUS,
} from "../../../constants/enums/http/http.enum";
import { Middleware } from "../../../constants/types/middleware/middleware.type";
import { validateCardDto } from "../../../utils/card/validation/card.dto";

export const cardDtoValidation: Middleware = (req, res, next) => {
  const errors = validateCardDto(req.body as Partial<CardDto>);
  if (errors.length) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: errors,
      error: HTTP_ERROR.BAD_REQUEST,
      statusCode: HTTP_STATUS.BAD_REQUEST,
    });
  }
  next();
};
