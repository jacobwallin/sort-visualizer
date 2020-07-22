import snapshot from "../utils/snapshot";

let animationState = [];

export default function insertionSort(array) {
  animationState = [];
  snapshot(animationState, array);
  for (let i = 1; i < array.length; i++) {
    let swapIdx = i;
    array[i].status = "SELECTED";
    for (let j = i - 1; j >= 0; j--) {
      if (array[j].num > array[i].num) {
        // take snapshot showing swap
        array[j].status = "GOOD";
        snapshot(animationState, array);
        array[j].status = "UNSORTED";
      } else {
        array[j].status = "SWAP";
        snapshot(animationState, array);
        array[j].status = "UNSORTED";
        break;
      }
      swapIdx--;
    }

    array[i].status = "UNSORTED";
    if (swapIdx !== i) {
      // swap and shift elements in sorted subset of list
      let temp = array[i];
      for (let j = i; j > swapIdx; j--) {
        array[j] = array[j - 1];
      }
      array[swapIdx] = temp;
    }
  }

  // set all elements to sorted and take final snapshot
  array.forEach((element) => {
    element.status = "SORTED";
  });
  snapshot(animationState, array);

  return animationState;
}
