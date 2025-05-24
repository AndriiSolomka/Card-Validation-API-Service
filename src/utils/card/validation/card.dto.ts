import { CardDto } from "../../../card/dto/card.dto";
import {
  CARD_NUMBER_DTO_ERROR,
  EXPIRATION_MONTH_DTO_ERROR,
  EXPIRATION_YEAR_DTO_ERROR,
} from "../../../constants/enums/card/card.validation.enum";
import { ValidationError } from "../../../constants/interfaces/card/card.interface";
import { createError } from "../errors/validation-error.factory";

export function validateCardDto(body: Partial<CardDto>): ValidationError[] {
  const { card_number, expiration_month, expiration_year } = body;
  const errors: ValidationError[] = [];

  if (isInvalidString(card_number)) {
    errors.push(createError(CARD_NUMBER_DTO_ERROR));
  }
  if (isInvalidString(expiration_month)) {
    errors.push(createError(EXPIRATION_MONTH_DTO_ERROR));
  }
  if (isInvalidString(expiration_year)) {
    errors.push(createError(EXPIRATION_YEAR_DTO_ERROR));
  }

  return errors;
}

const isInvalidString = (value: string | undefined): boolean => {
  return typeof value !== "string" || !/^\d+$/.test(value ?? "");
};
