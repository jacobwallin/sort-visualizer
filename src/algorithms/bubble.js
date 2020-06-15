import snapshot from "../utils/snapshot";

let animationState = [];

export default function bubbleSort(array) {
  snapshot(animationState, array);
  let didSwap = false;
  for (let i = array.length - 1; i >= 0; i--) {
    array[0].status = "MOVED";
    didSwap = false;
    for (let j = 0; j < i; j++) {
      if (array[j].num > array[j + 1].num) {
        didSwap = true;
        // swap numbers
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
      snapshot(animationState, array);
      array[j].status = "UNSORTED";
      array[j + 1].status = "MOVED";
    }
    array[i].status = "SORTED";
    if (!didSwap) {
      for (let j = 0; j < i; j++) {
        array[j].status = "SORTED";
      }
      snapshot(animationState, array);
      break;
    }
    snapshot(animationState, array);
  }
  return animationState;
}
