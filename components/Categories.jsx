"use client";

import * as sorts from "../lib/index";
import { resetStates } from "../lib/core";

export default function Categories() {

  function run(fn) {
    resetStates();
    fn();
  }

  return (
    <section className="sort-options">
      <details open>
        <summary>Comparison</summary>
        <button onClick={() => run(sorts.bubbleSort)}>Bubble</button>
        <button onClick={() => run(sorts.cocktailSort)}>Cocktail</button>
        <button onClick={() => run(sorts.gnomeSort)}>Gnome</button>
        <button onClick={() => run(sorts.selectionSort)}>Selection</button>
        <button onClick={() => run(sorts.insertionSort)}>Insertion</button>
      </details>

      <details>
        <summary>Divide & Conquer</summary>
        <button onClick={() => run(sorts.mergeSortWrapper)}>Merge</button>
        <button onClick={() => run(sorts.quickSortWrapper)}>Quick</button>
        <button onClick={() => run(sorts.heapSort)}>Heap</button>
        <button onClick={() => run(sorts.bitonicSortWrapper)}>Bitonic</button>
      </details>

      <details>
        <summary>Distribution</summary>
        <button onClick={() => run(sorts.radixSort)}>Radix</button>
        <button onClick={() => run(sorts.oddEvenSort)}>Odd Even</button>
      </details>

      <details>
        <summary>Fun Sorts</summary>
        <button onClick={() => run(sorts.pancakeSort)}>Pancake</button>
        <button onClick={() => run(sorts.bogoSort)}>Bogo</button>
        <button onClick={() => run(sorts.stoogeSortWrapper)}>Stooge</button>
      </details>
    </section>
  );
}
