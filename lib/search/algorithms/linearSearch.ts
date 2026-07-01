import { SearchStep } from "../types";

export function* linearSearch(
  array: number[],
  target: number
): Generator<SearchStep, void, unknown> {
  for (let i = 0; i < array.length; i++) {
    yield { type: "evaluating", index: i };
    
    if (array[i] === target) {
      yield { type: "found", index: i };
      return;
    } else {
      yield { type: "discarded", index: i };
    }
  }
}
