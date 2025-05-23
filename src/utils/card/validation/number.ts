import { RangeCheckParams } from "../../../constants/interfaces/range/range.interface";

export function isInvalidNumber(params: RangeCheckParams): boolean {
  const num = Number(params.value);
  return isNaN(num) || num < params.min || num > params.max;
}
