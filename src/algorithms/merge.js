import snapshot from "../utils/snapshot";

let animationState = [];

export default function mergeSort(array) {
  animationState = [];
  snapshot(animationState, array);
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
    if (array[leftIndex].num <= array[rightIndex + 1].num) {
      // left element is in correct spot

      array[leftIndex].status = "GOOD";
      array[rightIndex + 1].status = "GOOD";
      snapshot(animationState, array);
      array[rightIndex + 1].status = "UNSORTED";
      if (low === 0 && high === array.length - 1) {
        array[leftIndex].status = "SORTED";
      } else {
        array[leftIndex].status = "UNSORTED";
      }
      leftIndex++;
    } else {
      array[leftIndex].status = "SWAP";
      array[rightIndex + 1].status = "SWAP";
      snapshot(animationState, array);
      array[leftIndex].status = "UNSORTED";
      array[rightIndex + 1].status = "UNSORTED";

      const temp = array[rightIndex + 1];

      // shift all elements between the left and right index
      // this is for visualization purposes only, to prevent duplicate values from being displayed simultaniously on canvas
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

  if (low === 0 && high === array.length - 1) {
    for (let i = leftIndex; i < array.length; i++) {
      array[i].status = "SORTED";
    }
  }
  snapshot(animationState, array);
}
