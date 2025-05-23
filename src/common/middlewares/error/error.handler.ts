/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorMiddleware } from "../../../constants/types/middleware/middleware.type";
import {
  HTTP_STATUS,
  HTTP_ERROR,
} from "../../../constants/enums/http/http.enum";
import { CustomValidationError } from "../../errors/validation.error";

export const errorHandler: ErrorMiddleware = (err, req, res, next) => {
  if (err instanceof CustomValidationError) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      is_valid: false,
      errors: err.errors,
    });
  }

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    error: HTTP_ERROR.INTERNAL_SERVER_ERROR,
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
  });
};
