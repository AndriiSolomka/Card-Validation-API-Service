export function isValidCardNumber(cardNumber: string): boolean {
  const digits = cardNumber.split("").map(Number);
  let sum = 0;
  const length = digits.length;
  const parity = length % 2;

  for (let i = 0; i < length - 1; i++) {
    if (i % 2 !== parity) {
      sum += digits[i];
    } else if (digits[i] > 4) {
      sum += 2 * digits[i] - 9;
    } else {
      sum += 2 * digits[i];
    }
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  return digits[length - 1] === checkDigit;
}
