import { SearchStep } from "../types";

export function* binarySearch(
  array: number[],
  target: number
): Generator<SearchStep, void, unknown> {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    yield { type: "evaluating", index: mid };

    if (array[mid] === target) {
      yield { type: "found", index: mid };
      return;
    }
    
    if (array[mid] < target) {
      yield { type: "discarded", index: mid, range: [left, mid] };
      left = mid + 1;
    } else {
      yield { type: "discarded", index: mid, range: [mid, right] };
      right = mid - 1;
    }
  }
}
