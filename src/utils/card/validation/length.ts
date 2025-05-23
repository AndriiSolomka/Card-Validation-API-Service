import { RangeCheckParams } from "../../../constants/interfaces/range/range.interface";

export function isInvalidLength(params: RangeCheckParams): boolean {
  return params.value.length < params.min || params.value.length > params.max;
}
