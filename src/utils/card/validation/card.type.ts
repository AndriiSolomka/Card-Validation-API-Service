import { CARD_TYPE } from "../../../constants/enums/card/card.type.enum";

export function getCardType(cardNumber: string): string {
  if (/^4/.test(cardNumber)) return CARD_TYPE.VISA;
  if (/^5[1-5]/.test(cardNumber)) return CARD_TYPE.MASTERCARD;
  if (/^3[47]/.test(cardNumber)) return CARD_TYPE.AMERICAN_EXPRESS;
  if (/^6(?:011|5)/.test(cardNumber)) return CARD_TYPE.DISCOVER;
  return CARD_TYPE.UNKNOWN;
}
