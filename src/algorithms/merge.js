import snapshot from "../utils/snapshot";

let animationState = [];

export default function mergeSort(array) {
  animationState = [];
  mergeSortHelper(0, array.length - 1, array);
  return animationState;
}

function mergeSortHelper(low, high, array) {
  if (low < high) {
    const middle = Math.floor((low + high) / 2);
    mergeSortHelper(low, middle, array);
    mergeSortHelper(middle + 1, high, array);
    merge(low, middle, high, array);
  }
}

function merge(low, middle, high, array) {
  let leftIndex = low;
  let rightIndex = middle;

  while (leftIndex <= rightIndex && rightIndex < high) {
    array[leftIndex].status = "SELECTED";
    array[rightIndex + 1].status = "SELECTED";
    snapshot(animationState, array);
    if (array[leftIndex].num <= array[rightIndex + 1].num) {
      // left element is in correct spot
      array[rightIndex + 1].status = "UNSORTED";
      if (low === 0 && high === array.length - 1) {
        array[leftIndex].status = "SORTED";
      } else {
        array[leftIndex].status = "UNSORTED";
      }
      leftIndex++;
    } else {
      // element in right index must be SELECTED to left index position, and all other elements inbetween shifted
      array[rightIndex + 1].status = "UNSORTED";
      array[leftIndex].status = "UNSORTED";

      const temp = array[rightIndex + 1];

      for (let i = 0; i < rightIndex + 1 - leftIndex; i++) {
        array[rightIndex + 1 - i] = array[rightIndex - i];
      }

      array[leftIndex] = temp;

      if (low === 0 && high === array.length - 1) {
        array[leftIndex].status = "SORTED";
      }

      rightIndex++;
      leftIndex++;
    }
  }
  snapshot(animationState, array);
}