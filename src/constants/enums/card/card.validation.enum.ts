export enum CARD_NUMBER_DTO_ERROR {
  FIELD = "card_number",
  MESSAGE = "card_number is required and must be a string",
}

export enum EXPIRATION_MONTH_DTO_ERROR {
  FIELD = "expiration_month",
  MESSAGE = "expiration_month is required and must be a string",
}

export enum EXPIRATION_YEAR_DTO_ERROR {
  FIELD = "expiration_year",
  MESSAGE = "expiration_year is required and must be a string",
}

export enum CARD_LENGTH {
  FIELD = "card_number",
  MESSAGE = "Card number must be 13-19 digits",
}

export enum CARD_NUMBER {
  FIELD = "card_number",
  MESSAGE = "Invalid card number",
}

export enum EXPIRATION_MONTH {
  FIELD = "expiration_month",
  MESSAGE = "Expiration month must be between 01 and 12",
}

export enum EXPIRATION_YEAR {
  FIELD = "expiration_year",
  MESSAGE = "Expiration year is invalid",
}

export enum EXPIRATION_DATE {
  FIELD = "expiration_date",
  MESSAGE = "Card is expired",
}

export const CARD_VALIDATION_RULES = {
  LENGTH: { MIN: 13, MAX: 19 },
  MONTH: { MIN: 1, MAX: 12 },
  YEAR_RANGE: 20,
};
