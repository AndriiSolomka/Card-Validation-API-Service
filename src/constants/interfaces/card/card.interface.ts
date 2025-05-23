export interface CardValidationRequest {
  cardNumber: string;
  expMonth: string;
  expYear: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  is_valid: boolean;
  card_type: string;
  errors?: ValidationError[];
}

export interface CardCacheKey {
  card_number: string;
  expiration_month: string;
  expiration_year: string;
}
