import snapshot from "../utils/snapshot";

let animationState = [];

export default function bubbleSort(array) {
  animationState = [];
  snapshot(animationState, array);
  let didSwap = false;
  for (let i = array.length - 1; i >= 0; i--) {
    didSwap = false;
    for (let j = 0; j < i; j++) {
      if (array[j].num > array[j + 1].num) {
        didSwap = true;
        // take a snapshot showing the swap
        array[j].status = "SELECTED";
        array[j + 1].status = "SWAPPED";
        snapshot(animationState, array);
        array[j].status = "UNSORTED";
        array[j + 1].status = "UNSORTED";
        // swap numbers
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      } else {
        // take a snapshot showing the selected element
        array[j].status = "SELECTED";
        snapshot(animationState, array);
        array[j].status = "UNSORTED";
      }
    }
    array[i].status = "SORTED";
    if (!didSwap) {
      // if no swaps were made the array is sorted
      for (let j = 0; j < i; j++) {
        array[j].status = "SORTED";
      }
      // take final snapshot and break out of loop
      snapshot(animationState, array);
      break;
    }
  }
  return animationState;
}
