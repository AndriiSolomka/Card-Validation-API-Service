import { IinRange } from "../../constants/types/card/iin.range.type";

export function binarySearch(ranges: IinRange[], prefix: number): boolean {
  let left = 0,
    right = ranges.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const range = ranges[mid];
    if (Array.isArray(range)) {
      if (prefix < range[0]) right = mid - 1;
      else if (prefix > range[1]) left = mid + 1;
      else return true;
    } else {
      if (prefix < range) right = mid - 1;
      else if (prefix > range) left = mid + 1;
      else return true;
    }
  }
  return false;
}
