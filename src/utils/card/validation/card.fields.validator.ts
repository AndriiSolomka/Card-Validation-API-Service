import { isInvalidLength } from "./length";
import { isInvalidNumber } from "./number";
import { isValidCardNumber } from "../../algorithms/luhn";
import { isCardExpired } from "./expiration";
import {
  CARD_LENGTH,
  CARD_NUMBER,
  CARD_VALIDATION_RULES,
  EXPIRATION_DATE,
  EXPIRATION_MONTH,
  EXPIRATION_YEAR,
} from "../../../constants/enums/card/validation.card.enum";
import { createError } from "../errors/validation-error.factory";
import { ValidationError } from "../../../constants/interfaces/card/card.interface";

export function validateCardNumber(number: string): ValidationError[] {
  const { MIN, MAX } = CARD_VALIDATION_RULES.LENGTH;
  const params = { value: number, min: MIN, max: MAX };
  if (isInvalidLength(params)) return [createError(CARD_LENGTH)];
  if (!isValidCardNumber(number)) return [createError(CARD_NUMBER)];
  return [];
}

export function validateExpirationMonth(month: string): ValidationError[] {
  const { MIN, MAX } = CARD_VALIDATION_RULES.MONTH;
  const params = { value: month, min: MIN, max: MAX };
  if (isInvalidNumber(params)) return [createError(EXPIRATION_MONTH)];
  return [];
}

export function validateExpirationYear(year: string): ValidationError[] {
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear + CARD_VALIDATION_RULES.YEAR_RANGE;
  const params = { value: year, min: currentYear, max: maxYear };
  if (isInvalidNumber(params)) return [createError(EXPIRATION_YEAR)];
  return [];
}

export function validateDate(month: string, year: string): ValidationError[] {
  if (isCardExpired(month, year)) return [createError(EXPIRATION_DATE)];
  return [];
}
