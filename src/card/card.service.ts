import { cacheCardService } from "../cache-card/cache-card.service";
import { CardDto } from "../card/dto/card.dto";
import { CustomValidationError } from "../common/errors/validation.error";
import {
  ValidationError,
  ValidationResult,
} from "../constants/interfaces/card/card.interface";
import {
  validateCardNumber,
  validateExpirationMonth,
  validateExpirationYear,
  validateDate,
} from "../utils/card/validation/card.fields.validator";
import { getCardType } from "../utils/card/validation/card.type";

class CardService {
  async validateCard(data: CardDto): Promise<ValidationResult> {
    const cached = await this.getCache(data);
    if (cached) return cached;

    const errors = this.collectValidationErrors(data);
    if (errors.length) throw new CustomValidationError(errors);

    const result: ValidationResult = {
      is_valid: true,
      card_type: this.getType(data.card_number),
    };

    await this.saveCache(data, result);
    return result;
  }

  private async getCache(data: CardDto): Promise<ValidationResult | null> {
    return cacheCardService.get(data);
  }

  private async saveCache(data: CardDto, res: ValidationResult): Promise<void> {
    await cacheCardService.set(data, res);
  }

  private collectValidationErrors(data: CardDto): ValidationError[] {
    const { card_number, expiration_month, expiration_year } = data;
    return [
      ...this.checkNumber(card_number),
      ...this.checkMonth(expiration_month),
      ...this.checkYear(expiration_year),
      ...this.checkDate(expiration_month, expiration_year),
    ];
  }

  private checkNumber(cardNumber: string): ValidationError[] {
    return validateCardNumber(cardNumber);
  }

  private checkMonth(month: string): ValidationError[] {
    return validateExpirationMonth(month);
  }

  private checkYear(year: string): ValidationError[] {
    return validateExpirationYear(year);
  }

  private checkDate(month: string, year: string): ValidationError[] {
    return validateDate(month, year);
  }

  private getType(cardNumber: string): string {
    return getCardType(cardNumber);
  }
}

export const cardService = new CardService();
